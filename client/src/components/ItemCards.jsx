import React from 'react'
import { getItems } from '../features/items/itemSlice'
import '../styles/ItemCards.css'

function ItemCards() {
  
    return (
    <div>
        <div className="activeItemCard">
            <div className="activeItemPic">
             <img src="https://www.clipartmax.com/png/small/5-53879_free-clipart-of-a-step-ladder-ladder-clipart.png" alt="cartoon style drawing of a ladder"></img>
        </div>
        <div className="activeItemDetails">
          <div className="rowOne">
            <h3>Item:</h3>
            <p>Rating</p>
          </div>
          <div className="rowTwo">
            <p>Deposit</p>
            <p>Price</p>
          </div>
          <div className="rowThree">
            <p>Category</p>
            <p>Condition</p>
          </div>
          <div className="rowFour">
            <p>Description</p>
          </div>
       
            <div className="buttons">
                <button>Edit Item</button>
                <button>Inactivate Item</button>
            </div>
            </div>
        </div>
    </div>
  )
    }

export default ItemCards