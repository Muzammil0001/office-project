import axios from "axios";
import { REACT_API_URL } from "../../config";

export const getStudentsByCourse = async (courseId) => {
  try {
    const response = await axios.get(
      `${REACT_API_URL}/enrollments/students/?courseId=${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting User:", error);
  }
};
