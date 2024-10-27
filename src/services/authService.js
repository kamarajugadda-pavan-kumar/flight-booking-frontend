import config from "../config";
import axios from "axios";
// write services for auth signin and sign up
const signInService = async (emailId, password) => {
  try {
    const response = await axios.post(`${config.baseUrl}/api/v1/auth/sign-in`, {
      emailId,
      password,
    });
    console.log(response);
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to sign in. Please try again.");
  }
};

const signUpService = async (emailId, password) => {
  try {
    const response = await axios.post(`${config.baseUrl}/api/v1/auth/sign-up`, {
      emailId,
      password,
    });
    return response.data.message;
  } catch (err) {
    throw new Error("Failed to sign up. Please try again.");
  }
};

export default { signInService, signUpService };
