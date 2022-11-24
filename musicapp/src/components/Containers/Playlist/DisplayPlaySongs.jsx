import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../Backend";
import { triggerFn } from "../../../Features/Trigger";
import {
  deletePlaylist,
  getUniquePlayList,
} from "../../Helpers/playlistApiCall";

import dpsstyles from "./css/DisplayPlaySongs.module.css";

const DisplayPlaySongs = () => {
  const { id } = useParams();
  const [singlePlaylist, setSinglePlaylist] = useState([]);
  const [error, setError] = useState("");

  const fetchPlayList = async () => {
    const resData = await getUniquePlayList(id);
    if (resData.status === 200) {
      setSinglePlaylist(resData.data);
    } else {
      setError(resData.message);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure to delete this playlist ?")) {
      const resData = await deletePlaylist(id);
      if(resData.status ===200){
      alert("Playlist Deleted :) ");
      navigate("/");
      dispatch(triggerFn());
      }else{
        alert(`Error in server: ${resData.message}`)
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchPlayList();
  }, [id]);

  const { name, songs } = singlePlaylist;

  return (
    <React.Fragment>
      <center style={{ color: "red" }}> {error && error} </center>

      {!error && (
        <button className={dpsstyles.delbtn} onClick={() => handleDelete(id)}>
          Delete Playlist
        </button>
      )}

      {!error && singlePlaylist && <SubComponent name={name} songs={songs} />}
    </React.Fragment>
  );
};

export default DisplayPlaySongs;

const SubComponent = ({ name, songs }) => {
  const [sname, setSname] = useState([]);
  const [subError, setSubError] = useState("");

  const fetchPlayListSongs = async () => {
    if (songs && songs.length > 0) {
      const songsName = await Promise.all(
        songs.map(async (song) => {
          const res = await fetch(`${API}/library/${song}`);
          if (res.status === 200) {
            return await res.json();
          } else {
            setSubError(` Error - ${res.statusText}`);
            return;
          }
        })
      );
      setSname(songsName);
    } else {
      setSname("");
    }
  };

  useEffect(() => {
    fetchPlayListSongs();
  }, [songs]);

  return (
    <div>
      <center style={{ color: "red" }}> {subError && subError} </center>

      {!subError && (
        <center className={dpsstyles.content}>
          Playlist Name: <strong> {name}</strong> <br />
          Songs Count in PlayList : <strong> {sname.length} </strong>
        </center>
      )}

      <br />

    

      {!subError &&
        (sname ? (
          sname.length > 0 && (
            <div style={{ overflowX: "auto", height: "50vh" }}>
              <table border={1}>
                <thead>
                  <tr>
                    <th>Album</th>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Artist</th>
                  </tr>
                </thead>
                <tbody>
                  {sname.map((el, i) => {
                    const { album, title, duration, artist } = el;
                    return (
                      <tr key={i}>
                        <td>{album}</td>
                        <td>{title}</td>
                        <td>{duration}</td>
                        <td>{artist}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <center>Empty Playlists</center>
        ))}
    </div>
  );
};
