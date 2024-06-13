import axios from "axios";
import { REACT_API_URL } from "../../config";

export const createEnrollment = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/enrollments`, data);
    if (response.status == 201) {
      return response.data;
    }
  } catch (error) {
    console.error("Error in enrollment:", error);
  }
};

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

export const getAllEnrollments = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/enrollments/`);
    if (response.status == 200) {
      // console.log("Enrollments Fetched:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in fetching enrollments:", error);
  }
};
///////get enrolled courses based on std Id
export const getEnrolledCourses = async (StdId) => {
  try {
    const response = await axios.get(
      `${REACT_API_URL}/courses/enrollments/${StdId}`
    );
    if (response.status == 200) {
      console.log("Enrolled Course Fetched:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in fetching enrolled courses:", error);
  }
};
