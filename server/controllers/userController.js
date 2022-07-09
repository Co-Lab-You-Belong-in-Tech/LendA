import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import { signJWT } from "../utils.js"

// REGISTER
export const register = async (req, res) => {
  try {
    // hash password and create new user
    const hash = await bcrypt.hash(req.body.password, 10)
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    })

    // sign token
    const signedToken = await signJWT(newUser.id)

    res.status(200).json({
      status: "success",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        token: signedToken.token,
      },
    })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    // find user by the email
    const user = await User.findOne({ email: req.body.email }).populate("items")
    if (!user) {
      res.status(404).json("error")
    }

    // compare the password
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
      res.status(401).json("Incorrect Password")
    }

    // sign token
    const signedToken = await signJWT(user.id)

    res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        items: user.items,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: signedToken.token,
      },
    })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// gets a single user via a param id
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
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
    res.status(200).json({
      status: "success",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// deletes a user only if params id matches and token user id
export const deleteUser = async (req, res) => {
  try {
    // check if params id = token user id
    if (req.params.id !== req.user.id) {
      res.status(401).json("Unauthorized")
    }
    // find and delete the user
    await User.findByIdAndDelete(req.user.id)
    res.status(200).json({ status: "success", data: null })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}
