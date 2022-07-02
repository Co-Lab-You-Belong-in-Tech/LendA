import React from 'react'
import { useState } from 'react'
import '../styles/UserDash.css'

function UserDash() {

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

  return (
    <div className="dashContainer">
      <div className="dashNav">
        <ul>
          {appState.objects.map((elements, index) => (
            <li key={index} className={toggleActiveStyles(index)} onClick={() => {toggleActive(index)}}><button>{elements.button}</button></li>
          ))}
          
        </ul>
      </div>
      
      <div className="activeList">
        <div className="itemCard"></div>
      </div>


    </div>
  )
}

export default UserDash