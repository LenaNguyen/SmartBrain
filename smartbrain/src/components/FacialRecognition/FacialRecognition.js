import React from 'react';

const FacialRecognition = ({ imageUrl }) => {
    return (
        <div className='center'>
            <img alt='submitted' src={imageUrl}/>
        </div>
    )
}

export default FacialRecognition;