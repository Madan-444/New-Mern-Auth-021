import React, {Fragment} from 'react'
import  {Link} from 'react-router-dom'

function Layout({children}) {
    const nav = ()=> (
        <ul className="nav nav-tabs bg-primary">
          <li className='nav-item nav-link'>
            <Link to="/" className="text-light">Home</Link>
          </li>
          <li className='nav-item nav-link'>
            <Link to="/signup" className="text-light">SignUp</Link>
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

export default Layout
