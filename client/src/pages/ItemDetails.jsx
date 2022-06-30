import React from 'react'
import '../styles/ItemDetails.css';

function ItemDetails() {
  return (
    // Item Detail Card
    <div className="deetsContainer">
      <div className="deetsCard">
        <div className="itemPics">
          <div className="mainPic">
            <img src="https://www.clipartmax.com/png/small/5-53879_free-clipart-of-a-step-ladder-ladder-clipart.png" alt="cartoon style drawing of a ladder" />
            <i className="fa-solid fa-angle-right"></i>
          </div>
          <div className="otherPics">
            <div className="otherPic"></div>
            <div className="otherPic"></div>
            <div className="otherPic"></div>
          </div>
        </div>
      
      <div className="itemDetails">
        <div className="mainDetails">
          <h2>LADDER</h2>
          <p>This is a great ladder. It will support your weight while making you taller. Nice & sturdy.</p>
          <p>Rate/day</p>
          <p><strong>Available:</strong> Anytime</p>
          <div className="lenderDeets">
            <h5>Lender</h5>
            <p>{"(14)"}</p>
            <div className="rating">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <button className="borrowBtn">Borrow It!</button>
        </div>
      </div>
      </div>
      {/* End Detail Card */}

      {/* Related Items */}
      <div className="relatedHeader">
        <h2>RELATED ITEMS</h2>
      </div>
      <div className="relatedItems">
        <div className="relItemCard">

        </div>
        <div className="relItemCard"></div>
        <div className="relItemCard"></div>
          
      </div>

      {/* Other Items by Lender */}
      <div className="otherItemsHeader">
        <h2>OTHER ITEMS BY LENDER</h2>
        <div className="otherItems">
          <div className="otherItemCard"></div>
          <div className="otherItemCard"></div>
          <div className="otherItemCard"></div>
        </div>
       
      </div>
    </div>
  )
}

export default ItemDetails