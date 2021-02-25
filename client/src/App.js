import React from 'react'
import Layout from './core/Layout'

const App = () => {

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <h1 className='text-center pt-3' > Mern Stack Authentication Boiolerplate</h1>
        <h2 >Mern Stack</h2>
        <hr/>
        <p> MERN is one of several variations of the MEAN stack (MongoDB Express Angular Node), where the traditional Angular.js frontend framework is replaced with React.js. Other variants include MEVN (MongoDB, Express, Vue, Node), and really any frontend JavaScript framework can work.

        Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through. </p>
      </div>
    </Layout>
  )
}

export default App;
