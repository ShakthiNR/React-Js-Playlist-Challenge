import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { API } from "../../../Backend";
import { triggerFn } from "../../../Features/Trigger";
import { createPlaylist } from "../../Helpers/playlistApiCall";

import DisplaySongs from "../SongsLib/DisplaySongs";
import afstyles from "./css/AddForm.module.css";



const AddForm = () => {
  const [value, setValue] = useState("");
  const [tempSongs, setTempSongs] = useState([]);
  const [songDet, setSongDet] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value === "") {
      alert("TextBox Cannot be Empty!!!");
      return;
    }
    const obj = {
      name: value,
      songs: tempSongs,
    };
    let resData = await createPlaylist(obj);
    console.log("first",obj)
    if(resData.status ===200){
    
    dispatch(triggerFn());
   
    }
    else{
      alert(`Error in server: ${resData.message}`)
    }
    setTempSongs([]);
    setSongDet([]);
    setValue("");
  };

  const fetchPlayListSongs = async () => {
    if (tempSongs.length > 0) {
      const songsName = await Promise.all(
        tempSongs.map(async (song) => {
          const res = await fetch(`${API}/library/${song}`);
          return await res.json();
        })
      );
      setSongDet(songsName);
    } else {
      setSongDet("");
    }
  };

  useEffect(() => {
    fetchPlayListSongs();
  }, [tempSongs]);

  return (
    <React.Fragment>
      <center className={afstyles.form}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the Playlists Name"
            value={value}
            className={afstyles.createInput}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />{" "}
          <br />
          <button className={afstyles.createBtn} type="submit">
            Create Playlist
          </button>
        </form>
      </center>

      <center className={afstyles.songInfo}> Selected Songs: {songDet ? songDet.length : "0"} </center>

      <SelectedSongs
        songs={songDet}
        setSong={setSongDet}
        setTempSongs={setTempSongs}
        tempSongs={tempSongs}
      />
      <div className={afstyles.display}>
        <div className={afstyles.letter}>
          <span className={afstyles.letterspan}>Songs From Library</span>
        </div>
        
        <DisplaySongs
          title={false}
          addBtn={true}
          myHeight="30vh"
          myWidth="65%"
          tempSongs={tempSongs}
          setTempSongs={setTempSongs}
        />
        </div>
     
    </React.Fragment>
  );
};

export default AddForm;

const SelectedSongs = ({ songs, setSong, setTempSongs, tempSongs }) => {
  const handleRemove = (id) => {
    const filteredSongs = songs.filter((el) => el.id !== id);
    const filteredTemp = tempSongs.filter((el) => el !== id);
    setTempSongs(filteredTemp);
    setSong(filteredSongs);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {
        <div
          className={afstyles.tempSongs}
        >
          {songs.length > 0 && (
            <>
              {songs &&
                songs.map((el, i) => {
                  const { id, title } = el;
                  return (
                    <div key={i} className={afstyles.bgcolor}>
                      {title} {"  "}
                      <button className={afstyles.deleteBtn}
                        onClick={() => {
                          handleRemove(id);
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      }
    </div>
  );
};
