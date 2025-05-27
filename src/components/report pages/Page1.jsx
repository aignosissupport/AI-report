import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { split } from "postcss/lib/list";

const Page1 = () => {
  // HARD CODED THRESHOLDS, THESE ARE MODEL DEPENDENT CALCULATED VIA THE ROC CURVE
  const lstm_cnn_model_threshold = 0.4;
  const txgb_model_threshold = 0.5;

  const [dateOfAssessment, setDateOfAssessment] = useState("");

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  // const formatDate = (rawDate) => {
  //   if (!rawDate) return "N/A";
  //   if (!isNaN(rawDate)) {
  //     const excelEpoch = new Date(1899, 11, 30);
  //     const date = new Date(excelEpoch.getTime() + rawDate * 86400000);
  //     return `${String(date.getDate()).padStart(2, "0")}/${String(
  //       date.getMonth() + 1
  //     ).padStart(2, "0")}/${date.getFullYear()}`;
  //   }
  //   const parts = rawDate.split("/");
  //   if (parts.length !== 3) return rawDate;
  //   return `${parts[1].padStart(2, "0")}/${parts[0].padStart(2, "0")}/${
  //     parts[2]
  //   }`;
  // };

  const customDateFormatter = (dob) => {
    // assuming dob is a string of the type 'yyyymmdd' or an example would be 20170902
    // so we're returning 02/09/2017
    return `${dob[6]}${dob[7]}/${dob[4]}${dob[5]}/${dob[0]}${dob[1]}${dob[2]}${dob[3]}`;
  };

  const unixMillisToDate = (testTimestampUnixMillis) => {
    setDateOfAssessment(formatTimestamp(testTimestampUnixMillis));
  };

  function formatTimestamp(unixMillis) {
    const date = new Date(unixMillis);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const patient_uid = getURLParameter("PATIENT_UID") || "N/A";
  const transaction_id = getURLParameter("TRANSACTION_ID") || "N/A";
  const name = getURLParameter("name") || "N/A";
  const dob = customDateFormatter(getURLParameter("patientDOB")) || "N/A";
  // const dob = formatDate( || "N/A");

  // working on timestamp first
  const { testData, fetchTestData } = useContext(AppContext);

  const getAggregatedAutismScore = (ai_report_data) => {
    if (ai_report_data.feature_extraction_test_data != undefined) {
      if (
        ai_report_data.feature_extraction_test_data["TXGB_model_proba"] ===
          undefined &&
        ai_report_data.feature_extraction_test_data[
          "etsp_lstm_cnn_model_prediction"
        ] === undefined
      ) {
        return -1;
      }

      if (
        ai_report_data.feature_extraction_test_data["TXGB_model_proba"] >
          txgb_model_threshold &&
        ai_report_data.feature_extraction_test_data[
          "etsp_lstm_cnn_model_prediction"
        ] > lstm_cnn_model_threshold
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  useEffect(() => {
    fetchTestData(patient_uid, transaction_id);
  }, [dateOfAssessment]);

  useEffect(() => {
    if (testData.PATIENT_UID !== "") {
      unixMillisToDate(testData.test_timestamp);
    }
  }, [testData]);

  return (
    <div
      style={{
        display: "flex",
        border: "0px solid red",
        flexDirection: "column",
        fontFamily: "Manrope, sans-serif",
        alignItems: "center",
        padding: "32px",
        backgroundColor: "white",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "0px solid green",
          backgroundColor: "white",
          padding: "32px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          borderRadius: "6px",
          width: "210mm",
          height: "297mm",
          position: "relative",
        }}
      >
        {/* Top Right Circles */}
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "200px",
            height: "200px",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-70px",
              right: "-30px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "8px solid #8e44ad",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-10px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "5px solid #c27fe0",
            }}
          ></div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            zIndex: 10,
            padding: 20,
            border: "0px solid red",
            height: "80vh",
          }}
        >
          {/* development screening results box */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              border: "0px solid blue",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h1
              style={{
                fontSize: 30,
                fontWeight: "450",
              }}
            >
              Development Screening Results
            </h1>

            <div
              style={{
                width: "100%",
                borderTop: "3px solid #8d44ac",
                marginTop: 15,
              }}
            ></div>
          </div>

          {/* box 1 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              backgroundColor: "#f9f4ff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              width: "100%",
              border: "1px solid #8e44ad",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#333",
              }}
            >
              Name: {name}
              <br />
              Date of Birth: {dob}
              <br />
              Date of Assessment: {dateOfAssessment}
            </p>
          </div>

          {/* box 2 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              backgroundColor: "#f9f4ff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              margin: "8px 0",
              width: "100%",
              border: "1px solid #8e44ad",
            }}
          >
            {getAggregatedAutismScore(testData) === 0 ? (
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                Your child does{" "}
                <span style={{ color: "#8e44ad", fontWeight: "bold" }}>
                  not
                </span>{" "}
                show{" "}
                <span style={{ color: "#8e44ad", fontWeight: "bold" }}>
                  autistic traits
                </span>{" "}
                based on this screening.
              </p>
            ) : getAggregatedAutismScore(testData) === 1 ? (
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                Your child{" "}
                <span style={{ color: "#8e44ad", fontWeight: "bold" }}>
                  shows
                </span>{" "}
                <span style={{ color: "#8e44ad", fontWeight: "bold" }}>
                  autistic traits
                </span>{" "}
                based on this screening.
              </p>
            ) : (
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                Unfortunately, we do{" "}
                <span style={{ color: "#8e44ad", fontWeight: "bold" }}>
                  not have enough information
                </span>{" "}
                to determine whether your child shows autistic traits.
              </p>
            )}
          </div>

          {/* box 3 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",

              flex: 1,
              backgroundColor: "#f9f4ff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginTop: "16px",
              width: "100%",
              border: "1px solid #8e44ad",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                marginBottom: "8px",
                color: "#8e44ad",
                fontWeight: "600",
              }}
            >
              What This Means
            </h3>
            <div
              id="wtm-text-div"
              style={{
                border: "0px solid pink",
                flexDirection: "column",
                width: "100%",
                textAlign: "center",
                padding: 5,
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  color: "#666",
                  lineHeight: "1.6",
                  marginBottom: "8px",
                  border: "0px solid green",
                }}
              >
                This screening is designed to detect the possibility of social
                and communication challenges that your child might be
                experiencing.
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#666",
                  lineHeight: "1.6",
                  border: "0px solid green",
                }}
              >
                Remember that this is just a screening tool. For a comprehensive
                evaluation, please consult with a developmental pediatrician or
                child psychologist.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left Circles */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "200px",
            height: "200px",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-110px",
              left: "-110px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "8px solid #8e44ad",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "5px solid #c27fe0",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
