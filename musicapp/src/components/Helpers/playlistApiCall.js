import Axios from "axios";
import { API } from "../../Backend";

export const createPlaylist = async (body) => {
  const url = `${API}/playlist/`;
  console.log("Url",url);
  try {
    const response = await Axios.post(url, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPlayList = async () => {
  const url = `${API}/playlist`;

  try {
    const response = await Axios.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUniquePlayList = async (id) => {
  const url = `${API}/playlist/${id}`;

  try {
    const response = await Axios.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePlaylist = async (id) => {
  const url = `${API}/playlist/${id}`;
  try {
    const response = await Axios.delete(url);
    return response;
  } catch (error) {
    return error;
  }
};
