import axios from "axios";
import { REACT_API_URL } from "../../config";

export const createUserApi = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/users`, data);
    console.log("Response:", response.data);
    if (response.status === 201) {
      alert("User created successfully");
    }
    return response.data;
  } catch (error) {
    console.error("Error in creating user:", error);
  }
};

export const getUsersApi = async () => {
  try {
    const response = await axios.get(`${REACT_API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error in getting Users:", error);
  }
};

export const getUserByIdApi = async (UserId) => {
  try {
    const response = await axios.get(`${REACT_API_URL}/users/${UserId}`);
    return response.data;
  } catch (error) {
    console.error("Error in getting User:", error);
  }
};

export const getUserByIRole = async (role) => {
  try {
    const response = await axios.get(`${REACT_API_URL}/usersrole?role=${role}`);
    return response.data;
  } catch (error) {
    console.error("Error in getting User:", error);
    console.error("Error data announcement:", error.response.data);
  }
};

export const countUserByIRole = async (role) => {
  try {
    const response = await axios.get(
      `${REACT_API_URL}/count/users?role=${role}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting User:", error);
  }
};

export const deleteUserApi = async (UserId) => {
  try {
    const response = await axios.delete(`${REACT_API_URL}/users/${UserId}`);
    if (response.status == 200) {
      alert("Student deleted successfully");
    }
    return response.data;
  } catch (error) {
    console.error("Error in deleting User:", error);
  }
};

export const updateUserApi = async (userId, data) => {
  try {
    const response = await axios.patch(
      `${REACT_API_URL}/users/${userId}`,
      data
    );
    console.log("Updated user:", response.data);
    return response;
  } catch (error) {
    console.error("Error in updating user:", error);
  }
};

export const signinUser = async (data) => {
  try {
    const response = await axios.post(`${REACT_API_URL}/users/login`, data);
    console.log("Login successfully:", response.data);
    alert("Login successfully");

    return response;
  } catch (error) {
    console.error("Error in Login", error);
  }
};
