import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import FacialRecognition from './components/FacialRecognition/FacialRecognition'
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
    imageUrl:''
  }
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  console.log(this.state.imageUrl);
  app.models.predict(
    Clarifai.COLOR_MODEL, 
    this.state.input)
    .then(
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
        <FacialRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
