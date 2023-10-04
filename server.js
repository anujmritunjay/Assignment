const mongoose = require('mongoose')
const errorMiddleware = require('./Middleware/Error')
const express = require('express')
const bodyParser = require('body-parser')
const helper = require('./utils/helper')
const userRouter = require('./Routes/userRoutes')
const User = require('./Models/userModels')
const morgan = require("morgan");
var cors = require('cors')
require('dotenv').config()

const app = express ();



app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
app.use(morgan("tiny"));
app.use('',userRouter)



app.post('/submit', (req, res) => {
    const { name } = req.body;
    console.log('name: ', name);
  
    // Process the form data
    // const fullName = `${firstName} ${lastName}`;
    res.send(`Received form data: ${name}`);
  });


const DB = process.env.DB
const PORT = process.env.PORT || 3000

mongoose.connect(DB)
    .then(async()=> {
        console.log('Database connected successfully.')

        const adminPayload = {
            userName: 'admin',
            userEmail: 'mritunjay.studies@gmail.com',
            userPassword: await helper.getHashPassword('Admin@123'),
        }
        const admin = await User.findOne({userName: adminPayload.userName})
        if (!admin){
            await User.create(adminPayload)
        }
    })
    .catch(err => console.log(err));


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/static/index.html');
//     });

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`)
})

app.use(errorMiddleware)