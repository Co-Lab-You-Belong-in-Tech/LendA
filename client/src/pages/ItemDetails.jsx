import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getItems, getItem, reset } from "../features/items/itemSlice"
import "../styles/ItemDetails.css"

function ItemDetails() {
  
  const params = useParams()
  const id = params.itemId

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.auth)
  const { items, item, isLoading, isError, message } = useSelector(
    (state) => state.items
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getItems())
    console.log("items", items)
    console.log("items", items.length)


    dispatch(getItem(id))
    console.log("item id:", id)
    console.log("item", item)
   
    return () => {
      dispatch(reset())
    }
  }, [currentUser, navigate, isError, message, dispatch])

  return (
    // Item Detail Card

    <div className="detailContainer">
      <div className="detailHeader">
        <a href="/#">
          <i className="fa-solid fa-arrow-left fa-lg"></i>
          <h2>Back to Searched Results</h2>
        </a>
      </div>
        {item ? (
          <div className="detailCard">
            <div className="pics">
              <div className="mainPic"></div>
            </div>
            
            <div className="itemDetails">
              <div className="mainDetails">
                <h3 id="itemName">{item.name}</h3>
                <h4 id="itemPrice">{item.price}</h4>
                <p><strong>Condition: </strong>{item.condition}</p>
                <p><strong>Category: </strong>{item.category}</p>
                <p>
                {item.description}
                </p>
                <button id="contactUser">Contact User</button>
              </div>
              <div className="lenderDetails">
                <h4 id="lenderName">Lender</h4>
                <div className="lenderInfo">
                  <div className="lenderPic">
                    <img src="https://truckeetrails.org/wp-content/uploads/2022/04/025baa5b2cd7e46b6b4730247f6663ed.png" alt="placeholder image of a person icon"></img>
                  </div>
                  <div className="ratings">
                    <p id="ratingNumber">{"(14)"}</p>
                    <i className="fa-solid fa-star fa-sm"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        
      ) : (
        <h3>Item not found</h3>
      )}

      <div className="relatedHeader">
        <h2>RELATED ITEMS</h2>
      </div>
      <div className="relatedItems">
        <div className="relItemCard"></div>
        <div className="relItemCard"></div>
        <div className="relItemCard"></div>
      </div>

     
      <div className="otherItemsHeader">
        <h2>OTHER ITEMS BY LENDER</h2>
        <div className="otherItems">
          <div className="otherItemCard"></div>
          <div className="otherItemCard"></div>
          <div className="otherItemCard"></div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetails

// connect(mapStateToProps)
