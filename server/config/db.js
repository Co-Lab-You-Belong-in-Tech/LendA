import mongoose from 'mongoose';
import { NODE_ENV, CONNECTION_STRING } from './config';

const connectMongo = async () => {
  try {
    if (NODE_ENV === 'production') {
      const connection = await mongoose.connect(CONNECTION_STRING);
      console.log(`MongoDB connected: ${connection.connection.host}`);
    } else {
      // change back to local host here
      const connection = await mongoose.connect('mongodb://127.0.0.1/lenda');
      console.log(`MongoDB connected: ${connection.connection.host}`);
    }
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  }
};

export default connectMongo;
