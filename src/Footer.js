

import React from "react";
import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <div style={{ backgroundColor: '#0F2A8E'}}>
      <div>

        <div style={{ display: 'flex', padding: 20 }}>
          <a href="https://www.kaporcenter.org/" style={{ padding: 20, color: "#FFFFFF", textDecoration: "none" }}>Kapor Center</a>
          <Link to="/login" style={{ padding: 20, color: "#FFFFFF", textDecoration: "none" }} >Login</Link>
          <Link to="/admin-dashboard" style={{ padding: 20, color: "#FFFFFF", textDecoration: "none" }}> Admin Dashboard </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
