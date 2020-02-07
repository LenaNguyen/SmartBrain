import React from "react";
import Settings from "../../settings/appConfig";
const baseUrl = Settings.baseUrl;

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  async componentDidMount() {
    const { userId } = this.props;
    const response = await fetch(baseUrl + `profile/${userId}/images`);
    const images = await response.json();
    this.setState({ images });
  }

  render() {
    const { images } = this.state;

    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image, index) => (
          <img
            src={image.location}
            alt="smartbrain detection"
            key={index}
            className="ma3"
          />
        ))}
      </div>
    );
  }
}

export default Gallery;
