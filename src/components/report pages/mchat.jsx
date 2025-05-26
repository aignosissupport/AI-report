import React, { useEffect,useContext } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AppContext } from "../../AppContext";

const MCHAT = () => {
      
  

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  const { testData } = useContext(AppContext);
  const mchatScore = testData.psychologistformtestsData["mchatScore"] || "N/A";

   useEffect(() => {
      // displayData();
      
      const age = "N/A Years"; // Age is not available in testData
      
  
    }, [testData]);
  const currentDate = new Date().toLocaleDateString();
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
        #barChart {
          max-width: 100%;
          margin-top: 20px;
        }
        .section-title {
          color: #94059f;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      `}</style>
 <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen" >
 <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
             <div>
                    <h1 className='text-left text-sm'>Modified Checklist for Autism in Toddlers Report</h1>
                    <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
                </div>

      <div className="container" style={{width: "100%",
          maxWidth: "800px",
          margin: "auto"}}>
        <h1 style={{paddingBottom: "15px",
            marginLeft:"-28vw",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: "600",
            fontSize: "xx-large",
            color: "#94059f",
            }}>MCHAT <span style={{color:"black"}}> Screening:</span>
        </h1>
        <div style={{textAlign:"justify"}}>
        The M-CHAT (Modified Checklist for Autism in Toddlers) is a widely used screening tool designed to identify
early signs of autism spectrum disorder (ASD) in children aged 16 to 30 months. This assessment evaluates
critical developmental domains such as social interaction, communication skills, and behavioral patterns,
helping to detect potential risk factors for autism at an early stage.

                <br />
                The M-CHAT score provides a structured analysis of the child's responses, categorizing them into low,
medium, or high risk for ASD. The system generates an overall risk assessment based on the child's responses
to key questions, which focus on joint attention, pretend play, response to name, and social engagement. <br />
The results include a risk classification indicator, which helps determine whether a child exhibits typical
development, mild concerns requiring follow-up, or significant risk necessitating further evaluation. Early
identification through M-CHAT allows for timely interventions, improving long-term developmental
outcomes.

                The system provides outputs as <span id="MCHATinterpretationmessage"
                    style={{fontSize: "15px", color: "#007bff"}}> {mchatScore === "N/A" ? "N/A" :
                      mchatScore <= 2 ? "Low Risk of Autism" :
                      mchatScore <= 7 ? "Moderate Risk of Autism" :
                    "High Risk of Autism"}</span> and the Aignosis ISAA test output was: <span id='isaascore'
                    style={{fontSize: "xx-large", color: "#007bff"}}>{mchatScore}</span> 
                <br /><br />
        </div>
        
        <div id="patientData" style={{fontSize:"larger"}}>
          <div><span className="label" >Patient Name:</span> <span id="isaapatientNamecell"></span></div>
          <div><span className="label">Age:</span> <span id="chronologicalAgecell"></span></div>
        </div>
        <br /><br />
        {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{mchatScore} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="MCHATinterpretationmessage">{MCHATinterpretation}</span></p> */}

       
        
       
        
        <center>
        <table border="4" style={{width: "50%", textAlign: "center", marginTop: "10px", border: "1px solid #d1d5db" , padding: "8px" }}>
                    <tr >
                        <th style={{ border: "1px solid #d1d5db", borderLeft:"0px", borderRight:"0px" ,  padding: "8px" }}>Score Range</th>
                        <th style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Classification</th>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>&lt; 0-2</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Low Risk of Autism</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>3-7</td>
                        <td style={{ border: "1px solid #d1d5db",borderRight:"0px" ,  padding: "8px" }}>Mild Risk of Autism</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>8-20+</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Severe Risk of Autism</td>
                    </tr>
                    {/* <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>&gt; 153</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Severe Autism</td>
                    </tr> */}
                </table> 
        </center> 
        <br /><br />
        {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{mchatScore} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="MCHATinterpretationmessage">{MCHATinterpretation}</span></p> */}

        {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
         <div className="w-full flex justify-between items-center text-xs font-manrope mt-60 border-t-2 border-[#800080] pt-2">
                    <span className='text-[10px]'>MCHAT Report - {name}</span>
                    <div className="text-center text-[10px]">
                        
                    </div>
                    <span className='text-[10px]'>Page 12</span>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default MCHAT;
