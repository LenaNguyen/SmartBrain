import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmitImage }) => {
    return (
        <div>
            <p className='f3'>
                {'Enter an image address and watch the magic brain detect the human faces in it. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='text' className="f4 pa2 w-70 center" onChange={onInputChange}/>
                    <button 
                    className="f4 grow w-30 link ph3 dib white bg-light-blue br2"
                    onClick={onSubmitImage}>Detect</button>
                </div>
            </div>
        </div >
    )
}

export default ImageLinkForm;