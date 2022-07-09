import Item from "../models/itemModel.js"

// get all items in db
export const getItems = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json({ status: "success", data: { items: items }})
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: "error", message: error.message })
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
    res.status(200).json({ status: "success", data: { item: newItem } })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// gets a single item via id
export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    res.status(200).json({ status: "success", data: { item: item } })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// update an item post
export const updateItem = async (req, res) => {
  try {
    // check to see if item exists
    const item = await Item.findById(req.params.id)
    if (!item) {
      res.status(404).json("Not Found")
    }

    //check if item owner id === token user id
    if (!item.user === req.user.id) {
      res.status(400).json("Error")
    }

    // find and update item
    const updatedItem = await Item.findByIdAndUpdate(item.id, req.body, {
      new: true,
    })
    res.status(200).json({ status: "success", data: { item: updatedItem } })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// delete an item post
export const deleteItem = async (req, res) => {
  try {
    // check to see if item exists
    const item = await Item.findById(req.params.id)
    if (!item) {
      res.status(404).json("Not Found")
    }

    // check if item user id = token user id
    if (!item.user === req.user.id) {
      res.status(400).json("Error")
    }

    // find and delete item
    await Item.findByIdAndDelete(req.params.id)
    res.status(200).json({ status: "success", data: null })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}
