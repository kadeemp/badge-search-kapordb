import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
// import AdminDashboard from "./AdminDashboard"
// import Login from "./Login"
// import Register from "./Register"
import Footer from "./Footer"
import Header from './Header';
import Header2 from './Header2';



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
