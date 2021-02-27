import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';

const Facebook = ({ infom }) => {

    const responseFacebook = response => {
        // console.log(response.tokenId);
        // axios({
        //     method: 'POST',
        //     url: `${process.env.REACT_APP_API}/google-login`,
        //     data: { idToken: response.tokenId }
        // })
        //     .then(response => {
        //         console.log('GOOGLE SIGNIN SUCCESS', response);
        //         // inform parent component
        //         infom(response);

        //     })
        //     .catch(error => {
        //         console.log('GOOGLE SIGNIN ERROR', error.response);
        //     });
        console.log('The facebook response is=:',response)
    };
    return (
        <div className="pb-3">
            <FacebookLogin
                appId=  {`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad = {false}
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