import config from "../config";
import axios from "axios";
// write services for auth signin and sign up
const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/api/v1/auth/user-profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.data;
  } catch (err) {
    throw new Error("Failed to fetch user profile.");
  }
};

export { fetchUserProfile };
