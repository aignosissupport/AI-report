// import useAuth from "@/Hook/useAuth";
import axios from "axios";
import axiosInstance from "./axiosInstance";
// import useAuth from "@/Hook/useAuth";

const fetchData = async ({ url, method, data = {}, storedToken }) => {
  // const {storedToken} = useAuth()
  const source = axios.CancelToken.source();
  try {
    console.log("this is come there in api function")
    const result = await axiosInstance({
      url,
      method,
      data: method.toLowerCase() === "get" ? undefined : data, // Only include data for non-GET requests
      params: method.toLowerCase() === "get" ? data : undefined, // For GET reqsuests, use data as query params
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedToken}`, // Add token to Authorization header
      },
      cancelToke: source.token,
    });
    return { response: result.data, error: null, loading: false };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled", error.message);
    }
    return {
      response: null,
      error: error.response ? error.response.data : error.message,
      loading: false,
    };
  }
};

export default fetchData;
