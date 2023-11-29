import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import AdminDashboard from "./AdminDashboard"
import Login from "./Login"
import Register from "./Register"
import Footer from "./Footer"
import Header from './Header';
import CertSearch from "./CertSearch"
import AllProfiles from './AllProfiles'
import EditProfile from './EditProfile'

// import { Notifications } from 'react-push-notification';
import AddProfile from './AddProfile'



function App() {
  return (
    <div className="App">
        <Header/>

        <Routes>
        <Route exact path="/" element={<CertSearch/>}/>
        // <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/add-profile" element={<AddProfile/>}/>
        <Route path="/all-profiles"element={<AllProfiles/>}/>
        <Route path="/edit-profile/:id" element={<EditProfile/>}/>

        </Routes>

        <Footer/>
    </div>
  );
}

export default App;
