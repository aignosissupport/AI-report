import React, { useRef, useState, useContext, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Page1 from "./Page1";
import Commnpdfpage from "./Commnpdfpage";
import imglogo from "/aignosislogo.png";
import { AppContext } from "../../AppContext";
import ReportHeader from "../ReportHeader";

const pdfData = [
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.1.png",
    alttext: "report first page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.2.png",
    alttext: "report second page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.3.png",
    alttext: "report third page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.4.png",
    alttext: "report four page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.5.png",
    alttext: "report fifth page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.6.png",
    alttext: "report six page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.7-aireport.png",
    alttext: "report seven page",
  },
];

const SecondpdfData = [
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.1.png",
    alttext: "report ten page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.2.png",
    alttext: "report eleven page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.3.jpg",
    alttext: "report tweleve page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.4.png",
    alttext: "report thireteen page",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.5.png",
    alttext: "report  page 14",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.6.png",
    alttext: "report page 15",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.7.png",
    alttext: "report page 16",
  },
  {
    url: "https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page2.8.png",
    alttext: "report page 17",
  },
];

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div
    id="pdf-container"
    ref={ref}
    style={{ width: "794px", minHeight: "1123px" }}
  >
    {/* Only include images that are NOT Page2 & Page3 */}
    {pdfData
      //   .filter((item) => !item.alttext.includes("second page") && !item.alttext.includes("third page"))
      .map((item, index) => (
        <Commnpdfpage key={index} src={item.url} alttext={item.alttext} />
      ))}

    {/* Ensure unique page components */}
    <div className="pdf-page" style={{ width: "794px", minHeight: "1123px" }}>
      <Page1 />
    </div>

    {SecondpdfData.map((item, index) => (
      <Commnpdfpage key={index} src={item.url} alttext={item.alttext} />
    ))}
  </div>
));

ComponentToPrint.displayName = "ComponentToPrint";

const GeneratePDF = () => {
  const componentRef = useRef();
  const [loading, setLoading] = useState(false); // Loader state
  const { testData } = useContext(AppContext);
  const patientName = testData.patientName || "N/A";

  useEffect(() => {
    if (patientName !== undefined) console.log(patientName);
  }, [patientName]);

  const generatePDF = async () => {
    setLoading(true); // Show loader when PDF generation starts
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true, // Enable compression
    });
    const pages = document.querySelectorAll(".pdf-page");

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // small delay for rendering
        const canvas = await html2canvas(page, {
          useCORS: true,
          scale: 2, // Ensure high resolution
          backgroundColor: "#ffffff", // Avoid transparency issues
          width: 794,
          height: 1123,
        });

        const imgData = canvas.toDataURL("image/png", 1.0);

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size in mm
      } catch (error) {
        console.error("Error capturing page:", error);
      }
    }

    pdf.save(`${patientName}_report.pdf`);
    setLoading(false); // Hide loader after download is complete
  };

  return (
    <div className="text-center ml-[30%]">
      <button
        className="mt-5 px-4 ml-[-30%] py-2 bg-blue-600 text-white rounded"
        onClick={generatePDF}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate PDF"}
      </button>
      <ComponentToPrint ref={componentRef} />
      <center>
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="p-4 bg-white rounded-lg">
              <img
                src={imglogo}
                alt=""
                style={{ scale: "1", height: "15vh" }}
              />
              <p className="text-lg font-semibold text-gray-700">
                Generating PDF...
              </p>
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mt-2"></div>
            </div>
          </div>
        )}
      </center>
    </div>
  );
};

export default GeneratePDF;
