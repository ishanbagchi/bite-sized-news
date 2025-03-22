import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { customAlphabet } from 'nanoid'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import 'dotenv/config'
import User from './Schema/User.js'

const app = express()
const PORT = 3000

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/

app.use(express.json())
app.use(cors())

if (process.env.DB_LOCATION) {
	mongoose
		.connect(process.env.DB_LOCATION, {
			autoIndex: true,
		})
		.then(() => {
			console.log('Connected to MongoDB')
		})
}

const generateUsername = async (email) => {
	let username = email.split('@')[0]

	const isUsernamePresent = await User.exists({
		'personal_info.username': username,
	}).then((result) => result)

	if (isUsernamePresent) {
		const nanoid = customAlphabet('abcdef', 5)
		return username + '#' + nanoid()
	}
	return username
}

const formatDataToSend = (user) => {
	const access_token = jwt.sign(
		{ id: user._id },
		process.env.SECRET_ACCESS_KEY,
	)
	return {
		access_token,
		profile_img: user.personal_info.profile_img,
		username: user.personal_info.username,
		fullname: user.personal_info.fullname,
	}
}

app.post('/api/register', (req, res) => {
	const { fullname, email, password } = req.body

	if (!fullname || !email || !password) {
		return res.status(400).json({ error: 'All fields are required' })
	}

	if (fullname.length < 3) {
		return res
			.status(422)
			.json({ error: 'Name must be at least 3 characters long' })
	}

	if (!emailRegex.test(email)) {
		return res.status(422).json({ error: 'Invalid email address' })
	}

	if (!passwordRegex.test(password)) {
		return res.status(422).json({
			error: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
		})
	}

	bcrypt.hash(password, 10, async (err, hashedPassword) => {
		const username = await generateUsername(email)
		const userObject = new User({
			personal_info: {
				fullname,
				email,
				password: hashedPassword,
				username,
			},
		})
		userObject
			.save()
			.then((user) => {
				return res.status(200).json(formatDataToSend(user))
			})
			.catch((error) => {
				if (error.code === 11000) {
					return res
						.status(500)
						.json({ error: 'Email already exists' })
				}
				return res.status(500).json({
					error: error.message,
				})
			})
	})
})

app.post('/api/login', (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ error: 'All fields are required' })
	}

	if (!emailRegex.test(email)) {
		return res.status(422).json({ error: 'Invalid email address' })
	}

	User.findOne({ 'personal_info.email': email })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ error: 'Invalid email or password' })
			}
			bcrypt.compare(
				password,
				user.personal_info.password,
				(err, result) => {
					if (err) {
						return res.status(500).json({ error: err.message })
					}
					if (result) {
						return res.status(200).json(formatDataToSend(user))
					}
					return res
						.status(401)
						.json({ error: 'Invalid email or password' })
				},
			)
		})
		.catch((error) => {
			return res.status(500).json({
				error: error.message,
			})
		})
})

app.listen(PORT, () => {
	console.log(`Server is running on  http://localhost:${PORT}`)
})
