import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';

const Facebook = ({ parentMethod }) => {

    const responseFacebook = response => {
        console.log('Here is response Id',response.email);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { userID: response.userID,accessToken: response.accessToken,email: response.email }
        })
            .then(response => {
                console.log('Facebook SIGNIN SUCCESS xa hai la', response);
                // inform parent component
                parentMethod(response);

            })
            .catch(error => {
                console.log('Facebook SIGNIN ERROR fuck yah', error.response);
            });
    };
    return (
        <div className="pb-3">
            <FacebookLogin
                appId=  {`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad = {false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                    <button
                    onClick={renderProps.onClick}
                    className="btn btn-primary btn-lg btn-block"
                >
                    <i className="fab fa-facebook pr-2"></i> Login with Facebook
                </button>
                )}
            />
        </div>
    );
};

export default Facebook;