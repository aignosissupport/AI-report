import React, { useEffect,useContext } from 'react';
import { AppContext } from "../../AppContext";

const MCHAT2 = () => {
  
    const { testData } = useContext(AppContext);
    const mchatResponses = testData.psychologistformtestsData["patienthistoryform3data"] || {};
      useEffect(() => {
        
        console.log("mchat res ",mchatResponses);
        
      },[]);

  const currentDate = new Date().toLocaleDateString();
  const mchatQuestions = [
    "If you point at something across the room, does your child look at it?",
    "Have you ever wondered if your child might be deaf?",
    "Does your child play pretend or make-believe?",
    "Does your child like climbing on things?",
    "Does your child make unusual finger movements near his or her eyes?",
    "Does your child point with one finger to ask for something or to get help?",
    "Does your child point with one finger to show you something interesting?",
    "Is your child interested in other children?",
    "Does your child show you things by bringing them to you or holding them up for you to see?",
    "Does your child respond when you call his or her name?",
    "When you smile at your child, does he or she smile back at you?",
    "Does your child get upset by everyday noises?",
    "Does your child walk?",
    "Does your child look you in the eye when you are talking to him or her?",
    "Does your child try to copy what you do?",
    "If you turn your head to look at something, does your child look around to see what you are looking at?",
    // "Does your child try to get you to watch him or her?",
    // "Does your child understand when you tell him or her to do something?",
    // "If something new happens, does your child look at your face to see how you feel about it?",
    // "Does your child like movement activities?",
  ];

  return (
    <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen" >
 <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
             <div>
                    <h1 className='text-left text-sm'>Modified Checklist for Autism in Toddlers Report</h1>
                    <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
                </div>
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-[#94059f] text-center mb-4">
        M-CHAT Screening
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#94059f] text-white">
              <th className="p-3 border border-gray-300">Question</th>
              <th className="p-3 border border-gray-300">Response</th>
            </tr>
          </thead>
          <tbody>
                {mchatQuestions.map((question, index) => {
                  const response = mchatResponses[`question${index}`] ? "Yes" : "No";
                  return (
                    <tr key={index} className="border border-gray-300">
                      <td className="p-3 border border-gray-300">{question}</td>
                      <td className="p-3 border border-gray-300 text-[#94059f]">{response}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
    <div className="w-full flex justify-between items-center text-xs font-manrope mt-8 border-t-2 border-[#800080] pt-2">
                    <span className='text-[10px]'>MCHAT Report - {testData.patienthistoryform1data?.NameOfChild}</span>
                    <div className="text-center text-[10px]">
                        
                    </div>
                    <span className='text-[10px]'>Page 13</span>
        </div>
    </div>
    </div>

  );
};

export default MCHAT2;
