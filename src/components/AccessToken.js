export const fetchAccessToken = async () => {
  try {
    const response = await fetch("http://localhost:5000/get-access-token");
    const { data, message, result } = await response.json();

    if (result === 0) {
      localStorage.setItem("access_token", data["at"]);
      return { accessToken: data.at, expiresIn: data.expires_in };
    } else {
      console.error("Error fetching access token:", message);
      return { error: message };
    }
  } catch (error) {
    console.error("Error fetching access token:", error);
    return { error: error.message };
  }
};
