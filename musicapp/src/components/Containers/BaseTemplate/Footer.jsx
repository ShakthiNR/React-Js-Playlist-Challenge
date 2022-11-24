import React from "react";
import FStyles from "./css/Footer.module.css";
const Footer = () => {
  const { footerStyle } = FStyles;
  return (
    <React.Fragment>
      <div className={footerStyle}>&copy; Shakthi N R 2022</div>
    </React.Fragment>
  );
};

export default Footer;
