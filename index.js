import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)

const PORT = process.env.PORT || 3100

// const CONNECTION_URL = "mongodb+srv://stclone:admin123@lion.neq8vcm.mongodb.net/?retryWrites=true&w=majority" // THIS WILL NOT WORK WITH ANY OTHER SERVER AND WE WILL ITS A PERSONAL USE ONLY LIKE DEVELOPMENT PURPOSE ONLY
const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL)
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)})) //App lessoning the server
    .catch((err) => console.log(err.message))