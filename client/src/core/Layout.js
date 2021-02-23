import React, {Fragment} from 'react'
import  {Link,withRouter} from 'react-router-dom'

function Layout({children,match}) {

  const isActive = path=> {
    if(match.path === path) {
      return {color: '#000'}
     
      }
      else {
        return {color: '#fff'}
    }
  }
    const nav = ()=> (
        <ul className="nav nav-tabs bg-primary">
          <li className='nav-item nav-link'>
            <Link to="/" style={isActive('/')}>Home  </Link>
          </li>
          <li className='nav-item nav-link'>
            <Link to="/signin"  style={isActive('/signin')}>SignIn</Link>
          </li>
          <li className='nav-item nav-link'>
            <Link to="/signup" style={isActive('/signup')}>SignUp</Link>
          </li>
  
        </ul>
      )
    return (
        <div>
           {nav()}
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default withRouter(Layout)
