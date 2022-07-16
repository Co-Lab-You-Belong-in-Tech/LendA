
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../features/items/itemSlice';
import '../styles/Home.css';
import logoa from '../lenda-logoa.png';


function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [searchTerm, setSearchTerm] = useState("")

  const { currentUser } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  )


  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getItems());
  }, [isError, message, dispatch]);

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src={logoa} alt="logo" />
        </div>
        <h4>LendA is your local lending platform</h4>
      </div>
      {/* search bar start */}
      <div className="search">
        <input
          type="text"
          className="searchField"
          placeholder="What do you need to borrow?"

          onChange={e => {setSearchTerm(e.target.value)}}
        ></input>

        <button type="submit" className="searchButton">
          <i className="fa fa-search fa-xl" />
        </button>
      </div>
      {/* search bar end */}

      {/* items available start */}
      <div className="availItemsHeader">
        <h2>Items ready to be borrowed</h2>
      </div>
      {items ? (
        <div className="itemsAvailable">
          {items &&
            items.filter((item) => {
              if (searchTerm === "") {
                return item
              } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return item
              }
            }).map((item, index) => (
              <div
                className="availItemCard"
                key={index}
                id={item._id}
                onClick={() => {
                  navigate(`/itemdetails/${item._id}`, { replace: true });
                }}
              >
                <div className="availItemPic">
                  {item.images ? (
                    <img src={item.images[0]}></img>
                  ) : (<img
                    src="https://via.placeholder.com/150"
                    alt="random placeholder"
                  ></img>)}
                  

                </div>
                <div className="itemCardDetails">
                  <div className="itemCardRowOne">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="itemCardRowTwo">Location</div>
                  <div className="itemCardRowThree">
                    <p>{item.description}</p>
                  </div>
                  <div className="itemCardRowFour">{item.price}</div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <h3>No items available</h3>
      )}

      {/* items available end */}
    </div>
  );
}

export default Home;
