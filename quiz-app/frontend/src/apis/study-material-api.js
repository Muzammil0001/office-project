import axios from "axios";
import { REACT_API_URL } from "../../config";

export const postStudyMaterial = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/study-material`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status == 201) {
      console.log("Response:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in posting study material:", error);
  }
};

export const getStudyMaterial = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/study-material`);
    return response;
  } catch (error) {
    console.error("Error in getting study material:", error);
  }
};
