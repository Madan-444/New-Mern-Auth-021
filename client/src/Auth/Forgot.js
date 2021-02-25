import React, {useState} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"

function Forgot({history}) {
    const [values,setValues] = useState({
        email: "",
        buttonText: "Request password Link"
    })

    const {email,buttonText} = values;

    const handleChange = (name)=> (event)=>  {
        // console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit = (event)=> {
        event.preventDefault()
        setValues({...values,buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: {email}
        })
        .then((response)=> {
            console.log('SIGNUP SUCCESS',response)
            toast.success(response.data.message)
            setValues({...values,buttonText:'Requested'})

        })
        .catch((error)=> {
            console.log('SIGNIN ERROR',error.response.data)
            toast.error(error.response.data.error)
            setValues({...values,buttonText:'Request password Link'})
        })
    }

    const passwordForgotForm = ()=> (
        <form>

            <div className='form-group p-2'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} value= {email} type='email' className='form-control'/>
            </div>

            <button className='btn btn-primary ' onClick = {clickSubmit}> {buttonText} </button>
        </form>
    )
    return (
        <Layout>
            {/* {JSON.stringify(isAuth())} */}
           <div className='col-md-6 offset-md-3'>
           <ToastContainer />
    
            <h1 className='p-5 text-center'>Forget Password </h1>
            {passwordForgotForm()}
           </div>
           
        </Layout>
    )
}

export default Forgot
