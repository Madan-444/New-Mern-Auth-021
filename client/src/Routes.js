import React from 'react'
import  { BrowserRouter,Switch,Route } from 'react-router-dom'
import App from './App'
import SignUp from './Auth/SignUp'
import SignIn from './Auth/SignIn'
import Activate from './Auth/Activate'

const Routes = ()=> {
    return (
        <BrowserRouter>
        <Switch>
            <Route path = '/' exact component = {App} />
            <Route path = '/signup' exact component = {SignUp} />
            <Route path = '/signin' exact component = {SignIn} />
            <Route path = '/auth/activate/:token' exact component = {Activate} />
            
        </Switch>
        </BrowserRouter>
    )
}

export default Routes
