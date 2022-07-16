import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../features/items/itemSlice';
import '../styles/ItemDetails.css';

function ItemDetails() {
  const params = useParams();
  const id = params.itemId;

  const dispatch = useDispatch();

  const { items, isError, message } = useSelector((state) => state.items);
  const item = items.find((object) => object._id === id);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getItem(id));
  }, [isError, message, id, dispatch]);

  return (
    // Item Detail Card
    <div className="detailContainer">
      <div className="detailHeader">
        <a href="/#">

          <i className="fa-solid fa-arrow-left fa-lg"></i>
          <h2>Back to Available Items</h2>

        </a>
      </div>
      {item ? (
        <div className="detailCard">
          <div className="pics">
            <div className="mainPic" />
          </div>

          <div className="itemDetails">
            <div className="mainDetails">
              <h3 id="itemName">{item.name}</h3>
              <h4 id="itemPrice">{item.price}</h4>
              <p>
                <strong>Condition: </strong>
                {item.condition}
              </p>
              <p>
                <strong>Category: </strong>
                {item.category}
              </p>
              <p>{item.description}</p>
              <button type="button" id="contactUser">
                Contact User
              </button>
            </div>
            <div className="lenderDetails">
              <h4 id="lenderName">Lender</h4>
              <div className="lenderInfo">
                <div className="lenderPic">
                  <img
                    src="https://truckeetrails.org/wp-content/uploads/2022/04/025baa5b2cd7e46b6b4730247f6663ed.png"
                    alt="lenderPic"
                  />
                </div>
                <div className="ratings">
                  <p id="ratingNumber">(14)</p>
                  <i className="fa-solid fa-star fa-sm" />
                </div>
              </div>
            </div>
          </div>
          </div>
            
      ) : (
        <div>
          <h3>Item not found</h3>

        </div>
      )}
      
    </div>

    )

}
  

export default ItemDetails