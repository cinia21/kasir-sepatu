const jwt = require("jsonwebtoken")
const secretKey = "123"

const authJWT =(req, res, next) => {
    const token = req.header('Authorization')

    if(token){
        const auth = token.split(" ")[1]
        console.log(auth)
        jwt.verify(auth, secretKey, (err, user) => {
            if(err){
                return res.status(403)
            }
            req.user = user
            next()
        })
    }else{
        res.status(401)
    }
}

module.exports = authJWT