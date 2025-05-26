import React, { useEffect, useRef, useState,useContext } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AppContext } from "../../AppContext";

const CARS3 = () => {
  
  const chartRef = useRef(null);
    const [CARSResponses, setCARSResponses] = useState([]);
  
    const getURLParameter = (name) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    };
  
    const { testData } = useContext(AppContext);
  
    const age = (testData.patienthistoryform1data?.Age || "N/A") + " Years";
    const name = testData.patienthistoryform1data?.NameOfChild || "N/A";
    const currentDate = new Date().toLocaleDateString();
    const TOT_CARS = testData.carsscore || "N/A";
    const carsInterpretation = "N/A"; // Adjust this if interpretation logic is available

  const CARSQuestions = [
    // "Relating to People", "Imitation", "Emotional Response", "Body Use",
    // "Object Use", "Adaptation to Change", 
    "Visual Response", "Listening Response",
    "Taste, Smell, and Touch Response and Use", "Fear or Nervousness", "Verbal Communication",
    "Nonverbal Communication", "Activity Level", "Level and Consistency of Intellectual Response",
    "General Impressions"
  ];

  useEffect(() => {
    displayCARSResponses();
    
  }, []);

  const displayCARSResponses = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const responses = CARSQuestions.map((question, index) => {
      const response = urlParams.get(`CARS_${index + 1}`) || "N/A";
      return { question, response };
    });
    setCARSResponses(responses);
  };

  
  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          text-align: justify;
        }
        .data-field {
          margin-bottom: 10px;
          font-size: 16px;
        }
        .label {
          font-weight: bold;
        }
        .chart-container {
          width: 100%;
          height: 500px;
          margin-top: 30px;
        }
        .table-container {
          margin-top: 30px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #94059f;
          color: white;
        }
        td {
          color: #333;
        }
      `}</style>

      <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen">
        <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
          <div>
            <h1 className='text-left text-sm'>Childhood Autism Rating Scale Report</h1>
            <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
          </div>

          <div className="container" style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
            <h1 style={{
              paddingBottom: "15px",
              marginLeft: "-30vw",
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: "600",
              fontSize: "xx-large",
              color: "#94059f",
            }}>
              CARS <span style={{ color: "black" }}> Screening:</span>
            </h1>
           

            <div className="table-container">
              <h2 style={{ color: "#94059f", fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
                CARS Responses:
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Response</th>
                  </tr>
                </thead>
                <tbody>
                  {CARSResponses.map((item, index) => (
                    <tr key={index}>
                      <td>{item.question}</td>
                      <td style={{ color: "#94059f" }}>{item.response}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className="w-full flex justify-between items-center text-xs font-manrope mt-40 border-t-2 border-[#800080] pt-2">
              <span className='text-[10px]'>CARS Report - {name}</span>
              <div className="text-center text-[10px]">
                <span>ID: Report Generation Date: {currentDate}</span>
              </div>
              <span className='text-[10px]'>Page 17</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CARS3;
