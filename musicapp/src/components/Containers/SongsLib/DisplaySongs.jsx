import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSongsLib } from "../../../Features/Songs";
import DStyles from "./DisplaySongs.module.css";
import { getSongs } from "../../Helpers/getSongs";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

const DisplaySongs = ({
  title,
  addBtn,
  myHeight,
  myWidth,
  tempSongs,
  setTempSongs,
}) => {
  const songs = useSelector((state) => state.songs);
  const [error,setError] = useState("")
  const dispatch = useDispatch();

  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );
  const getItemList = async () => {
   
      const resData = await getSongs();

      if(resData.status ===200){
        dispatch(addSongsLib(resData.data));
      }else{
        setError(resData.message)
      }


    
  };

  useEffect(() => {
    getItemList();
  }, []);

  const handleAddSongs = (id) => {
    if (tempSongs.includes(id)) {
      alert(`The Song already exists!!!`);
      return;
    }
    setTempSongs((oldArray) => [...oldArray, id]);
  };

  return (
    <React.Fragment>
      {title && (
        <center>
          {" "}
          <h3> Songs From Library</h3>{" "}
        </center>
      )}
<center style={{color:"red"}}>  {error && error } </center>
     { !error && <div style={{zIndex:-1}}>
        <div  style={{ width: myWidth, height: myHeight }}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                columnCount={2}
                rowCount={songs.length}
                rowRenderer={({ key, index, style, parent }) => {
                  const song = songs[index];
                  return (
                    <CellMeasurer
                      key={key}
                      cache={cache.current}
                      parent={parent}
                      columnIndex={0}
                      rowIndex={index}
                    >
                      <center style={style} className={DStyles.song}>
                        <p>Title: {song.title}</p>
                        <p>Album: {song.album}</p>
                        <p>Artist: {song.artist}</p>

                        {addBtn && (
                          <button
                            onClick={() => {
                              handleAddSongs(song.id);
                            }}
                          >
                            {" "}
                            Add to Playlist{" "}
                          </button>
                        )}
                        <div className={DStyles.line} />
                      </center>
                    </CellMeasurer>
                  );
                }}
              />
            )}
          </AutoSizer>
        </div>
      </div>}
    </React.Fragment>
  );
};

export default DisplaySongs;
