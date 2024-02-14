import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import AdminDashboard from "./AdminDashboard"
import Login from "./Login"
import Register from "./Register"
import Footer from "./Footer"
import Header from './Header';
import AllProfiles from './AllProfiles'
import EditProfile from './EditProfile'
import SearchProfiles from './SearchProfiles'
// import { Notifications } from 'react-push-notification';
import AddProfile from './AddProfile'
import AddSampleProfile from './AddSampleProfile'
import Profile from './Profile'
import PasswordRequest from './PasswordRequest'


function App() {
  return (
    <div className="App">
        <Header/>

                <Routes>

                        <Route exact path="/" element={<SearchProfiles/>}/>
                        // <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/add-profile" element={<AddProfile/>}/>
                        <Route path="/add-SampleProfile" element={<AddProfile/>}/>
                        <Route path="/all-profiles"element={<AllProfiles/>}/>
                        <Route path="/edit-profile/:id" element={<EditProfile/>}/>
                        <Route path="/profile/:id" element={<Profile/>}/>
                        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                        <Route path="/request-password" element={<PasswordRequest/>}/>

                </Routes>

        <Footer/>
    </div>
  );
}

export default App;
