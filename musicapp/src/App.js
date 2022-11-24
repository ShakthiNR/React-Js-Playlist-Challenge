import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import astyles from "./App.module.css";
import Footer from "./components/Containers/BaseTemplate/Footer";
import SideBar from "./components/Containers/BaseTemplate/SideBar";
import DisplaySongs from "./components/Containers/SongsLib/DisplaySongs";
import CreatePlayList from "./components/Containers/Playlist/CreatePlayList";
import DisplayPlaySongs from "./components/Containers/Playlist/DisplayPlaySongs";
import Header from "./components/Containers/BaseTemplate/Header";

const App = () => {
  const [hideSide, setHideSide] = useState(false);
  const [showMobNav, setShowMobNav] = useState(false);

  return (
    <React.Fragment>
      <div className={astyles.parent}>
        <div className={astyles.sidebar}>
          <SideBar
            hideSide={hideSide}
            setHideSide={setHideSide}
            showMobNav={showMobNav}
            setShowMobNav={setShowMobNav}
          />
        </div>
        <div className={astyles.routerParent} >
          <div className={astyles.header}>
            {" "}
            <Header
              hideSide={hideSide}
              setHideSide={setHideSide}
              title={true}
              showMobNav={showMobNav}
              setShowMobNav={setShowMobNav}
            />{" "}
          </div>
          <div className={astyles.router}>
            <Routes>
              <Route
                path="/"
                element={
                  <DisplaySongs addBtn={false} title={true}  myWidth="100%" myHeight="75vh" />
                }
              />
              <Route path="/create/playlist" element={<CreatePlayList />} />
              <Route path={`/my-playlist/:id`} element={<DisplayPlaySongs />} />
            </Routes>
          </div>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
