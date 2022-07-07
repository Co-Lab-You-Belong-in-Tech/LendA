import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, reset } from '../features/items/itemSlice';
import BarLoader from 'react-spinners/ClipLoader';
import ItemCards from '../components/ItemCards';
import '../styles/UserDash.css'

function UserDash() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector((state) => state.items)

  // const mapStateToProps = state => {
  //   return {
  //     name: getItemName(state),
  //     id: getItemId(state),
  //     user: getItemUser(state)
  //   };
  // };

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getItems())
    console.log("items:", items)
    console.log(items.length)

    return () => {
      dispatch(reset())
    }
  
  }, [user, navigate, isError, message, dispatch])

// const [appState, changeState] = useState({
//   activeObject: null,
//   objects: [{ id: 1, button: "LENDING" }, { id: 2, button: "BORROWING" }, { id: 3, button: "HISTORY" }, { id: 4, button: "SAVED ITEMS" }]
// });

// const toggleActive = (index) => {
//   changeState({ ...appState, activeObject: appState.objects[index]});
// }

// const toggleActiveStyles = (index) => {
//   if (appState.objects[index] === appState.activeObject) {
//     return "activeCards"
//   } else {
//     return "inactiveCards"
//   }
// }

if (isLoading) {
  return <BarLoader />
}

  return (<>
    <div className="dashContainer">
      {/* <div className="dashNav">
        <ul>
          {appState.objects.map((elements, index) => (
            <li key={index} className={toggleActiveStyles(index)} onClick={() => {toggleActive(index)}}><button>{elements.button}</button></li>
          ))}
          
        </ul>
      </div> */}
      <div className="myItemsHeader">
        <h2>My Active Items</h2>
      </div>
      {items.data ? ( <div>
        {items && items.data.items.map((item, index)=> (
          <ItemCards key={item._id} item={item}/>
        )
        )}

      </div>
      
       ) : (<h3>No active items</h3>)}

        {/* <div className="activeList">
          <ItemCards />
    
      </div> */}
      

      {/* // ) : (<h3>You do not have any active items</h3>)}   */}
          
        
      


    </div>
    </>
  )
}

export default UserDash