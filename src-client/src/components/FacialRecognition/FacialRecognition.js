import React from "react";
import html2Canvas from "html2canvas";
import "./FacialRecognition.css";
import Settings from "./../../settings/appConfig";

class FacialRecognition extends React.Component {
  constructor() {
    super();
    this.state = {
      prevImageUrl: ""
    };
  }

  resizeCanvas = (canvas, width) => {
    const canvasRatio = canvas.height / canvas.width;
    let resizedCanvas = document.createElement("canvas");
    resizedCanvas.setAttribute("width", width);
    resizedCanvas.setAttribute("height", width * canvasRatio);
    const ctx = resizedCanvas.getContext("2d");

    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      width,
      width * canvasRatio
    );

    return resizedCanvas;
  };

  uploadImage = async (image, userId) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("userId", userId);
    await fetch(Settings.baseUrl + `image`, {
      method: "post",
      body: formData
    });
  };

  async componentDidUpdate() {
    const { imageUrl, userId } = this.props;
    const { prevImageUrl } = this.state;
    const imageBoxesRendered = document.querySelectorAll(".boundingBox").length;

    if (imageBoxesRendered && prevImageUrl !== imageUrl) {
      this.setState({ prevImageUrl: imageUrl });
      let canvas = await html2Canvas(
        document.body.querySelector("#detected-image"),
        {
          useCORS: true,
          allowTaint: true
        }
      );

      canvas = this.resizeCanvas(canvas, Settings.galleryImageWidth);
      canvas.toBlob(blob => this.uploadImage(blob, userId), "image/png", 0.7);
    }
  }

  render() {
    const { imageUrl, boxes } = this.props;

    return (
      <div className="center ma">
        <div className="absolute mt2" id="detected-image">
          <img
            id="inputImage"
            alt=""
            src={imageUrl}
            width="400px"
            height="auto"
          />
          {boxes.map((box, index) => {
            return (
              <div
                className="boundingBox"
                key={index}
                style={{
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                  left: box.leftCol
                }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default FacialRecognition;
