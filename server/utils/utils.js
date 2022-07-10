import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

const signJWT = async (id) => {
  const token = await jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '1d' });
  return { token: `Bearer ${token}` };
};

export default signJWT;
