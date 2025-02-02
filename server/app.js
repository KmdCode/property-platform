const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const authRouter = require('./routes/authRouter')
const landlordRouter = require('./routes/landlordRouter')
const userRouter = require('./routes/userRouter')

dotenv.config({path: './config/config.env'})
const app = express()

app.use(express.json())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(cors({
    origin:'http://localhost:3000',
    method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true
}))

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser:true,
}).then(con=>{
    //console.log(con.connections)
    console.log('DB connection successful')
})

app.get('/', (req, res)=>{
    res.status(200).json({
        status: 'success',
        message: 'connection successful'
    })
})
app.options('*', cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRouter)
app.use('/landlord', landlordRouter)
app.use('/user', userRouter)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})