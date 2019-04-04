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
    imageUrl:'',
    box: {}
  }
}

calculateFaceLocation = (data) => {
 const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
 const image = document.getElementById('inputImage');
 const width = Number(image.width);
 const height = Number(image.height);
 return{
   leftCol: clarifaiFace.left_col * width,
   topRow: clarifaiFace.top_row * height,
   rightCol: width - (clarifaiFace.right_col * width),
   bottomRow: height - (clarifaiFace.bottom_row * height)
 }
}

displayFaceBox = (box) =>{
  this.setState({box: box});
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
}
  render() {
    return (
      <div className="App">
      <Particles className='particles' params={ParticlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FacialRecognition box ={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
