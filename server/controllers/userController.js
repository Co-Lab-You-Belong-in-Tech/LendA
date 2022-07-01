import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
  try {
    const user = req.body
    const hash = await bcrypt.hash(user.password, 10)
    // Note !!!! dont send password back to user
    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: hash,
    })
    res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    res.status(200).json("login")
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
