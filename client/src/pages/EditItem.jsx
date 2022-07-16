import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItem, updateItem } from '../features/items/itemSlice';
import '../styles/EditItem.css';

function EditItem() {
  const params = useParams();
  const id = params.itemId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    deposit: '',
    description: '',
    category: '',
    condition: '',
    availability: true,
  });

  const { items, isError, message } = useSelector((state) => state.items);
  const item = items.find((object) => object._id === id);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (item) {
      setFormData({
        name: item.name,
        price: item.price,
        deposit: item.deposit,
        description: item.description,
        category: item.category,
        condition: item.condition,
        availability: item.availability,
      });
    }
  }, [isError, message, item]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem({ id: item._id, itemData: formData }));
    navigate('/account');
  };

  return (
    <div className="editContainer">
      <div className="editHeader">
        <h2>Edit Item</h2>
      </div>
      {item ? (
        <div className="editItemCard">
          <form className="lendPostForm" onSubmit={onSubmit}>
            <div className="lendItem">
              <div className="itemRow">
                <label>Item:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder={item.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="itemRow">
                <label>Item Description:</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder={item.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              {/* <div className="itemRow">
                <label>Pictures</label>
                <input
                  type="text"
                  name="pictures"
                  id="pictures"
                  value={formData.pictures}
                  placeholder={item.pictures}
                  onChange={onChange}
                />
              </div> */}
              <div className="itemRow">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  placeholder={item.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>

              <div className="itemRow">
                <label>Deposit</label>
                <input
                  type="text"
                  name="deposit"
                  id="deposit"
                  value={formData.deposit}
                  placeholder={item.deposit}
                  onChange={(e) =>
                    setFormData({ ...formData, deposit: e.target.value })
                  }
                />
              </div>
              <div className="itemRow">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={formData.price}
                  placeholder={item.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="itemRow">
                <label>Condition</label>
                <input
                  type="text"
                  name="condition"
                  id="condition"
                  value={formData.condition}
                  placeholder={item.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                />
              </div>

              <div className="itemRowPost">
                <button type="submit" className="postBtn">
                  Save Item
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <h3>Item Not Found</h3>
      )}
    </div>
  );
}

export default EditItem;
