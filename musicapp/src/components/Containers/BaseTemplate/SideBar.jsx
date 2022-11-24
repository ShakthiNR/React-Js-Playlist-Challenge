import React, { useState } from "react";
import useWindowDimensions from "./GetWidithHook";
import styles from "./css/Sidebar.module.css";
import { NavLink, Link } from "react-router-dom";
import { useEffect } from "react";
import { getPlayList } from "../../Helpers/playlistApiCall";
import { useSelector } from "react-redux";
import {SiYoutubemusic} from "react-icons/si"

const SideBar = ({ hideSide, setHideSide, showMobNav, setShowMobNav }) => {
  const { background, title, link, mainTitle, myplaylists, singleplaylist } =
    styles;
  const trigger = useSelector((state) => state.trigger.value.hidden);
  const [playL, setPlayL] = useState([]);
  const { width } = useWindowDimensions();
  const [error,setError] = useState("")

  const fetchData = async () => {
    const resData = await getPlayList();
    if (resData.status === 200) {
      setPlayL(resData.data);
    } else {
      setError(resData.message);
    }
    
  };

  useEffect(() => {
    fetchData();
  }, [trigger]);

  useEffect(() => {
    if (width <= 600) {
      setHideSide(true);
    } else {
      setHideSide(false);
    }
  });

  return (
    <React.Fragment>
      {!hideSide ? (
        <div className={background}>
          <Link to="/">
            <h1 className={mainTitle}>
              <span className={title}>Music App</span>
            </h1>
          </Link>
          <br/>

          <Link to="/" replace={true}>
            <div className={link}> Library </div>
          </Link>

          <Link to="/create/playlist" replace={true}>
            <div className={link}> Create Playlist </div>
          </Link>
          <center style={{color:"red"}}>  {error && error } </center>

         { !error && <DisplayPlaylist
            playlist={playL}
            myplaylist={myplaylists}
            singleplaylist={singleplaylist}
          />}
        </div>
      ) : (
        <MobileNav showMobNav={showMobNav} playL={playL} error={error}/>
      )}
    </React.Fragment>
  );
};

export default SideBar;

const DisplayPlaylist = ({ playlist, myplaylist, singleplaylist }) => {
  let activeStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const {myplaylistsHead} = styles

  return (
    <>
      <div className={myplaylist}>
        <center
          className={myplaylistsHead}
        >
          My Playlists
        </center>
        {playlist.length > 0 && (
          <>
            {playlist.map((pname, i) => {
              const { name, id } = pname;
              return (
                <NavLink
                  key={i}
                  to={`/my-playlist/${id}`}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <div className={singleplaylist} key={i}>
                    {name}
                  </div>
                </NavLink>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};


const MobileNav = ({ showMobNav, playL,error }) => {
  const { background, title, link, mainTitle, myplaylists, singleplaylist,logo } =
    styles;
  return (
    <div>
      {showMobNav && (
        <div >
          <div className={background} >
            <Link to="/">
              
                <center>
                <SiYoutubemusic className={logo}/>
                </center> 
             
            </Link>
            <br/>

            <Link to="/" replace={true}>
              <div className={link}> Library </div>
            </Link>

            <Link to="/create/playlist" replace={true}>
              <div className={link}> Create Playlist </div>
            </Link>
            <center style={{color:"red"}}>  {error && error } </center>

           { !error && <DisplayPlaylist
              playlist={playL}
              myplaylist={myplaylists}
              singleplaylist={singleplaylist}
            />}
          </div>
        </div>
      )}
    </div>
  );
};
