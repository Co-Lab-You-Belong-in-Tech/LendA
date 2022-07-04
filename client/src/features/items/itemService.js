import axios from 'axios'

const API_URL = 'http://localhost:8000/item/'

// Create new item
const createItem = async (itemData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, itemData, config)

    return response.data
}

const itemService = {
    createItem,
}
export default itemService