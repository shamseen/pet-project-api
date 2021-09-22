import User from "../models/Users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SALT_ROUNDS = 11;
const TOKEN_KEY = process.env.TOKEN_KEY || "willchangelater";

const today = new Date()
const exp = new Date(today)
exp.setDate(today.getDate() + 5)

export const signUp = async (req, res) => {
  try {
    const { name, email, password} = req.body;
    const passwordDigest = await bcrypt.hash(password, parseInt(SALT_ROUNDS))

    const user = new User({
      email,
      name,
      passwordDigest,
    })
    await user.save()

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      exp: parseInt(exp.getTime() / 1000)
    }

    const token = jwt.sign(payload, TOKEN_KEY)

    res.status(201).json({ token })
    
  } catch (e) {
    res.status(404).json({error: e.message})
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(
      "email name passwordDigest"
    )

    if (await bcrypt.compare(password, user.passwordDigest)) {
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        exp: parseInt(exp.getTime() / 1000)
      }
      const token = jwt.sign(payload, TOKEN_KEY)

      res.status(201).json({token})
    } else {
      res.status(401).json({error: "Invalid Credentials"})
    }

  } catch (e) {
    res.status(500).json({error: e.message})
  }
}

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, TOKEN_KEY)
    
    if (payload) {
      res.json(payload)
    }
  } catch (e) {
    res.status(401).json({error: "Not Authorized"})
  }
}