import axios from 'axios'

const API_URL = 'http://localhost:8000/item/'

// Create new item
const createItem = async (itemData, token) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const response = await axios.post(API_URL, itemData, config)

    return response.data
}

// Get all items in db
const getItems = async (itemData) => {
    const response = await axios.get(API_URL, itemData)

    // if(response.data) {
    //     localStorage.setItem('items', JSON.stringify(response.data))
    // }

    return response.data
}


const itemService = {
    createItem,
    getItems,
}
export default itemService

// const getItems = async (token) => {
//     const config = {
//         headers: {
//             Authorization: token
//         }
//     }

//     const response = await axios.get(API_URL, config)

//     return response.data
// }