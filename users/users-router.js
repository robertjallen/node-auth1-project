const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("./users-model")
// const restrict = require("../middleware/restrict")

const router = express.Router()

router.get("/users", async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})
//////////////////////////////////////
//     CREATE  USER
/////////////////////////////////////
router.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
			// hash the password with a time complexity of "14"
			password: await bcrypt.hash(password, 14),
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})
module.exports = router