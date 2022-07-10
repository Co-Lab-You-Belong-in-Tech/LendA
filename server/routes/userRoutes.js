import express from 'express';
import authJWT from '../config/passport';

import {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/:id', getUser);
router.put('/:id', authJWT, updateUser);
router.delete('/:id', authJWT, deleteUser);

export default router;
