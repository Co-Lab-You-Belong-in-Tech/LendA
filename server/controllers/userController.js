import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import { JWT_SECRET } from "../config/config.js"

export const register = async (req, res) => {
  try {
    const user = req.body
    const hash = await bcrypt.hash(user.password, 10)
    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: hash,
    })
    // NOTE FOR LATER !!!! dont send password back to user
    res.status(200).json(newUser)
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

    const token = await jwt.sign({ sub: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    })
    res
      .status(200)
      .json({
        success: true,
        user: user,
        message: "Logged In",
        token: "Bearer " + token,
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
    res.status(200).json(`updated user ${req.params.id}`)
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
