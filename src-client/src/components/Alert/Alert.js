import React, {Component} from 'react';
import './Alert.css';
import close from "./close.png";

class Alert extends Component {
    constructor(props){
        super(props);
        this.state = {
            classes: "mw5 h3 relative top-0 center bg-silver hw3 bg-silver white shadow-2 animate br1 flex items-center justify-center pa3 mb3",
        }
    }

    setClasses = () => {
        let allClasses =  this.state.classes;
        if(this.props.isSignedIn){
            allClasses += " o-0"
        } else { 
            allClasses += this.props.errorExists ? " fadeIn" : " fadeOut";
        }
        if(this.props.errorExists){
            setTimeout(() => this.props.displayAlert(false, ""), 3000);
        }
        return allClasses;
    }

    setCursor = () => {
        let allClasses = "absolute tl";
        if(this.props.errorExists) 
            allClasses += " pointer";
        return allClasses;
    }

    render() {
        return (
            <div className="fixedElement">
                <div className={this.setClasses()}>
                    <div className="white absolute tl" style={{ cursor:"default"}}>{this.props.errorMessage}</div>
                    <img src={close} alt="close alert" className={this.setCursor()} 
                    style={{top:"0", right:"2px", width:"15px", height:"15px"}}
                    onClick={() => this.props.displayAlert(false)}/>
                </div>
            </div>
        )
    }
}

export default Alert;