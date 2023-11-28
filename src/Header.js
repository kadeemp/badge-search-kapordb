

import React from "react";
import styles from './App.css';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ backgroundColor: '#0F2A8E' }}>
      <div>
        <Link to="/">
          <img
            alt=""
            style={{ width: 200, height: 50, padding: 20 }}
            className={styles.kaporCenterBannerLogo}
            src="https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/assets%2FKCEN_Primary_One%20Color_White.png?alt=media&token=688fcce7-af88-4b3c-aadf-9d191f2535c0"
          />
        </Link>
        <div style={{ float: 'right', display: 'flex', padding: 20 }}>
          <a href="https://www.kapordeibcertificate.com/" style={{ padding: 20, color: "#FFFFFF", textDecoration: "none" }}>
            DEIB Certificate Program
          </a>
          <a href="https://www.kaporcenter.org/" style={{ padding: 20, color: "#FFFFFF", textDecoration: "none" }}>
            Kapor Center
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
