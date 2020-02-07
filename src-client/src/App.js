import Alert from "./components/Alert/Alert";
import React, { Component } from "react";
import "./App.css";
import FacialRecognition from "./components/FacialRecognition/FacialRecognition";
import Navigation from "./components/Navigation/Navigation";
import Particles from "react-particles-js";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import Settings from "./settings/appConfig";
import SignIn from "./components/SignIn/SignIn.js";
import ScrollContainer from "./components/ScrollContainer/ScrollContainer";
import Gallery from "./components/Gallery/Gallery";

const ParticlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        "value-area": 800
      }
    },
    move: {
      speed: 5
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  errorExists: false,
  errorMessage: "",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocation = data => {
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFaces.map(region => {
      return {
        leftCol: region.region_info.bounding_box.left_col * width,
        topRow: region.region_info.bounding_box.top_row * height,
        rightCol: width - region.region_info.bounding_box.right_col * width,
        bottomRow: height - region.region_info.bounding_box.bottom_row * height
      };
    });
  };

  displayFaceBox = boxes => {
    this.setState({ boxes: boxes });
  };

  displayAlert = (state, errorMessage) => {
    this.setState({ errorExists: state });
    this.setState({ errorMessage: errorMessage });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onSubmitImage = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(Settings.baseUrl + "image/facialRecognition", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.status.description === "Ok") {
          fetch(Settings.baseUrl + `profile/${this.state.user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              incrementEntries: true
            })
          })
            .then(response => response.json())
            .then(updatedUser => {
              this.setState(
                Object.assign(this.state.user, {
                  entries: updatedUser[0].entries
                })
              );
            })
            .catch(err => {
              console.log(err);
              this.displayAlert(true, "Unable to update entry count.");
            });
        } else {
          this.displayAlert(true, "Invalid image path.");
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => {
        console.log(err);
        this.displayAlert(true, "Image recognition failed.Check image path.");
      });
  };

  onRouteChange = route => {
    if (route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, errorExists, errorMessage } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={ParticlesOptions} />
        <div className="flex-wrap">
          <Navigation
            onRouteChange={this.onRouteChange}
            isSignedIn={isSignedIn}
          />
          <Alert
            displayAlert={this.displayAlert}
            errorExists={errorExists}
            errorMessage={errorMessage}
          />
        </div>
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmitImage={this.onSubmitImage}
            />
            <FacialRecognition
              boxes={this.state.boxes}
              imageUrl={imageUrl}
              userId={this.state.user.id}
            />
          </div>
        ) : this.state.route === "gallery" ? (
          <ScrollContainer>
            <Gallery userId={this.state.user.id} />
          </ScrollContainer>
        ) : this.state.route === "signin" ? (
          <SignIn
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            displayAlert={this.displayAlert}
          />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            displayAlert={this.displayAlert}
          />
        )}
      </div>
    );
  }
}

export default App;
