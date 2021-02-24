import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuth,signout } from '../Auth/Helpers'

function Layout({ children, match,history }) {

  const isActive = path => {
    if (match.path === path) {
      return { color: '#000' }

    }
    else {
      return { color: '#fff' }
    }
  }
  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className='nav-item nav-link'>
        <Link to="/" style={isActive('/')}>Home  </Link>
      </li>
      {
        !isAuth() && (
          <Fragment>
            <li className='nav-item nav-link'>
              <Link to="/signin" style={isActive('/signin')}>SignIn</Link>
            </li>
            <li className='nav-item nav-link'>
              <Link to="/signup" style={isActive('/signup')}>SignUp</Link>
            </li>
          </Fragment>
        )
      }
            {
        isAuth() && isAuth().role=== 'admin' && (

            <li className='nav-item nav-link'>
             <Link className='nav-link' to= '/admin' style={isActive('/admin')}> {isAuth().name}  </Link>
            </li>

        )
      }
      
      {
        isAuth() && isAuth().role=== 'subscriber' && (

            <li className='nav-item nav-link'>
             <Link className='nav-link' to= '/private' style={isActive('/private')}> {isAuth().name} </Link>
            </li>

        )
      }
      {
        isAuth() && (

            <li className='nav-item nav-link'>
             <span className='nav-link' style={{cursor:'pointer',color:'#fff'}} onClick={()=> {
               signout(()=> {
                 history.push('/')
               })
             }}>Sign Out</span>
            </li>

        )
      }

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
