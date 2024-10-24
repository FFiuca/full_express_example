const jwt =  require('jsonwebtoken');

exports.auth_handler = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1]
    console.log('token', token)
    if (!token){
        return res.status(401).json({data: {message : 'No token provided'}})
    }
    console.log(token, req.headers['authorization'])
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        console.log(err)
        if  (err){
            return res.status(401).json({data: {message: 'Unauthorized'}})
        }
        console.log('decoded',decoded)
        req.user_id = decoded.user_id
        next()
    })
}
