import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BarLoader from 'react-spinners/ClipLoader';
import { getUser } from '../features/auth/authSlice';
import '../styles/UserDash.css';
import { current } from '@reduxjs/toolkit';

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

    if (!currentUser) {
      navigate('/login');
    }

    dispatch(getUser(currentUser.id));
    
    console.log("currentUser",currentUser)
  }, [isError, message, currentUser, dispatch, navigate]);

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

        {!currentUser.items ? (
          <h3>No items</h3>
        ) : (
          <div className="activeList">
            {currentUser.items.map((item, index) => (
              <div className="itemCard" key={index}>
                <h4>{item.name}</h4>
                <img
                  src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
                  alt="random placeholder"
                />
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
        )}
      </div>
    </div>
  );
}

export default UserDash;
