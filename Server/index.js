const express = require('express')
const app = express()
// import routes
const authRoutes = require('./routes/auth')

// app.get('/api/signup',(req,res)=> {
//     res.json({
//         data: 'You hit signup endpoint to you'
//     })
// })

//middleware
app.use('/api',authRoutes)
const port = process.env.port || 8000

app.listen(port, ()=> {
    console.log(`Your app is running at ${port}`)
})