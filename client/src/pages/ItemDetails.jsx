import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getItems, getItem, reset } from '../features/items/itemSlice';
import '../styles/ItemDetails.css';

function ItemDetails() {

  const params = useParams()
  // console.log("id:", params)
  // console.log(params.itemId)

  const id = params.itemId

  // const mapStateToProps = (state, ownProps) => {
  //   const { visibilityFilter } = state
  //   const { id } = ownProps
  //   const item = getItemById(state, id)

  //   return {item, visibilityFilter}
  // }
  // const { itemId } = useParams(match)

  // const item = useSelector(state => state.items.find(item => item._id === itemId))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const [item, setItem] = useState()

  const { user } = useSelector((state) => state.auth)
  const { items, item, isLoading, isError, message } = useSelector((state) => state.items)

  useEffect(() => {
    if(isError) {
      console.log(message);
    }


    dispatch(getItems())
    console.log("items", items)
    
   
    dispatch(getItem(id))
    console.log("item:", id)
    console.log(item.data.item)
  

    return () => {
      dispatch(reset())
    }
  
  }, [user, navigate, isError, message, dispatch])


  return (
    // Item Detail Card
    
    <div className="deetsContainer">
      {items  ? (
        <div className="deetsCard">
        {/* <p>{items.data.item.name}</p> */}
        <div className="itemPics">
          <div className="mainPic">
          <img src="https://www.clipartmax.com/png/small/5-53879_free-clipart-of-a-step-ladder-ladder-clipart.png" alt="cartoon style drawing of a ladder" />
          <i className="fa-solid fa-angle-right"></i>
          </div>
        <div className="otherPics">
          <div className="otherPic"></div>
          <div className="otherPic"></div>
          <div className="otherPic"></div>
        </div>
      </div>
    
      <div className="itemDetails">
        <div className="mainDetails">
          {/* <h2>{items.data.item.name}</h2> */}
          <p>This is a great ladder. It will support your weight while making you taller. Nice & sturdy.</p>
          <p>Rate/day</p>
          <p><strong>Available:</strong> Anytime</p>
        <div className="lenderDeets">
          <h5>Lender</h5>
          <p>{"(14)"}</p>
          <div className="rating">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
        <button className="borrowBtn">Borrow It!</button>
      </div>
    </div>
    </div>

      ) : (<h3>Item not found</h3>)}
        
      
      {/* End Detail Card */}

      {/* Related Items */}
      <div className="relatedHeader">
        <h2>RELATED ITEMS</h2>
      </div>
      <div className="relatedItems">
        <div className="relItemCard">

        </div>
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