import axios from "axios";
import { REACT_API_URL } from "../../config";

export const postChat = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/discussion/`, data);
    if (response.status == 201) {
      console.log("Response:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in creating course:", error);
  }
};

export const getChats = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/discussion/`);
    if (response.status == 200) {
      console.log("Response:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in creating course:", error);
  }
};
