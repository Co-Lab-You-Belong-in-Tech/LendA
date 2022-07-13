import express from 'express';
import multer from 'multer';
import {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController';
import authJWT from '../config/passport';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getItems);
router.post('/', upload.array('photos', 5), authJWT, createItem);

router.get('/:id', getItem);
router.put('/:id', authJWT, updateItem);
router.delete('/:id', authJWT, deleteItem);

export default router;
