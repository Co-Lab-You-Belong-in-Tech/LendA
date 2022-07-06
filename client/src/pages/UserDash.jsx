import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, reset } from '../features/items/itemSlice';
import BarLoader from 'react-spinners/ClipLoader';
import '../styles/UserDash.css'

function UserDash() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector((state) => state.items)

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getItems())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

const [appState, changeState] = useState({
  activeObject: null,
  objects: [{ id: 1, button: "LENDING" }, { id: 2, button: "BORROWING" }, { id: 3, button: "HISTORY" }, { id: 4, button: "SAVED ITEMS" }]
});

const toggleActive = (index) => {
  changeState({ ...appState, activeObject: appState.objects[index]});
}

const toggleActiveStyles = (index) => {
  if (appState.objects[index] === appState.activeObject) {
    return "activeCards"
  } else {
    return "inactiveCards"
  }
}

if (isLoading) {
  return <BarLoader />
}

  return (<>
    <div className="dashContainer">
      <button>LOG OUT</button>
      <div className="dashNav">
        <ul>
          {appState.objects.map((elements, index) => (
            <li key={index} className={toggleActiveStyles(index)} onClick={() => {toggleActive(index)}}><button>{elements.button}</button></li>
          ))}
          
        </ul>
      </div>
      <div className="myItemsHeader">
        <h2>My Active Items</h2>
      </div>
      
      {/* {items.items ? ( */}
        <div className="activeList">
          {items.items.map((item) => (
        <div className="activeItemCard" key={item._id} item={item}>
        <div className="activeItemPic">
          <img src="https://www.clipartmax.com/png/small/5-53879_free-clipart-of-a-step-ladder-ladder-clipart.png" alt="cartoon style drawing of a ladder"></img>
        </div>
        <div className="activeItemDetails">
          <div className="rowOne">
            <h3>Item:</h3>
          </div>
          <div className="rowTwo">
            {/* <h4>Deposit: {item.deposit}</h4>
            <p>Rate/hour: {item.price}</p> */}
          </div>
          <div className="rowThree">
            {/* <h3>Category: {item.category}</h3>
            <p>Condition: {item.condition}</p> */}
          </div>
          <div className="rowFour">
            {/* <p>Description: {item.description}</p> */}
          </div>
        </div>
        <button>Edit Item</button>
      </div>))}
      </div>
      

      {/* // ) : (<h3>You do not have any active items</h3>)}   */}
          
        
      


    </div>
    </>
  )
}

export default UserDash