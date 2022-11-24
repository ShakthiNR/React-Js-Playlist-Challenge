import Axios from "axios";
import { API } from "../../Backend";

export const getSongs = async () => {
  const url = `${API}/library`;
  try {
    const response = await Axios.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUniqueSong = async (id) => {
  const url = `${API}/library/${id}`;
  try {
    const response = await Axios.get(url);
    return response;
  } catch (error) {
    return error;
  }
};
