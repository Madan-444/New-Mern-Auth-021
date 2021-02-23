import React, {useState,useEffect} from 'react'
import { Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"
import jwt from 'jsonwebtoken'

function Activate({match}) {
    const [values,setValues] = useState({
        name: '',
        token: '',
        show: true
    })
    useEffect(()=> {
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token) {
            setValues({...values,name,token})
        }
        console.log(token)
    },[])
    const {name,token,show} = values;

    const clickSubmit = (event)=> {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        })
        .then((response)=> {
            console.log('ACCOUNT ACTIVATION',response)
            // save the response (user and token) in localstorage/cookie
            setValues({...values,email:'',password: "", show:false})
            toast.success(response.data.message)
        })
        .catch((error)=> {
            console.log('ACCOUNT ACTIVATION  ERROR',error.response.data.error)
            toast.error(error.response.data.error)
        })
    }
    const ActivationLink = ()=> (
        <div className=' text-center'>
            <h1 className='p-5'> Hey {name} , Ready to activate your Account ? </h1>
            <button className='btn btn-outline-primary' onClick = {clickSubmit}> Acitvate Account </button>
        </div>
    )

    return (
        <Layout>
           <div className='col-md-6 offset-md-3'>
           <ToastContainer />

            {ActivationLink()}
           </div>
           
        </Layout>
    )
}

export default Activate
