import React, {useState,useEffect} from 'react'
import { Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {isAuth,getCookie,signout,updateUser} from '../Auth/Helpers'
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"


function Private({history}) {
    const [values,setValues] = useState({
        role: '',
        name: "",
        email: "",
        password: "",
        buttonText: "Submit"
    })
    const token = getCookie('token')
    useEffect(()=> {
        loadProfile()
    },[])

    const loadProfile=()=> {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('PRIVATE PROFILE UPDATE',response)
            const {role,name,email} = response.data
            setValues({...values,role,name,email})
        })
        .catch(error=> {
            console.log('PROFILE UPDATE ERROR',error.response.data.error)
            if(error.response.status === 401) {
                signout(()=> {
                    history.push('/')
                })
            }
        })
    }

    const {name,email, password,buttonText,role} = values;

    const handleChange = (name)=> (event)=>  {
        // console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit = (event)=> {
        event.preventDefault()
        setValues({...values,buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {name,password}
        })
        .then((response)=> {
            console.log(' PRIVATE PROFILE UPDATE SUCCESS',response)
            updateUser(response,()=> {
                setValues({...values, buttonText:'Submitted'})
                toast.success('Profile Updated Successfully.')
            })
           
        })
        .catch((error)=> {
            console.log('PRIVATE PROFILE UPDATE ERROR',error.response.data.error)
            setValues({...values,buttonText:'Submit'})
            toast.error(error.response.data.error)
        })
    }

    const updateForm = ()=> (
        <form>
             <div className='form-group p-2' >
                <label className='text-muted'>Role</label>
                <input defaultValue ={role} type='text' className='form-control' disabled />
            </div>
            <div className='form-group p-2' >
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} value={name} type='text' className='form-control'/>
            </div>
            <div className='form-group p-2'>
                <label className='text-muted'>Email</label>
                <input defaultValue = {email} type='email' className='form-control' disabled />
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
           <div className='col-md-6 offset-md-3'>
           <ToastContainer />
           
            <h1 className='p-5 text-center'> Profile Update </h1>
            <h3 className=' text-center'> Private User page </h3>
            {updateForm()}
           </div>
           
        </Layout>
    )
}

export default Private

