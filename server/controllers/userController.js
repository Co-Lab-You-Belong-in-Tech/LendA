import bcrypt from 'bcrypt';
import User from '../models/userModel';
import Item from '../models/itemModel';
import signJWT from '../utils/utils';

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

    res.status(200).json({
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
    res.status(400).json({ status: 'error', message: error.message });
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
      res.status(404).json('No User found');
    }

    // compare the password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.status(401).json('Incorrect Password');
    }

    // sign token
    const signedToken = await signJWT(user.id);

    res.status(200).json({
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
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// GET USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('items')
      .select('-password');
    if (!user) {
      res.status(404).json('User Not Found');
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    // check to see if param id = jwt id
    if (req.params.id !== req.user.id) {
      res.status(400).json('Not Authorized');
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('items')
      .select('-password');

    res.status(200).json({ status: 'success', data: updatedUser });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    // check if params id = token user id
    if (req.params.id !== req.user.id) {
      res.status(401).json('Unauthorized');
    }
    // delete all user items
    await Item.deleteMany({ owner: req.user.id });

    // delete the user
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({ status: 'success', data: null });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
