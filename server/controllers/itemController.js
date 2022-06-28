export const getItems = async (req, res) => {
  try {
    res.status(200).json("items")
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createItem = async (req, res) => {
  try {
    res.status(200).json("created item")
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
