

import React from "react";
import styles from './App.css';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ backgroundColor: '#0F2A8E' }}>
      <div>
        <a href="https://www.kaporcenter.org/kapor-foundation/">
          <img
            alt="Kapor Center"
            style={{ width: 200, height: 50, padding: 20, marginLeft: 40 }}
            className={styles.kaporCenterBannerLogo}
            src="https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/assets%2FKaporFoundation-Brandmark-White.png?alt=media&token=eb2aa460-e558-4c7a-a6fe-1720ee9f7e34"
          />
        </a>
        <div style={{ float: 'right', display: 'flex', padding: 20, fontFamily: 'Proxima Nova, sans-serif' }}>
          <Link to="/" style={{ padding: 20, color: "#FFFFFF", textDecoration: "none", fontWeight: 'bold' }}>
            Home
          </Link>
          <a href="https://www.deibforstartups.com/" style={{ padding: 20, color: "#FFFFFF", textDecoration: "none", fontWeight: 'bold' }}>
            DEIB for Startups
          </a>
          <a href="https://diversityadvocates.com/" style={{ padding: 20, color: "#FFFFFF", textDecoration: "none", fontWeight: 'bold' }}>
            Diversity Advocates
          </a>
        </div>


      </div>
    </div>
  );
};

export default Header;
