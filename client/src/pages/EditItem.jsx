import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch, connect } from "react-redux"
import { getItem, updateItem, reset } from "../features/items/itemSlice"
import '../styles/EditItem.css'

function EditItem() {

  // const { itemId } = match.params

  const params = useParams()
  const id = params.itemId

 

  const [formData, setFormData] = useState({
    name: "",
    pictures: [],
    price: "",
    deposit: "",
    description: "",
    category: "",
    condition: "",
    availability: true,
  })

  // const [updatedItem, setUpdatedItem] = useState({
  //   name: "",
  //   pictures: [],
  //   price: "",
  //   deposit: "",
  //   description: "",
  //   category: "",
  //   condition: "", 
  // })

  const { name, pictures, price, deposit, description, category, condition } = formData


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.auth)
  const { item, isLoading, isError, message } = useSelector(
    (state) => state.items
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getItem(id))
    console.log("item id:", id)
    console.log("item", item)
    console.log("currentUser", currentUser)

    // setFormData({itemdata})
    console.log("formData",formData)

  
   
    return () => {
      dispatch(reset())
    }
  }, [currentUser, navigate, isError, message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // const formData = {
    //   name,
    //   pictures,
    //   price,
    //   deposit,
    //   description,
    //   category,
    //   condition,
    // }
    console.log("formdata",formData)
    dispatch(updateItem(id, formData))
    navigate('/account')
  }


  return (

    <div className="editContainer">
      <div className="editHeader">
        <h2>Edit Item</h2>
      </div>
      {item ? (
      <div className="itemCard">
      <form className="lendPostForm" onSubmit={onSubmit}>
            <div className="lendItem">
              <div className="itemRow">
                <label htmlFor="name">Item:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  placeholder={item.name}
                  onChange={onChange}
                ></input>
              </div>

              <div className="itemRow">
                <label>Item Description:</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  placeholder={item.description}
                  onChange={onChange}
                ></input>
              </div>
              <div className="itemRow">
                <label>Pictures</label>
                <input
                  type="text"
                  name="pictures"
                  id="pictures"
                  value={pictures}
                  placeholder={item.pictures}
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
                  placeholder={item.category}
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
                    placeholder={item.deposit}
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
                    placeholder={item.price}
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
                    placeholder={item.condition}
                    onChange={onChange}
                    ></input>
                </div>
        
              <div className="itemRowPost">
                <button type="submit" className="postBtn">
                  Save Item
                </button>
              </div>
            </div>
          </form>

      </div>
          ) : (<h3>Item Not Found</h3>)}




    </div>
  )
}

// function mapStateToProps(state, ownProps) {
//   return {
//     item: state.item[ownProps.id]
//   }
// }


// const mapStateToProps = () => {


//   const item = getItem();
//   return (state, props) => {
//     return {
//       item: item(state, props.match.params.id)
//     }
//   }
// }

export default EditItem