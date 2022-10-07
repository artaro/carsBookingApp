import express, { request } from 'express'
import Car from '../models/Car.js'

const router = express.Router()

//CREATE
router.post('/', async (req, res) => {
	const newCar = new Car(req.body)

	try {
		const savedCar = await newCar.save()
		res.status(200).json(savedCar)
	} catch (error) {
		res.status(500).json(error)
	}
})

//UPDATE
router.put('/:id', async (req, res) => {
	try {
		const updatedCar = await Car.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		)
		res.status(200).json(updatedCar)
	} catch (error) {
		res.status(500).json(error)
	}
})

//DELETE
router.delete('/:id', async (req, res) => {
	try {
		await Car.findByIdAndDelete(req.params.id)
		res.status(200).json(`Car id: ${req.params.id} has been deleted...`)
	} catch (error) {
		res.status(500).json(error)
	}
})

//GET
router.get('/:id', async (req, res) => {
	try {
		const car = await Car.findById(req.params.id)
		res.status(200).json(car)
	} catch (error) {
		res.status(500).json(error)
	}
})

//GET ALL
router.get('/', async (req, res, next) => {
	console.log('This is car route!')

	try {
		const cars = await Car.find()
		res.status(200).json(cars)
	} catch (error) {
		res.status(500).json(error)
	}
})

export default router
