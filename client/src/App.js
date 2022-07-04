import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import '../src/styles/NavBarNew.css';
import NavBar from './components/NavBar';
import NavBarNew from './components/NavBarNew';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import LenderProfile from './pages/LenderProfile';
import Login from './pages/Login';
import NewPost from './pages/NewPost';
import UserDash from './pages/UserDash';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
    <Router>
    <div className="container">
      <NavBarNew />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <SignUp /> } />
        <Route path="/itemdetails" element={ <ItemDetails /> } />
        <Route path="/profile" element={ <LenderProfile /> } />
        <Route path="/newpost" element={ <NewPost /> } />
        <Route path="/account" element={ <UserDash /> } />

      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
