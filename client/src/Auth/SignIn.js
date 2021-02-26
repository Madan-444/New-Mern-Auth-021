import React, {useState,useEffect} from 'react'
import { Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {authenticate,isAuth} from './Helpers'
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"
import Google from './Google'

function SignIn({history}) {
    const [values,setValues] = useState({
        email: "",
        password: "",
        buttonText: "Submit"
    })

    const {email, password,buttonText} = values;

    const handleChange = (name)=> (event)=>  {
        // console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit = (event)=> {
        event.preventDefault()
        setValues({...values,buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email,password}
        })
        .then((response)=> {
            console.log('SIGNUP SUCCESS',response)
            // save the response (user and token) in localstorage/cookie
            authenticate(response,()=> {
                setValues({...values,name: '',email:'',password: "", buttonText:'Submitted'})
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
                // toast.success(` Hey ${response.data.user.name}, Welcome To You`)
            })
            
        })
        .catch((error)=> {
            console.log('SIGNIN ERROR',error.response.data)
            setValues({...values,buttonText:'Submit'})
            toast.error(error.response.data.error)
        })
    }

    const signInForm = ()=> (
        <form>

            <div className='form-group p-2'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} value= {email} type='email' className='form-control'/>
            </div>
            <div className='form-group p-2'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} value={password} type='password' className='form-control'/>
            </div>
            <button className='btn btn-primary ' onClick = {clickSubmit}> {buttonText} </button>
        </form>
    )
    return (
        <Layout>
            {/* {JSON.stringify(isAuth())} */}
           <div className='col-md-6 offset-md-3'>
           <ToastContainer />
           {isAuth() ? <Redirect to= '/' /> :null}
            <h1 className='p-5 text-center'>Sign In</h1>

            <Google />
            {signInForm()}
            <br />
            <Link to ='/auth/password/forgot'> Forgot password ?? </Link>
           </div>
           
        </Layout>
    )
}

export default SignIn
