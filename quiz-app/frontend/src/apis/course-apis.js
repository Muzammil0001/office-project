import axios from "axios";
import { REACT_API_URL } from "../../config";

export const postCourseApi = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/courses`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status == 201) {
      console.log("Response:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in creating course:", error);
  }
};

export const getCoursesApi = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error("Error in getting courses:", error);
  }
};

export const getCourseByIdApi = async (courseId) => {
  try {
    const response = await axios.get(`${REACT_API_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error in getting course:", error);
  }
};

export const countCourse = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/count/courses/`);
    return response.data;
  } catch (error) {
    console.error("Error in getting User:", error);
  }
};

export const deleteCourseApi = async (courseId) => {
  try {
    const response = await axios.delete(`${REACT_API_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleting course:", error);
  }
};

export const updateCourseApi = async (courseId, data) => {
  try {
    const response = await axios.patch(
      `${REACT_API_URL}/courses/${courseId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Updated Course:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in updating course:", error);
  }
};
