import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createItem } from '../features/items/itemSlice';
import '../styles/NewPost.css';

function NewPost() {

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    deposit: '',
    description: '',
    category: '',
    condition: ''
  })

  const {name, price, deposit, description, category, condition} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formState, changeFormState] = useState({
    activeObject: {id: 1},
    objects: [{ id: 1, button: "LENDING" }, { id: 2, button: "BORROWING" }]
  });

  const toggleActive = (index) => {
    changeFormState({ ...formState, activeObject: formState.objects[index] });
  }

  const toggleActiveStyles = (index) => {
    if(formState.objects[index] === formState.activeObject) {
      return "tab-active"
    } else {
      return "tab-inactive"
    }
  }

  const toggleActiveLend = (index) => {
    if(formState.objects[0] === formState.activeObject) {
      return "lendPostForm"
    } else {
      return "lendPost-inactive"
    }
  }

  const toggleActiveBorrow = (index) => {
    if(formState.objects[1] === formState.activeObject) {
      return "borrowPostForm-active"
    } else {
      return "borrowPostForm-inactive"
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = e => {
    e.preventDefault()

    const itemData = {
      name, price, deposit, description, category, condition,
    }

    dispatch(createItem(itemData))
  }
  

  return (
    <div className="postContainer">
      <h2>Lend or Borrow an Item</h2>
      <div className="newPost">
        <div className="postHeader">
        {formState.objects.map((elements, index) => (
          <div key={index} className={toggleActiveStyles(index)} onClick={() => {toggleActive(index)}}>
            <button>{elements.button}</button>
          </div>
          ))}
                   
        </div>

        
        <div className={toggleActiveLend(0)}>
          <form className="lendPostForm" onSubmit={onSubmit}>
            <div className="lendItem">
              <label htmlFor="name">Item:</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={name} 
                onChange={onChange}
                >
                </input>
            </div>
            <div className="lendItemDeets">
              <label>Item Details:</label>
              <input type="text"></input>
              <label>Category</label>
              <input type="text"></input>
              <label>Condition</label>
              <input type="text"></input>
            </div>
            <div className="itemPrice">
              <label>Deposit</label>
              <input type="text"></input>
              <label>Price</label>
              <input type="text"></input>
            </div>
            <div className="itemAvail">
              <label>Availability:</label>
              <input type="text"></input>
              <label className="availLabel">Available On:</label>
              <input type="text"></input>
              
            </div>
            <div className="post">
              <button type='submit' className="postBtn">Post Item</button>
            </div>
          </form>
        </div>

        <div className={toggleActiveBorrow(1)}>
          <form className="borrowPostForm">
          <div className="borrowItem">
              <label>Item:</label>
              <input type="text"></input>
            </div>
            <div className="borrowItemDeets">
              <label>Reason/Project:</label>
              <input type="text"></input>
            </div>
            <div className="borrowTimeFrame">
              <label>When:</label>
              <input type="text"></input>
              <label>For:</label>
              <input type="text"></input>
            </div>
            <div className="borrowReq">
              <button className="borrowReqBtn">Request to Borrow
              </button>
            </div>
          </form>

        </div>

      </div>
      
    </div>
  )
}

export default NewPost