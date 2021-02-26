import React from 'react'
import Layout from '../core/Layout'
import GoogleLogin from 'react-google-login'
import axios from 'axios'


const Google = () => {
    const responseGoogle = (response)=> {
        console.log(response.tokenId)
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data : {tokenId: response.tokenId}
        })
        .then(response=> {
            console.log('GOOGLE SIGNIN SUCCESS',response)
        })
        .catch(error=> {
            console.log('GOOGLE SIGNIN ERROR',error.response)
        })
    }
    return (
        <div className='pb-3'>
            <GoogleLogin
                clientId= "1068279038908-0nc7qfsk3t06hdhq7a8mvoj0jf9mpcnt.apps.googleusercontent.com"

                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className = 'btn btn-danger btn-lr btn-block' > <i className='fab fa-google pr-2'> Login With Google</i> </button>
                  )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google


