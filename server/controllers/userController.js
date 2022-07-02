import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import { signJWT } from "../utils.js"

export const register = async (req, res) => {
  try {
    const user = req.body

    const hash = await bcrypt.hash(user.password, 10)
    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: hash,
    })

    const signedToken = await signJWT(newUser.id)
    res.status(200).json({
      success: true,
      message: "registerd",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token: signedToken.token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.status(404).json("error")
    }

    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
      res.status(401).json("Incorrect Password")
    }

    const signedToken = await signJWT(user.id)

    res.status(200).json({
      success: true,
      message: "logged in",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: signedToken.token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    res.status(200).json(`got user ${req.params.id}`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    res.status(200).json(`deleted user ${req.params.id}`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
