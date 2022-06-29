// config import
import { PORT } from "./config/config.js"

// package imports
import express from "express"

// route imports
import itemRouter from "./routes/itemRoutes.js"
import userRouter from "./routes/userRoutes.js"

import { connectMongo } from "./config/db.js"

const app = express()

connectMongo()

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/item", itemRouter)
app.use("/user", userRouter)

// port listening
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`)
})
