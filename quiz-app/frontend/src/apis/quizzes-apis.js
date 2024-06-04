import axios from "axios";
import { REACT_API_URL } from "../../config";

export const postQuiz = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/quizzes`, data);
    if (response.status == 201) {
      console.log("Quiz Created:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in creating course:", error);
  }
};
