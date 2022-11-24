import React, { useState } from "react";
import { HiOutlineMenuAlt1, HiX } from "react-icons/hi";
import HStyles from "./css/Header.module.css";

const Header = ({ title, hideSide, setShowMobNav, showMobNav }) => {
  const [state, setState] = useState({ hour: null });
  const { head, menuFlex } = HStyles;
  const getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    setState({ hour });
  };
  const handleShowMobileNav = () => {
    setShowMobNav(true);
  };
  const handleHideMobileNav = () => {
    setShowMobNav(false);
  };
  useState(() => {
    getHour();
  }, []);
  const { hour } = state;
  return (
    <React.Fragment>
      {!hideSide ? (
        title && (
          <div className={head}>
            <center>{hour < 12 ? "Good Morning" : "Good evening"} User</center>
          </div>
        )
      ) : (
        <div className={head}>
          <div className={menuFlex}>
            <div style={{ color: "black", cursor: "pointer" }}>
              {showMobNav ? (
                <HiX onClick={handleHideMobileNav} />
              ) : (
                <HiOutlineMenuAlt1 onClick={handleShowMobileNav} />
              )}
            </div>
            <div>Music Application</div>
            <div></div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
