import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../features/items/itemSlice';
import { FiArrowLeft } from 'react-icons/fi';
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
          <FiArrowLeft size={25} />
          <h2>Back to Available Items</h2>
        </a>
      </div>
      {item ? (
        <div className="detailCard">
          <div className="pics">
            <img src={item.image} alt=""></img>
          </div>

          <div className="itemDetails">
            <div className="mainDetails">
              <h3 id="itemName">{item.name}</h3>
              <h4 id="itemPrice">Price: {item.price}</h4>
              <p>
                <strong>Deposit:</strong> {item.deposit}
              </p>
              <p>
                <strong>Condition: </strong>
                {item.condition}
              </p>
              <p>
                <strong>Category: </strong>
                {item.category}
              </p>
              <p id="description">
                <strong>Description:</strong>
              </p>
              <p id="itemDescription">{item.description}</p>

              <a
                id="contactUser"
                href={`mailto:${item.owner.email}?subject=Lenda Borrow Request`}
              >
                Contact Lender
              </a>
            </div>
            <div className="lenderDetails">
              <div className="lenderPic">
                <img
                  src="https://truckeetrails.org/wp-content/uploads/2022/04/025baa5b2cd7e46b6b4730247f6663ed.png"
                  alt="lenderPic"
                />
              </div>
              <h4 id="lenderName">
                Lender: {item.owner.first} {item.owner.last}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3>Item not found</h3>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
