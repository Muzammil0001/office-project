import axios from "axios";
import { REACT_API_URL } from "../../config";

export const postAnnouncement = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/announcements`, data);
    if (response.status == 201) {
      console.log("Announcement Created:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in create announcement:", error);
  }
};

export const getAnnouncements = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/announcements`);
    if (response.status == 200) {
      console.log("Announcement:", Response);
      return response;
    }
  } catch (error) {
    console.error("Error in getting announcement:", error);
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const response = await axios.delete(`${REACT_API_URL}/announcements/${id}`);
    if (response.status == 200) {
      console.log("Announcement:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error data announcement:", error.response.data);
    console.error("Error in getting announcement:", error);
  }
};
