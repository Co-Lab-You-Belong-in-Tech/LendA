import React from 'react';
import '../styles/Home.css';
import logo from '../lenda.png'
import logoa from '../lenda-logoa.png'; 

function Home() {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src={logo}></img>
        </div>
        <h4>LendA is your local lending platform</h4>
      </div>
      {/* search bar start */}
      <div className="search">
        <input
          value=""
          type="text"
          className="searchField"
          placeholder="What do you need to borrow?"
        >
        </input>
        <button type="submit" className="searchButton">
          <i className="fa fa-search fa-xl"></i>
        </button>
      </div>
      {/* search bar end */}
      {/* successful lend cards start */}
      <div className="sLendsHeader">
        <h2>Successful Lends</h2>
      </div>

      <div className="successfulLends">
        <div className="sLendCard">
            <div className="itemPic">
              <img src="https://picsum.photos/90/90" alt="random placeholder"></img>
            </div>
            <div className="sLendDetails">
              <p><strong>Nirmal super thanks Henry</strong></p>
              <p>for lending a</p>
              <p><strong>Laptop</strong></p>
              <div className="timeLocation">
              <p>10 minutes ago</p> <p>Seattle, WA</p>
              </div>
            </div>
          </div>

          <div className="sLendCard">
           
          </div>

          <div className="sLendCard">
           
          </div>

          <div className="sLendCard">
         
          </div>
      </div>
      {/* successful lends cards end */}

      {/* items available start */}
      <div className="availItemsHeader">
        <h2>Available Items to Borrow</h2>
      </div>
      <div className="itemsAvailable">
        <div className="availItemCard">
          <div className="availItemPic">
            <img src="https://www.clipartmax.com/png/small/5-53879_free-clipart-of-a-step-ladder-ladder-clipart.png" alt="cartoon style drawing of a ladder"></img>
          </div>
          <div className="itemCardDetails">
            <div className="itemCardRowOne">
              <h3>Item</h3>
              <p>Rate/hr</p>
            </div>
            <div className="itemCardRowTwo">
              Category
            </div>
            <div className="itemCardRowThree">
              <p>Lender</p>
              <div className="rating">
                Rating
              </div>
            </div>
          </div>
        </div>

        <div className="availItemCard">
          <div className="availItemPic">
            <img src="https://freesvg.org/img/johnny_automatic_ladder_2.png" alt="placeholder"></img>
          </div>
          <div className="itemCardDetails">
            <div className="itemCardRowOne">
              <h3>Item</h3>
              <p>Rate/hr</p>
            </div>
            <div className="itemCardRowTwo">
              Category
            </div>
            <div className="itemCardRowThree">
              <p>Lender</p>
              <div className="rating">
                Rating
              </div>
            </div>
          </div>
        </div>

        <div className="availItemCard">
          <div className="availItemPic">
            <img src="https://freesvg.org/img/johnny_automatic_ladder_2.png" alt="placeholder"></img>
          </div>
          <div className="itemCardDetails">
            <div className="itemCardRowOne">
              <h3>Item</h3>
              <p>Rate/hr</p>
            </div>
            <div className="itemCardRowTwo">
              Category
            </div>
            <div className="itemCardRowThree">
              <p>Lender</p>
              <div className="rating">
                Rating
              </div>
            </div>
          </div>
        </div>

        <div className="availItemCard">
          <div className="availItemPic">
            <img src="https://freesvg.org/img/johnny_automatic_ladder_2.png" alt="placeholder"></img>
          </div>
          <div className="itemCardDetails">
            <div className="itemCardRowOne">
              <h3>Item</h3>
              <p>Rate/hr</p>
            </div>
            <div className="itemCardRowTwo">
              Category
            </div>
            <div className="itemCardRowThree">
              <p>Lender</p>
              <div className="rating">
                Rating
              </div>
            </div>
          </div>
        </div>

        <div className="availItemCard">
          <div className="availItemPic">
            <img src="https://freesvg.org/img/johnny_automatic_ladder_2.png" alt="placeholder"></img>
          </div>
          <div className="itemCardDetails">
            <div className="itemCardRowOne">
              <h3>Item</h3>
              <p>Rate/hr</p>
            </div>
            <div className="itemCardRowTwo">
              Category
            </div>
            <div className="itemCardRowThree">
              <p>Lender</p>
              <div className="rating">
                Rating
              </div>
            </div>
          </div>
        </div>

        <div className="availItemCard">
          <div className="availItemPic">
            <img src="https://freesvg.org/img/johnny_automatic_ladder_2.png" alt="placeholder"></img>
          </div>
          <div className="itemCardDetails">
            <div className="itemCardRowOne">
              <h3>Item</h3>
              <p>Rate/hr</p>
            </div>
            <div className="itemCardRowTwo">
              Category
            </div>
            <div className="itemCardRowThree">
              <p>Lender</p>
              <div className="rating">
                Rating
              </div>
            </div>
          </div>
        </div>

        <div className="availItemCard">
          <div className="availItemPic">
            <img src="https://freesvg.org/img/johnny_automatic_ladder_2.png" alt="placeholder"></img>
          </div>
          <div className="itemCardDetails">
            <div className="itemCardRowOne">
              <h3>Item</h3>
              <p>Rate/hr</p>
            </div>
            <div className="itemCardRowTwo">
              Category
            </div>
            <div className="itemCardRowThree">
              <p>Lender</p>
              <div className="rating">
                Rating
              </div>
            </div>
          </div>
        </div>

        <div className="availItemCard">
          <div className="availItemPic">
            <img src="https://freesvg.org/img/johnny_automatic_ladder_2.png" alt="placeholder"></img>
          </div>
          <div className="itemCardDetails">
            <div className="itemCardRowOne">
              <h3>Item</h3>
              <p>Rate/hr</p>
            </div>
            <div className="itemCardRowTwo">
              Category
            </div>
            <div className="itemCardRowThree">
              <p>Lender</p>
              <div className="rating">
                Rating
              </div>
            </div>
          </div>
        </div>


      </div>
      {/* items available end */}


      </div>
  )
}

export default Home