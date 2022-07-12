import Item from '../models/itemModel';
import User from '../models/userModel';

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

    res.status(200).json({ status: 'success', ...data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// create an item post
export const createItem = async (req, res) => {
  try {
    // find user object and check to see if exists
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json('Not Found');
    }

    // create item
    const newItem = await Item.create({
      name: req.body.name,
      price: req.body.price,
      deposit: req.body.deposit,
      description: req.body.description,
      category: req.body.category,
      condition: req.body.condition,
      available: true,
      owner: user.id,
    });

    // add item id to array on user object
    user.items.push(newItem.id);
    await user.save();

    // find item newly created item and populate the user info
    const item = await Item.findById(newItem.id).populate('owner', '-password');

    res.status(200).json({ status: 'success', data: item });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
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
      res.status(404).json('Item Not Found');
    }

    res.status(200).json({ status: 'success', data: item });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// update an item post
export const updateItem = async (req, res) => {
  try {
    // check to see if item exists
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json('Item Not Found');
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json('Not Found');
    }

    // check if item owner id === token user id
    if (item.owner.toString() !== user.id) {
      res.status(401).json('Not Authorized');
    }

    // find and update item
    const updatedItem = await Item.findByIdAndUpdate(item.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('owner', '-password');

    res.status(200).json({ status: 'success', data: updatedItem });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// delete an item post
export const deleteItem = async (req, res) => {
  try {
    // check to see if item exists
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json('Item Not Found');
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json('Not Found');
    }

    // check if item user id = token user id
    if (item.owner.toString() !== req.user.id) {
      res.status(400).json('Not Authorized');
    }

    // find and delete item
    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({ status: 'success', data: null });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
