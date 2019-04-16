import React, {Component} from 'react';
import './Alert.css';

const verticalAlign = {
    top: "40%"
}

class Alert extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => this.props.displayAlert(false), 4000);
    }

    render() {
        return (
            <div className="">
                <div className="animate fadeIn mw5 h3 relative top-0 center bg-silver hw3 bg-silver white shadow-2">
                    <div className="white absolute" style={verticalAlign}>can you see me</div>
                </div>
            </div>
        )
    }
}

export default Alert;