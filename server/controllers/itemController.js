import fs from 'fs';
import util from 'util';

import Item from '../models/itemModel.js';
import User from '../models/userModel.js';

import uploadFile from '../config/s3.js';

const unlinkFile = util.promisify(fs.unlink);

// get all items in db
export const getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = {};

    if (endIndex < (await Item.countDocuments().exec())) {
      data.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      data.previous = {
        page: page - 1,
        limit,
      };
    }

    data.data = await Item.find()
      .limit(limit)
      .skip(startIndex)
      .populate('owner', '-password')
      .exec();

    return res.status(200).json({ status: 'success', ...data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// create an item post
export const createItem = async (req, res) => {
  try {
    // Check to see if the JWT token is a valid user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    // check to see if user submitted a file
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'error', message: 'No image submitted' });
    }

    // upload file to s3
    const file = await uploadFile(req.file);

    // delete item from uploads/
    await unlinkFile(req.file.path);

    // create item
    const newItem = await Item.create({
      name: req.body.name,
      price: req.body.price,
      deposit: req.body.deposit,
      description: req.body.description,
      category: req.body.category,
      condition: req.body.condition,
      availability: req.body.availability,
      image: file.Location,
      owner: user.id,
    });

    // add item id to array on user object
    user.items.push(newItem.id);
    await user.save();

    // find item newly created item and populate the user info
    const item = await Item.findById(newItem.id).populate('owner', '-password');

    return res.status(200).json({ status: 'success', data: item });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// gets a single item via id
export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      'owner',
      '-password'
    );
    if (!item) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Item not found' });
    }

    return res.status(200).json({ status: 'success', data: item });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// update an item post
export const updateItem = async (req, res) => {
  try {
    // check to see if item exists
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Item not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ status: 'error', message: 'No user found' });
    }

    // check if item owner id === token user id
    if (item.owner.toString() !== user.id) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    // find and update item
    const updatedItem = await Item.findByIdAndUpdate(item.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('owner', '-password');

    return res.status(200).json({ status: 'success', data: updatedItem });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// delete an item post
export const deleteItem = async (req, res) => {
  try {
    // check to see if item exists
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Item not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ status: 'error', message: 'No user found' });
    }

    // check if item user id = token user id
    if (item.owner.toString() !== req.user.id) {
      return res.status(400).json({ status: 'error', message: 'Unauthorized' });
    }

    // find and delete item
    await Item.findByIdAndDelete(item.id);

    return res.status(200).json({ status: 'success', data: { id: item.id } });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};
