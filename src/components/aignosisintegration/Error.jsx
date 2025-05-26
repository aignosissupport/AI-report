import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  const errorStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1e0a2d", // Light red background
    color: "#f1f1f1", // Dark red text
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  };

  const errorTitleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const errorMessageStyle = {
    fontSize: "1.2rem",
  };

  return (
    <div className="bg-[#1A0C25] flex flex-col justify-center items-center min-h-screen text-center">
      {/* Step Progress Indicator */}
      {/* <StepProgress /> */}

      {/* Ai.gnosis Title with Glow Effect */}
      <div className="relative ">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-60 rounded-lg"></div>
        <h1 className="relative text-5xl font-semibold text-[#E3E2E5] z-10 font-montserrat">
          Ai.gnosis
        </h1>
      </div>

      {/* Big Thank You Message */}
      <div className="mt-4">
        <h2 className="text-6xl font-bold text-[#FFFFFF] font-manrope">Error</h2>
      </div>

      {/* Thank You Paragraph */}
      <div className="mt-6 max-w-2xl px-6 text-[#F6E8FB] font-raleway">
        <p className="text-lg text-center">
        We deeply value your presence and sincerely apologize for the inconvenience caused. At Aignosis, your experience is of utmost importance to us, and we strive to ensure a seamless journey. Unfortunately, something went wrong during the process. We kindly request you to go through the process again to complete your task. Rest assured, our team is working diligently to improve and prevent such interruptions in the future. Thank you for your patience and understanding.
        </p>
      </div>
      <Link
          to="/"
          className="text-white border border-[#9C00AD] px-6 py-3 rounded-full font-semibold mt-4 w-[150px] flex justify-center items-center
    transition-all duration-300 ease-in-out hover:bg-[#9C00AD] hover:border-transparent hover:shadow-md"
        >
          Exit Test
        </Link>
    </div>
  );
};

export default Error;
