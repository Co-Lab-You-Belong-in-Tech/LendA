import Item from "../models/itemModel.js"

// get all items in db
export const getItems = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// create an item post
export const createItem = async (req, res) => {
  try {
    const item = req.body
    const newItem = await Item.create({
      name: item.name,
      user: req.user.id,
      price: item.price,
      deposit: item.deposit,
      description: item.description,
      category: item.category,
      condition: item.condition,
    })
    res.status(200).json(newItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// gets a single item via id
export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// update an item post
export const updateItem = async (req, res) => {
  try {
    const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updateItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// delete an item post
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id)
    res.status(200).json(`Item successfully deleted`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
