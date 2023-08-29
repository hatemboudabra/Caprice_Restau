const express = require ('express')
require('dotenv').config()
 const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.use( cors())
app.get('/' ,(req,res)=>{
    res.send('hala madrid')
})
const userRouter = require('./routes/user.router')
app.use('/users',userRouter)

mongoose.connect(process.env.CONNECTION_STRING,
{
    useNewUrlParser : true,
    useUnifiedTopology : true

}
) 
const db =mongoose.connection;
db.on("error",console.error.bind(console,"connection error : "));
db.once("open", function(){
    console.log("base de donnée connecté")
})



app.listen(process.env.PORT,()=>{
    console.log(`app listing on port ${process.env.PORT}`);
})
