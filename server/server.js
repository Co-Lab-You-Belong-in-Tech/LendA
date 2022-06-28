// config import
import "./config/config.js"

// package imports
import express from "express"

// route imports
import itemRouter from "./routes/itemRoutes.js"

const app = express()

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use("/item", itemRouter)

// port listening
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`)
})
