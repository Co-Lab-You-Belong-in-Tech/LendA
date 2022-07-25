import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BarLoader from 'react-spinners/ClipLoader';
import { getCurrentUser } from '../features/auth/authSlice';
import '../styles/UserDash.css';

function UserDash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCurrentUser());
  }, [isError, message, dispatch, navigate]);

  if (isLoading) {
    return <BarLoader />;
  }

  return (
    <div className="dashContainer">
      <div>
        <div className="myItemsHeader">
          <button type="button" id="lending">
            Items I'm Lending
          </button>
        </div>

        {currentUser.items ? (
          <div className="activeList">
            {currentUser.items.map((item, index) => (
              <div className="itemCard" key={index}>
                <h4>{item.name}</h4>
                <img src={item.image} alt="" />
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/edititem/${item._id}`, { replace: true });
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h3>No items</h3>
        )}
      </div>
    </div>
  );
}

export default UserDash;
