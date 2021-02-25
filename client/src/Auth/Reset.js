import React, {useState,useEffect} from 'react'
import jwt from 'jsonwebtoken'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"

function Reset({match}) {
    const [values,setValues] = useState({
        name: '',
        token : '',
        newPassword: '',
        buttonText: "Reset password"
    })
    useEffect(()=> {
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token) {
            setValues({
                ...values,
                name,
                token
            })
        }
    }, [])

    const {name,token,newPassword,buttonText} = values;

    const handleChange = (event)=>  {
        // console.log(event.target.value)
        setValues({...values, newPassword: event.target.value})
    }
    const clickSubmit = (event)=> {
        event.preventDefault()
        setValues({...values,buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword, resetPasswordLink: token}
        })
        .then((response)=> {
            console.log('SIGNUP SUCCESS',response)
            toast.success(response.data.message)
            setValues({...values,buttonText:'Done !'})

        })
        .catch((error)=> {
            console.log('SIGNIN ERROR',error.response.data)
            toast.error(error.response.data.error)
            setValues({...values,buttonText:'Reset password'})
        })
    }

    const passwordResetForm = ()=> (
        <form>

            <div className='form-group p-2'>
                <label className='text-muted'>New Password</label>
                <input onChange={handleChange} value= {newPassword} type='password' className='form-control' placeholder ='Type new password' required />
            </div>

            <button className='btn btn-primary ' onClick = {clickSubmit}> {buttonText} </button>
        </form>
    )
    return (
        <Layout>
            {/* {JSON.stringify(isAuth())} */}
           <div className='col-md-6 offset-md-3'>
           <ToastContainer />
    
            <h1 className='p-5 text-center'>Hey {name}, Type your new Password </h1>
            {passwordResetForm()}
           </div>
           
        </Layout>
    )
}

export default Reset
