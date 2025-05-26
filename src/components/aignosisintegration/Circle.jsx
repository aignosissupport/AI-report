import React from "react";

function Circle({ x, y, radius, imageUrl, onClickHandler }) {
  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 100% {
              opacity: 1; /* Fully visible */
            }
            0% {
              opacity: 0.3; /* Partially transparent */
            }
          }
        `}
      </style>
      <img
        src={imageUrl} // Use the URL of the dog image
        onClick={onClickHandler}
        style={{
          position: "absolute",
          left: x - radius/2, // Subtract radius to center the image at (x, y)
          top: y - radius/2,
          width: radius * 2,
          height: radius * 2,
          objectFit: "contain", // Ensure the image fits nicely
          cursor: "pointer", // Indicate it's clickable
          animation: "blink 0.5s infinite", // Apply the blinking animation
          
        }}
      />
    </>
  );
}

export default Circle;
