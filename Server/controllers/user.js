const User = require('../models/user')

exports.read = (req,res)=> {
    const userId = req.params.id
    User.findById(userId).exec((err,user)=> {
        if(err|| !user) {
            return res.status(400).json({
                error:'User not found'
            })
        } else {
            user.hashed_password = undefined;
            user.salt = undefined
            res.json(user)
        }
    })
}

exports.update = (req,res)=> {
    console.log('UPDATE USER',req.user, 'DATA UPDATE',req.body)
    const {name,password} = req.body

    User.findOne({_id:req.user._id},(err,user)=> {
        if(err||!user){
            return res.status(400).json({
                error: 'User not fount'
            })
        }
        if(!name) {
            return res.status(400).json({
                error: 'Name is required.'
            })
        } else {
            user.name = name
        }
        if(password) {
            if(password.length <6) {
                return res.status(400).json({
                    error: 'Password must be greater than 6'
                })
            } else {
                user.password = password
            }
        }
        user.save((err,updatedUser) => {
            if(err) {
                console.log('USER UPDATED ERROR',err)
                return res.status(400).json({
                    error: 'User update failed'
                })
            }
            updatedUser.hashed_password = undefined
            updatedUser.salt = undefined
            res.json(updatedUser)
        })
    })
}
