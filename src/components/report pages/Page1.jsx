import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";

const Page1 = () => {
  const lstm_cnn_model_threshold = 0.4;
  const txgb_model_threshold = 0.5;

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const getAggregatedAutismScore = (testData) => {
    if (
      testData["TXGB_model_proba"] === undefined &&
      testData["etsp_lstm_cnn_model_prediction"] === undefined
    ) {
      return -1;
    }

    if (
      testData["TXGB_model_proba"] > txgb_model_threshold &&
      testData["etsp_lstm_cnn_model_prediction"] > lstm_cnn_model_threshold
    ) {
      return 1;
    } else {
      return 0;
    }
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return 'N/A';
    if (!isNaN(rawDate)) {
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(excelEpoch.getTime() + rawDate * 86400000);
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    }
    const parts = rawDate.split('/');
    if (parts.length !== 3) return rawDate;
    return `${parts[1].padStart(2, '0')}/${parts[0].padStart(2, '0')}/${parts[2]}`;
  };

  const patient_uid = getURLParameter("PATIENT_UID") || "N/A";
  const transaction_id = getURLParameter("TRANSACTION_ID") || "N/A";
  const name = getURLParameter("name") || "N/A";
  const dob = formatDate(getURLParameter("patientDOB") || "N/A");
  const doa = formatDate(getURLParameter("date_of_assesment") || "N/A");
  const { testData, fetchTestData } = useContext(AppContext);

  // const formattedDob = `${dob.slice(6, 8)}${dob.slice(4, 6)}${dob.slice(0, 4)}`;
  // const formattedDobWithSlashes = `${formattedDob.slice(0, 2)}/${formattedDob.slice(2, 4)}/${formattedDob.slice(4)}`;

  useEffect(() => {
    fetchTestData(patient_uid, transaction_id);
    console.log("my debug log", testData);
  }, [patient_uid, transaction_id]);

  return (
    <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen relative">
      <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm] relative">
        
        <h1 className="text-lg font-semibold text-left text-purple-700">
          Development Screening test
        </h1>
        
        <div className="w-[90%] border-t-2 mt-2 border-purple-700"></div>
        {/* Top Right Circles */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] z-0">
          <div className="absolute top-[-70px] right-[-30px] w-[150px] h-[150px] rounded-full border-[8px] border-[#8e44ad]"></div>
          <div className="absolute top-[-50px] right-[-10px] w-[100px] h-[100px] rounded-full border-[5px] border-[#c27fe0]"></div>
        
        </div>

        <div className="flex flex-col items-center justify-center w-full flex-1">
          <div className="bg-[#f9f4ff] rounded-lg shadow-md p-5 w-4/5 max-w-[500px] border border-[#8e44ad] mb-4 mt-6">
            <p className="font-bold text-center text-[#333]">
              Name: {name}
              <br />
              Date of Birth: {dob}
              <br />
              Date of Assessment: {doa}
            </p>
          </div>

          <div className="flex flex-col items-center w-4/5 max-w-[500px] z-10">
            <div className="bg-[#f9f4ff] rounded-lg shadow-md p-5 my-2 w-full border border-[#8e44ad]">
              {getAggregatedAutismScore(testData) === 0 ? (
                <p className="font-bold text-base text-[#333]">
                  Your child does <span className="text-[#8e44ad] font-bold">not</span> show{" "}
                  <span className="text-[#8e44ad] font-bold">autistic traits</span> based on
                  this screening.
                </p>
              ) : getAggregatedAutismScore(testData) === 1 ? (
                <p className="font-bold text-base text-[#333]">
                  Your child <span className="text-[#8e44ad] font-bold">shows</span>{" "}
                  <span className="text-[#8e44ad] font-bold">autistic traits</span> based on
                  this screening.
                </p>
              ) : (
                <p className="font-bold text-base text-[#333]">
                  Unfortunately, we do{" "}
                  <span className="text-[#8e44ad] font-bold">not have enough information</span>{" "}
                  to determine whether your child shows autistic traits.
                </p>
              )}
            </div>

            <div className="bg-[#f9f4ff] rounded-lg shadow-md p-5 mt-4 w-full border border-[#8e44ad]">
              <h3 className="text-lg mb-2 text-[#8e44ad] font-semibold">What This Means</h3>
              <p className="text-sm text-[#666] leading-relaxed mb-2 text-center">
                This screening is designed to detect the possibility of social and
                communication challenges that your child might be experiencing.
              </p>
              <p className="text-sm text-[#666] leading-relaxed text-center">
                Remember that this is just a screening tool. For a comprehensive
                evaluation, please consult with a developmental pediatrician or
                child psychologist.
              </p>
            </div>
          </div>
        </div>
        
     

        {/* Bottom Left Circles */}
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] z-0">
          <div className="absolute bottom-[-150px] left-[-150px] w-[700px] h-[700px] rounded-full border-[8px] border-[#8e44ad]"></div>
          <div className="absolute bottom-[-30px] left-[-30px] w-[500px] h-[500px] rounded-full border-[5px] border-[#c27fe0]"></div>
        </div>

      </div>
    </div>
  );
};

export default Page1;
