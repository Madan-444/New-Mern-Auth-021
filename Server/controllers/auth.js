const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
exports.signup = (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is already taken.'
            })
        }

        const token = jwt.sign({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'})

        const emailData = {
            from: process.env.EMAIL_FROM,
            to : email,
            subject:' Account activation link',
            html: `
            <h2> Please use the following link to activate your account</h2>
            <p> ${process.env.CLIENT_URL}/auth/activate/${token}</p>
            </hr>
            <p>This email may contain sensetive information</p>
            <p> ${process.env.CLIENT_URL} </p>
            `
        }
        sgMail.send(emailData).then(sent=> {
            console.log('SIGNUP EMAIL SENT',sent)
            return res.json({
                message: `Email has been sent to ${email}. Follow rule to activate your account`
            })
        })
        .catch(error=> {
            console.log('there is mistake')
            return res.json({
                message: error.message
            })
        })
    })
}

exports.accountActivation = (req,res)=> {
    const  {token} = req.body
    console.log('Token is:',token)
    if(token) {
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION, function(err,decoded){
            if(err) {
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR',err)
                return res.status(401).json({
                    error: 'Expired link. Signup Again.'
                })
            }
            const {name,email,password} = jwt.decode(token)

            const user = new User({name,email,password})
            user.save((err,user)=> {
                if(err){
                    console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR',ERR)
                    return res.status(401).json({
                        error: 'Error saving user in database. Try signup again'
                    })

                }
                return res.json({
                    message:'Signup success. Please sign in'
                })
               
                })
            })
        } else {
            return res.json({
                message: 'Something gone Wrong. Try again'
            })
        }
        
    }


    exports.signin =(req,res)=> {
        const {email,password} = req.body
        // check if user exist
        User.findOne({email}).exec((err,user)=> {
            if(err|| !user) {
                return res.status(400).json({
                    error: 'User with that email doesnot exit. so sign up first'
                })
            }
            // authenticate
            if(!user.authenticate(password)) {
                return res.status(400).json({
                    error: 'Email and password do not match'
                })
            }
            // generate a token and send to client
            const token = jwt.sign({_id: user._id},process.env.JWT_SECRET, {expiresIn: '7d'})
            const {_id, name,email,role} = user

            return res.json({
                token,
                user: {_id, email, name, role}
            })
        })
    }

    // exports.requireSignIn = expressJWT({
    //     secret: process.env.JWT_SECRET
    // })

// exports.signup = (req,res)=> {
//     // console.log('The user data is',req.body)
//     // res.json({
//     //     data: 'You hit the signup endpoint '
//     // })
//     const {name,email,password} = req.body

//     User.findOne({email}).exec((err,user)=> {
//         if(user){
//             return res.status(400).json({
//                 error: 'Email is already taken.'
//             })
//         }
//     })
//     let newUser = new User({name,email,password})
//     newUser.save((err,success) => {
//         if(err) {
//             console.log('SIGNUP ERROR',err)
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         res.json({
//             message: 'Signup success! Please signup'
//         })
//     })
// }  This will not conform either valid email or not so this is not usefull