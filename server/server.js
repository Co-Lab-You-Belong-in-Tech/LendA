// config import
import { PORT, NODE_ENV } from "./config/config.js"
import { connectMongo } from "./config/db.js"

// package imports
import express from "express"
import passport from "passport"
import cors from "cors"
import morgan from "morgan"

// route imports
import itemRouter from "./routes/itemRoutes.js"
import userRouter from "./routes/userRoutes.js"

// init app
const app = express()

// connect to db
connectMongo()

// cors - only allow front end
app.use(cors({ origin: "http://localhost:3000" }))

// init passport
app.use(passport.initialize())

if (NODE_ENV === "development") {
  app.use(morgan("dev"))
}

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
