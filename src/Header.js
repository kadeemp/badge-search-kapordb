

import React from "react";
import styles from './App.css';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>
        <Link to="/">
          <img
            alt=""
            style={{ width: 300, height: 90, padding: 20 }}
            className={styles.kaporCenterBannerLogo}
            src="https://www.kaporcenter.org/wp-content/themes/kapor-center/theme/images/svgs/header-logo.svg"
          />
        </Link>

        <div style={{ float: 'right', display: 'flex', padding: 20 }}>
          <a href="https://www.kapordeibcertificate.com/" style={{ padding: 20, color: "#4D4D4D", textDecoration: "none" }} >DEIB Certificate Program</a>
          <a href="https://www.kaporcenter.org/" style={{ padding: 20, color: "#4D4D4D", textDecoration: "none" }}>Kapor Center</a>
          <Link to="/search" style={{ textDecoration: "none" }}>
            <img style={{ height: 20, width: 20, marginTop: "20px", marginLeft: "10px" }} alt="" src="https://static.overlay-tech.com/assets/d5810a98-a83d-4625-a3dc-690a550bb1d0.png" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
