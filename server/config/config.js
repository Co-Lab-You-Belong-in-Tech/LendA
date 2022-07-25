/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5001;
export const NODE_ENV = process.env.NODE_ENV;

export const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

export const JWT_SECRET = process.env.JWT_SECRET;

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
