import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        // No token found, redirect to login
        navigate("/login");
        return;
      }

      try {
        // Verify the token with the backend
        const response = await axiosInstance.post(
          "/verifyJwt",
          {}, // Empty body for the POST request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token in the headers
            },
          });

        if (!response.data.success) {
          // Token verification failed, redirect to login
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return <>{children}</>;
};

export default AuthRoute;
