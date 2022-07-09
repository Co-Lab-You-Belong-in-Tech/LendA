import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getItems, reset } from "../features/items/itemSlice"
import BarLoader from "react-spinners/ClipLoader"
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
    console.log("items",items)
    // console.log("items:", items.data.items)
    // console.log(items.data.items.length)
    // console.log(user.data.user.id)

    // console.log(items.data.items.user)

    // let itemArrayTwo = items.data

    let userId = currentUser.id

    const itemList = items.filter((userId)=> {
      if(userId === items.user) {
        return true;
      }
    })

    setItemList(itemList)

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
          {items ? (
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
