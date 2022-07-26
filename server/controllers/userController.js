import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Item from '../models/itemModel.js';
import signJWT from '../utils/utils.js';

// REGISTER
export const register = async (req, res) => {
  try {
    // hash password and create new user
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      email: req.body.email,
      first: req.body.first,
      last: req.body.last,
      password: hash,
      zipcode: req.body.zipcode,
    });

    // sign token
    const signedToken = await signJWT(newUser.id);

    return res.status(200).json({
      status: 'success',
      data: {
        type: 'user',
        id: newUser.id,
        email: newUser.email,
        first: newUser.first,
        last: newUser.last,
        zipcode: newUser.zipcode,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        token: signedToken.token,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    // find user by the email
    const user = await User.findOne({ email: req.body.email }).populate(
      'items'
    );
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    // compare the password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Incorrect password' });
    }

    // sign token
    const signedToken = await signJWT(user.id);

    return res.status(200).json({
      status: 'success',
      data: {
        type: 'user',
        id: user.id,
        email: user.email,
        first: user.first,
        last: user.last,
        zipcode: user.zipcode,
        items: user.items,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: signedToken.token,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('items');
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        type: 'user',
        id: user.id,
        email: user.email,
        first: user.first,
        last: user.last,
        zipcode: user.zipcode,
        items: user.items,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// GET USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('items')
      .select('-password');
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    return res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    // check to see if param id = jwt id
    if (req.params.id !== req.user.id) {
      return res.status(400).json({ status: 'error', message: 'Unauthorized' });
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('items')
      .select('-password');

    return res.status(200).json({ status: 'success', data: updatedUser });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    // check if params id = token user id
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    // delete all user items
    await Item.deleteMany({ owner: req.user.id });

    // delete the user
    await User.findByIdAndDelete(req.user.id);

    return res.status(200).json({ status: 'success', data: null });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};
