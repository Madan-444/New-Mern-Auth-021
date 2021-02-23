import React from 'react'
import  { BrowserRouter,Switch,Route } from 'react-router-dom'
import App from './App'
import SignUp from './SignUp'

const Routes = ()=> {
    return (
        <BrowserRouter>
        <Switch>
            <Route path = '/' exact component = {App} />
            <Route path = '/signup' exact component = {SignUp} />
            
        </Switch>
        </BrowserRouter>
    )
}

export default Routes
