import Item from "../models/itemModel.js"

export const getItems = async (req, res) => {
  try {
    // use find method to get all data
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createItem = async (req, res) => {
  try {
    const item = req.body
    const newItem = await Item.create({
      name: item.name,
      owner: item.owner,
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

export const getItem = async (req, res) => {
  try {
    res.status(200).json(`got item ${req.params.id}`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateItem = async (req, res) => {
  try {
    res.status(200).json(`updated item ${req.params.id}`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteItem = async (req, res) => {
  try {
    res.status(200).json(`deleted item ${req.params.id}`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
