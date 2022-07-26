// package imports
import express from 'express';
import passport from 'passport';
import cors from 'cors';

// config import
import { PORT } from './config/config.js';
import connectMongo from './config/db.js';

// route imports
import itemRouter from './routes/itemRoutes.js';
import userRouter from './routes/userRoutes.js';

// init app
const app = express();

// connect to db
connectMongo();

// cors - only allow front end
app.use(cors());

// init passport
app.use(passport.initialize());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/item', itemRouter);
app.use('/user', userRouter);

// port listening
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
