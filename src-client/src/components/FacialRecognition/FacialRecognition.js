import React from 'react';
import './FacialRecognition.css'

const FacialRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
                {
                    boxes.map((box, index) => {
                    return <div className='boundingBox' key={index} style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                    })
                }
            </div>
        </div>
    )
}

export default FacialRecognition;