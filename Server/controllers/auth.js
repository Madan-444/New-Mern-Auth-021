exports.signup = (req,res)=> {
    console.log('The user data is',req.body)
    res.json({
        data: 'You hit the signup endpoint '
    })
}