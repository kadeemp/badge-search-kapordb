

import React from "react";
import styles from './App.css';
import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <div>
      <div>

      <div style={{ float:'left', display: 'flex', padding:20}}>
            <a  href="https://www.kaporcenter.org/" style={{padding:20,color:"#4D4D4D", textDecoration:"none"}}>Kapor Center</a>
            <Link to="/login"  style={{padding:20, color:"#4D4D4D", textDecoration:"none"}} >Login</Link>
            <Link to="/admin-dashboard" style={{padding:20,color:"#4D4D4D", textDecoration:"none"}}> Admin Dashboard </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
