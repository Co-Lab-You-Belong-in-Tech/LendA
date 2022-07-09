import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { createItem } from "../features/items/itemSlice"
import { toast } from "react-toastify"
import { register, reset } from "../features/auth/authSlice"
import "../styles/NewPost.css"

function NewPost() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    deposit: "",
    description: "",
    category: "",
    condition: "",
  })

  const { name, price, deposit, description, category, condition } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { currentUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // if (isSuccess || currentUser) {
    //   navigate("/")
    // }

    dispatch(reset)
  }, [currentUser, isError, isSuccess, message, navigate, dispatch])

  const [formState, changeFormState] = useState({
    activeObject: { id: 1 },
    objects: [
      { id: 1, button: "LENDING" },
      { id: 2, button: "BORROWING" },
    ],
  })

  const toggleActive = (index) => {
    changeFormState({ ...formState, activeObject: formState.objects[index] })
  }

  const toggleActiveStyles = (index) => {
    if (formState.objects[index] === formState.activeObject) {
      return "tab-active"
    } else {
      return "tab-inactive"
    }
  }

  const toggleActiveLend = (index) => {
    if (formState.objects[0] === formState.activeObject) {
      return "lendPostForm"
    } else {
      return "lendPost-inactive"
    }
  }

  const toggleActiveBorrow = (index) => {
    if (formState.objects[1] === formState.activeObject) {
      return "borrowPostForm-active"
    } else {
      return "borrowPostForm-inactive"
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const itemData = {
      name,
      price,
      deposit,
      description,
      category,
      condition,
    }

    dispatch(createItem(itemData))
    navigate('/')
  }

  return (
    <div className="postContainer">
      <h2>Lend or Borrow an Item</h2>
      <div className="newPost">
        <div className="postHeader">
          {formState.objects.map((elements, index) => (
            <div
              key={index}
              className={toggleActiveStyles(index)}
              onClick={() => {
                toggleActive(index)
              }}
            >
              <button>{elements.button}</button>
            </div>
          ))}
        </div>

        <div className={toggleActiveLend(0)}>
          <form className="lendPostForm" onSubmit={onSubmit}>
            <div className="lendItem">
              <div className="itemRow">
                <label htmlFor="name">Item:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                ></input>
              </div>

              <div className="itemRow">
                <label>Item Details:</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={onChange}
                ></input>
              </div>
              <div className="itemRow">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={onChange}
                ></input>
                </div>
                <div className="itemRow"></div>
                <div className="itemRow">
                  <label>Deposit</label>
                  <input
                    type="text"
                    name="deposit"
                    id="deposit"
                    value={deposit}
                    onChange={onChange}
                  ></input>
                </div>
                <div className="itemRow">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={price}
                    onChange={onChange}
                  ></input>
                </div>
                <div className="itemRow">
                  <label>Condition</label>
                  <input
                    type="text"
                    name="condition"
                    id="condition"
                    value={condition}
                    onChange={onChange}
                    ></input>
                </div>
        
              <div className="itemRowPost">
                <button type="submit" className="postBtn">
                  Post Item
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className={toggleActiveBorrow(1)}>
          <form className="borrowPostForm">
            <div className="borrowItem">
              <div className="itemRow">
                <label>Item:</label>
                <input type="text"></input>
              </div>
              <div className="itemRow">
                <label>Reason/Project:</label>
                <input type="text"></input>
              </div>
              <div className="itemRow">
                <label>When:</label>
                <input type="text"></input>
              </div>
              <div className="itemRow">
                
                <label>For:</label>
                <input type="text"></input>
              </div>
              <div className="itemRowPost">
                <button className="borrowReqBtn">Request to Borrow</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPost
