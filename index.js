import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import carsRoutes from './routes/cars.js'

const app = express()
dotenv.config()

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO)
		console.log('*** Connected to MongoDB! ***')
	} catch (error) {
		throw error
	}
}

mongoose.connection.on('disconnected', () => {
	console.log('*** mongoDB disconnected! ***')
})

//middlewares

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/cars', carsRoutes)

app.use((req, res, next) => {
	return res.status(500).json('Error handler!')
})
app.listen(8800, () => {
	connect()
	console.log('*** Connected to backend! ***')
})
