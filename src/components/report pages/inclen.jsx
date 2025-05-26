// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// const INCLEN = () => {
  

//   const getURLParameter = (name) => {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(name);
//   };
//   const age=(getURLParameter("Age") || "N/A") + " Years";
//   const formatToOneDecimal = (value) => parseFloat(value).toFixed(1);
//   const name=getURLParameter("Name") || "N/A";  
//   const currentDate = new Date().toLocaleDateString();
//   const TOT_CARS = getURLParameter("TOT_CARS") || "N/A";
//   const carsInterpretation = getURLParameter("carsInterpretation") || "N/A";
//   return (
//     <>
//       <style>{`
//         body {
//           font-family: Arial, sans-serif;
//           padding: 20px;
//           text-align: justify;
//         }
//         .data-field {
//           margin-bottom: 10px;
//           font-size: 16px;
//         }
//         .label {
//           font-weight: bold;
//         }
//         #barChart {
//           max-width: 100%;
//           margin-top: 20px;
//         }
//         .section-title {
//           color: #94059f;
//           font-size: 20px;
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
//       `}</style>
//  <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen" >
//  <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
//              <div>
//                     <h1 className='text-left text-sm'>Childhood Autism Rating Scale Report</h1>
//                     <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
//                 </div>

//       <div className="container" style={{width: "100%",
//           maxWidth: "800px",
//           margin: "auto"}}>
//         <h1 style={{paddingBottom: "15px",
//             marginLeft:"-30vw",
//             fontFamily: '"Times New Roman", Times, serif',
//             fontWeight: "600",
//             fontSize: "xx-large",
//             color: "#94059f",
//             }}>CARS <span style={{color:"black"}}> Screening:</span>
//         </h1>
//         <div style={{textAlign:"justify"}}>
//         The CARS (Childhood Autism Rating Scale) is a widely used tool designed to assess the severity of autism
// spectrum disorder (ASD) in children. This assessment evaluates critical developmental domains such as social
// interaction, communication skills, and behavioral patterns to help identify early signs of autism.

//                 <br />
//                 The CARS score provides a structured analysis of the child's behavior, categorizing them into varying degrees
// of severity of autism. The system generates an overall assessment based on the child's responses across key
// areas like social interaction, emotional response, imitation, and adaptation to change. <br />
// The results include a severity classification indicator, whichhelps determine whether a child exhibits typical
// development, mild signs requiring follow-up, or significant concerns necessitating further evaluation. Early
// identification through CARS allows for targeted interventions, improving long-term developmental outcomes.


//                 The system provides outputs as <span id="carsInterpretationmessage"
//                     style={{fontSize: "x-large", color: "#007bff"}}> {carsInterpretation}</span> and the Aignosis ISAA test output was: <span id='isaascore'
//                     style={{fontSize: "xx-large", color: "#007bff"}}>{TOT_CARS}</span> 
//                 <br /><br />
//         </div>
        
//         <div id="patientData" style={{fontSize:"larger"}}>
//           <div><span className="label" >Patient Name:</span> <span id="isaapatientNamecell">{name}</span></div>
//           <div><span className="label">Age:</span> <span id="chronologicalAgecell">{age}</span></div>
//         </div>
//         <br /><br />
//         {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{TOT_CARS} </span></h2>
//         <p style={{textAlign:"left"}}>Interpretation: <span id="carsInterpretationmessage">{carsInterpretation}</span></p> */}

       
        
       
        
//         <center>
//         <table border="4" style={{width: "50%", textAlign: "center", marginTop: "10px", border: "1px solid #d1d5db" , padding: "8px" }}>
//                     <tr >
//                         <th style={{ border: "1px solid #d1d5db", borderLeft:"0px", borderRight:"0px" ,  padding: "8px" }}>Score Range</th>
//                         <th style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Classification</th>
//                     </tr>
//                     <tr>
//                         <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>&lt;14.5</td>
//                         <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>No Risk of Autism</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>15-29.5</td>
//                         <td style={{ border: "1px solid #d1d5db",borderRight:"0px" ,  padding: "8px" }}>Minimal to No Risk of Autism</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>30-36.5</td>
//                         <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Mild to Moderate Risk of Autism</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>37&lt; </td>
//                         <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Severe Risk of Autism</td>
//                     </tr>
//                 </table> 
//         </center> 
//         <br />
//         <div style={{fontSize: "12px",
//             color: "#727a98",
//             fontFamily: `"Times New Roman", Times, serif`,
//             fontWeight: "600",
//             lineHeight: "15px",
//             textAlign:"justify"}}>
//             <p>The  CARS (Childhood Autism Rating Scale) test output provides an assessment of the child's behavior patterns based on their responses to key screening questions across various developmental domains.</p> <p> <br /> <strong>Lower CARS Score:</strong> A lower score indicates that the child’s behaviors align closely with typical developmental milestones, suggesting a minimal likelihood of autism spectrum disorder (ASD). In this case, the child exhibits expected social interaction, communication, and behavioral patterns, indicating that the child’s development is progressing typically. </p> <br /><p> <strong>Higher CARS Score:</strong> A higher score suggests that the child’s responses indicate a greater degree of atypical behaviors or developmental delays, which may be associated with autism spectrum disorder. This means that the child may experience challenges in areas such as social communication, emotional response, imitation, and flexibility. A higher score doesn’t confirm a diagnosis of autism but serves as an early indicator that further evaluation by a specialist may be necessary. </p> <br /> <p> The CARS screening tool is designed to help identify children who may require additional assessment and intervention at an early stage. Early detection and timely intervention can play a crucial role in supporting a child’s developmental needs and improving long-term outcomes. </p>
//         </div>
//         {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{TOT_CARS} </span></h2>
//         <p style={{textAlign:"left"}}>Interpretation: <span id="carsInterpretationmessage">{carsInterpretation}</span></p> */}

//         {/* <br /> */}
//          <div className="w-full flex justify-between items-center text-xs font-manrope mt-6 border-t-2 border-[#800080] pt-2">
//                     <span className='text-[10px]'>CARS Report - {name}</span>
//                     <div className="text-center text-[10px]">
//                         <span></span>
//                         <br />
//                         <span>ID: Report Generation Date: {currentDate}</span>
//                     </div>
//                     <span className='text-[10px]'>Page 15</span>
//         </div>
//       </div>
//       </div>
//       </div>
//     </>
//   );
// };

// export default INCLEN;
