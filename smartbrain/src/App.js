import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from  './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

const app = new Clarifai.App({
  apiKey: '82494a1a16534019983a7a152eb80634'
});

const ParticlesOptions = {
    "particles": {
      "number": {
          "value": 100,
          "density":{
            "enable": true,
            "value-area": 800
          }
      },
      "move": {
          "speed": 5
      }
  }
}

class App extends Component {
constructor(){
  super();
  this.state = {
    input: '',
  }
}

onInputChange = (event) => {
  console.log(event.target.value);
}

onButtonSubmit = () => {
  app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
}
  render() {
    return (
      <div className="App">
      <Particles className='particles' params={ParticlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        {
          // <FaceRecognition/>
        }
      </div>
    );
  }
}

export default App;
