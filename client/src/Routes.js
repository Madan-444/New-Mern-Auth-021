import React from 'react'
import  { BrowserRouter,Switch,Route } from 'react-router-dom'
import App from './App'
import SignUp from './Auth/SignUp'
import SignIn from './Auth/SignIn'
import Activate from './Auth/Activate'
import Private from './core/Private'
import Forgot from './Auth/Forgot'

import PrivateRoute from './Auth/PrivateRoute'
import Admin from './core/Admin'
import AdminRoute from './Auth/AdminRoute'
import Reset from './Auth/Reset'
const Routes = ()=> {
    return (
        <BrowserRouter>
        <Switch>
            <Route path = '/' exact component = {App} />
            <Route path = '/signup' exact component = {SignUp} />
            <Route path = '/signin' exact component = {SignIn} />
            <Route path = '/auth/activate/:token' exact component = {Activate} />
            <PrivateRoute path = '/private' exact component={Private} />
            {/* <Route path ='/admin' component = {Admin } /> */}
            <AdminRoute path = '/admin' component= {Admin} />
            <Route path= '/auth/password/forgot' exact component ={Forgot} />
            <Route path= '/auth/password/reset/:token' exact component ={Reset} />

            
        </Switch>
        </BrowserRouter>
    )
}

export default Routes
