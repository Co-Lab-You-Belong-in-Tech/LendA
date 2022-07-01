import User from "../models/userModel.js"

export const login = async (req, res) => {
  try {
    res.status(200).json("login")
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const register = async (req, res) => {
  try {
    res.status(200).json("registered!")
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
