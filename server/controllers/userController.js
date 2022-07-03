import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import { signJWT } from "../utils.js"

// create a user and issue a JWT token
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

// check body and compare password, then issue JWT token
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

// gets a single user via a param id
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// updates a user by checking if param id matches token user id
export const updateUser = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      res.status(400).json("Not Authorized")
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// deletes a user only if params id matches and token user id
export const deleteUser = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      res.status(400).json("Not Authorized")
    }
    await User.findByIdAndDelete(req.user.id)
    res.status(200).json(`deleted user ${req.user.id}`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
