import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, reset } from '../features/items/itemSlice';
import BarLoader from 'react-spinners/ClipLoader';
import ItemCards from '../components/ItemCards';
import '../styles/UserDash.css'

function UserDash() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [itemList, setItemList] = useState([])

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
    // console.log("items:", items.data.items)
    // console.log(items.data.items.length)
    // console.log(user.data.user.id)
    
    // console.log(items.data.items.user)

  
    // let itemArray = items.data.items
    // let itemArrayTwo = items.data

    let currentUser = user.data.user.id


    // if (itemArray === 'undefined') {
    //   let itemArray 
    // }

    const itemList = items.filter(function(itemUser) {
      if(items[0].user === currentUser) {
        return true;
      }
    })

    setItemList(itemList)

    const users = [];
    items.forEach(function(obj){
      users.push(obj.user)
    })

    // console.log("itemArray",itemArray)
    // console.log(itemArray.user)
    console.log("users",users)

    console.log("new itemList",itemList)
    console.log("current user",currentUser)


    


    return () => {
      dispatch(reset())
    }
  
  }, [user, navigate, isError, message, dispatch])






if (isLoading) {
  return <BarLoader />
}

  return (<>
    <div className="dashContainer">

    <div>
    {items ? (
      <div>
      {items && itemList.map((item, index) => (
      <div key={index}>
        {item.name}

      </div>))}
    
    </div>
    ) : (<h3>No items</h3>)}

    </div>

    </div>
    </>
  )}
  

export default UserDash