import React, { useEffect, useState } from "react";
import ReportHeader from "../ReportHeader";

const Commnpdfpage = ({ src, alttext }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous"; // Allow CORS for html2canvas
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen" style={{ width: "794px", height: "1123px" }}>
      <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm] flex justify-center items-center flex-col relative">
      <ReportHeader />
        {imageLoaded ? (
          <img  src={src} alt={alttext} className="pdf-image w-full h-auto" style={{ width: "100%", height: "100%", objectFit: "cover" }}  crossOrigin="anonymous" />
        ) : (
          <p>Loading Image...</p>
        )}
      </div>
    </div>
  );
};

export default Commnpdfpage;
