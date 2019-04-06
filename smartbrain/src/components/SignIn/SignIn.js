import React from 'react';

const SignIn = ({ onRouteChange }) => {
    return (
        <div className="flex vw-100 vh-100">
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l center shadow-5 v-mid" style={{ margin: 'auto' }}>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 center">
                            <legend className="f3 fw6 ph0 center">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={() => onRouteChange('home')}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" 
                                value="Sign in" />
                        </div>
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 dim black db pointer">Register</p>
                    </div>
                </main>
            </article>
        </div>
    )
}

export default SignIn;