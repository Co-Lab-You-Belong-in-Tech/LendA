import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getItems, reset } from "../features/items/itemSlice"
import BarLoader from "react-spinners/ClipLoader"
import ItemCards from "../components/ItemCards"
import "../styles/UserDash.css"

function UserDash() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [itemList, setItemList] = useState([])

  const { currentUser } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!currentUser) {
      navigate("/login")
    }

    dispatch(getItems())
    // console.log("items:", items.data.items)
    // console.log(items.data.items.length)
    // console.log(user.data.user.id)

    // console.log(items.data.items.user)

    let itemArray = items.data.items
    // let itemArrayTwo = items.data

    let userId = currentUser.id

    // if (itemArray === 'undefined') {
    //   let itemArray
    // }

    const itemList = itemArray.filter(function (itemUser) {
      if (itemArray[0].currentUser === userId) {
        return true
      }
    })

    setItemList(itemList)

    const users = []
    itemArray.forEach(function (obj) {
      users.push(obj.currentUser)
    })

    console.log("itemArray", itemArray)
    console.log(itemArray.currentUser)
    console.log("users", users)

    console.log("new itemList", itemList)
    console.log("current user", userId)

    return () => {
      dispatch(reset())
    }
  }, [currentUser, navigate, isError, message, dispatch, items])

  if (isLoading) {
    return <BarLoader />
  }

  return (
    <>
      <div className="dashContainer">
        <div>
          {items.data ? (
            <div>
              {items &&
                itemList.map((item, index) => (
                  <div key={index}>{item.name}</div>
                ))}
            </div>
          ) : (
            <h3>No items</h3>
          )}
        </div>
      </div>
    </>
  )
}

export default UserDash
