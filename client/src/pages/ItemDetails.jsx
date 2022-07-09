import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch, connect } from "react-redux"
import { getItems, getItem, reset } from "../features/items/itemSlice"
import "../styles/ItemDetails.css"

function ItemDetails() {
  // const [selectedItem, setSelectedItem] = useState({})
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

    // let itemArray = items.data.items

    // const selectedItem = itemArray.filter(function(id) {
    //   if(itemArray[0]._id === id) {
    //     return true;
    //   }
    // })

    // setSelectedItem(...selectedItem)

    dispatch(getItem(id))
    console.log("item id:", id)
    console.log("item", item)
    // console.log(selectedItem)
    // console.log(itemArray)
    // console.log(itemArray[0])

    return () => {
      dispatch(reset())
    }
  }, [currentUser, navigate, isError, message, dispatch])

  return (
    // Item Detail Card

    <div className="deetsContainer">
      <div className="deetsHeader">
        <a href="/#">
          <i className="fa-solid fa-arrow-left fa-lg"></i>
          <h2>Back to Searched Results</h2>
        </a>
      </div>
      {items ? (
        <div className="deetsCard">
          {/* <p>{items.data.item.name}</p> */}
          <div className="itemPics">
            <div className="mainPic">
              {/* <img src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" /> */}
            </div>
            <div className="otherPics">
              <div className="otherPic"></div>
              <div className="otherPic"></div>
              <div className="otherPic"></div>
            </div>
          </div>

          <div className="itemDetails">
            <div className="mainDetails">
              <h2>{item.name}</h2>
              <p>Rate/day</p>
              <p>Condition: Great</p>
              <p>Category: Tools</p>
              <p>
                This is a great ladder. It will support your weight while making
                you taller. Nice & sturdy.
              </p>
              <button>Contact User</button>
            </div>
            <div className="lenderDeets">
              <div className="lenderPic">
                <img></img>
              </div>
              <div className="lenderInfo">
                <h4>Lender</h4>
                <p>{"(14)"}</p>
                <div className="rating">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>Item not found</h3>
      )}

      {/* End Detail Card */}

      {/* Related Items */}
      <div className="relatedHeader">
        <h2>RELATED ITEMS</h2>
      </div>
      <div className="relatedItems">
        <div className="relItemCard"></div>
        <div className="relItemCard"></div>
        <div className="relItemCard"></div>
      </div>

      {/* Other Items by Lender */}
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
