const User = require('../models/user.modele')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.signup = (req,rep)=>{
const data = {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password,10) ,
    date_naissance : req.body.date_naissance
}
const _caosh =new User (data);
_caosh.save().then(
    (createdUser)=>{
        rep.status(200).json({message : "create user"})
    }
).catch(
    (err)=>{
        rep.status(400).json({message: "error"})
    }
)

}
exports.signin = async(req,rep)=>{
 
    const{ email, password } = req.body;
    const user = await User.findOne({email : email})

    if(!user){
        return rep.status(400).json({message: "email Invalid ...!!!"})
    }
    bcrypt.compare(password , user.password).then (
        (isMatch) =>{
            if(isMatch == false){
                return rep.status(400).json({message: "Password Invalid ...!!!"})

            } else{
                // generate token
                const token =jwt.sign(
                    {data: {id :user.id , role : user.role}},
                    process.env.CLE ,
                    {expiresIn :'2h'}
                    )
                    return rep.status(200).json({
                    message: "   success " ,
                     token : token ,
                      user : user
                    })


            }
        }
    )
}