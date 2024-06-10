import axios from "axios";
import { REACT_API_URL } from "../../config";

export const postQuiz = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/quizzes`, data);
    if (response.status == 201) {
      console.log("Quiz Created:", response.data);
      alert("Quiz Created Successfully")
      return response;
    }
  } catch (error) {
    console.error("Error in creating quiz:", error);
  }
};

export const getQuizzes = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/quizzes`);
    if (response.status == 200) {
      console.log("Quiz Fetched:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in fetching quizzes:", error);
  }
};

export const getQuizById = async (id) => {
  try {
    const response = await axios.get(`${REACT_API_URL}/quizzes/${id}`);
    if (response.status === 200) {
      console.log("Quiz Fetched:", response.data);
      return response.data; // Ensure returning the data directly
    }
  } catch (error) {
    console.error("Error in fetching quiz:", error);
    throw error; // Re-throw error for handling in the component
  }
};

export const updateQuiz = async (id) => {
  try {
    const response = await axios.get(`${REACT_API_URL}/quizzes/{id}`);
    if (response.status == 200) {
      console.log("Quiz Fetched:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in fetching quiz:", error);
  }
};

export const ViewQuiz = async (id) => {
  try {
    const response = await axios.get(`${REACT_API_URL}/quizzes/{id}`);
    if (response.status == 200) {
      console.log("Quiz Fetched:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in fetching quiz:", error);
  }
};


export const getQuizByStdId = async (id) => {
  try {
    const response = await axios.get(`${REACT_API_URL}/student/quizzes/${id}`);
    if (response.status === 200) {
      console.log("Quiz Fetched:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error in fetching quiz:", error);
  }
}
