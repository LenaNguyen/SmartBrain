import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end', zIndex:10 }}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer' style={{zIndex:10}}>Sign Out</p>
            </nav>
            )
    } else {
        return (
            <nav className ="dib" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer' style={{zIndex:10}}>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'style={{zIndex:10}}>Register</p>
            </nav>
        );
    }
}

export default Navigation;