import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getItems, reset } from "../features/items/itemSlice"
import { getUser } from "../features/auth/authSlice"
import BarLoader from "react-spinners/ClipLoader"
import "../styles/UserDash.css"

function UserDash() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


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
    console.log("user",currentUser)
    console.log("user items",currentUser.items)
    // console.log(items.data.items.length)
  

    return () => {
      dispatch(reset())
    }

  }, [currentUser, navigate, isError, message, dispatch])


  if (isLoading) {
    return <BarLoader />
  }

  return (
    <>
      <div className="dashContainer">
        <div>
          <div className="myItemsHeader">
            <button id="lending">Items I'm Lending</button>
          </div>

          {items ? (
            <div className="activeList">
              {items &&
                items.map((item, index) => (
                  <div className="itemCard" key={index}>
                    <h4>{item.name}</h4>
                    <img src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
                    alt="random placeholder"></img>
                    <button onClick={() => {navigate(`/edititem/${item._id}`, {replace: true })}}>Edit</button>
                  </div>
                ))}
            </div>
          ) : (
            <h3>No items</h3>
          )}
        </div>
        
        <div className="borrowing">
          <div className="borrowingHeader">
            <button id="borrowing">Items I'm Borrowing</button>
          </div>
        </div>

        <div className="acctSettings">
          <div className="acctSettingsHeader">
          <button id="settings">My Account Settings</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default UserDash
