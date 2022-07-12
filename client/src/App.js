import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import '../src/styles/NavBar.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import LenderProfile from './pages/LenderProfile';
import Login from './pages/Login';
import NewPost from './pages/NewPost';
import UserDash from './pages/UserDash';
import SignUp from './pages/SignUp';
import SearchResults from './pages/SearchResults';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
    <Router>
      <ScrollToTop>
    <div className="container">
      <NavBar />
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route exact path="/items" element={ <SearchResults />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <SignUp /> } />
        <Route exact path="/itemdetails/:itemId" element={ <ItemDetails /> } />
        <Route path="/profile" element={ <LenderProfile /> } />
        <Route exact path="/newpost" element={ <NewPost /> }/>
        <Route path="/account" element={ <UserDash /> } />

      </Routes>
    </div>
    </ScrollToTop>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
