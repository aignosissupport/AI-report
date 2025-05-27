import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
export const AppContext = createContext();

// API Endpoints
const API_URL =
  "https://de.aignosismdw.in/rest/feature_extraction_test_results/";
const AI_REPORT_URL =
  "https://de.aignosismdw.in/rest/get_ai_report_available_status/";
const PSYCHOLOGIST_REPORT_URL =
  "https://de.aignosismdw.in/rest/get_psychologist_report_available_status/";

const GET_TEST_TIMETAMP_API_URL =
  "https://de.aignosismdw.in/rest/get_test_timestamp/";

// Create the provider component
export const AppProvider = ({ children }) => {
  const [testData, setTestData] = useState({
    PATIENT_UID: "",
    TRANSACTION_ID: "",
    patientName: "",
    patienDOB: "",
    ai_report_available: "",
    psychologist_report_available: "",
    psychologistformtestsData: "",
    autismProbability: "",
    test_timestamp: "",
    feature_extraction_test_data: undefined,
  });

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  useEffect(() => {
    // set patient uid and transaction id
    const patient_uid = getURLParameter("PATIENT_UID") || "N/A";
    const transaction_id = getURLParameter("TRANSACTION_ID") || "N/A";

    fetchReportAvailability(patient_uid, transaction_id)
      .then((reportsAvailable) => {
        if (reportsAvailable === undefined) {
          // TODO: if reportsAvailable is undefined, that means, function ended with error, redirect to Reports Not available yet page
        } else {
          setTestData((prevState) => ({
            ...prevState,
            PATIENT_UID: patient_uid,
            TRANSACTION_ID: transaction_id,
            ai_report_available: true,
            psychologist_report_available: true,
          }));

          fetchPsychologistFormResults(patient_uid, transaction_id)
            .then((results) => {

              setTestData((prevState) => ({
                ...prevState,
                psychologistformtestsData: results,
              }));

              fetchTestData(patient_uid, transaction_id)
                .then((data) => {

                  setTestData((prevState) => ({
                    ...prevState,
                    feature_extraction_test_data: data,
                  }));

                  fetchTestTimestamp(patient_uid, transaction_id)
                    .then(async (data) => {
                      let response_obj = await data.json();
                      setTestData((prevState) => ({
                        ...prevState,
                        test_timestamp: response_obj.test_timestamp,
                      }));
                    })
                    .catch((error) => {
                      console.error("Error fetching test timestamp", error);
                    });
                })
                .catch((error) => {
                });
            })
            .catch((error) => {
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const fetchTestTimestamp = async (patient_uid, transaction_id) => {
    try {
      const testTimestampUnixMillis = await fetch(GET_TEST_TIMETAMP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_uid, transaction_id }),
      });
      return testTimestampUnixMillis;
    } catch (e) {
      console.error("Error fetching test timestamp", e);
    }
  };

  // Function to check AI and Psychologist report availability
  const fetchReportAvailability = async (patient_uid, transaction_id) => {
    try {
      const aiResponse = await fetch(AI_REPORT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_uid, transaction_id }),
      });

      const psychologistResponse = await fetch(PSYCHOLOGIST_REPORT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_uid, transaction_id }),
      });

      const aiData = await aiResponse.json();
      const psychologistData = await psychologistResponse.json();

      return (
        aiData.ai_report_available &&
        psychologistData.Psychologist_report_available
      );
    } catch (error) {
      console.error("Error fetching report availability:", error);
      // TODO: redirect to report not ready yet page
    }
  };

  // set ai and psych report availability

  const fetchPsychologistFormResults = async (patient_uid, transaction_id) => {
    try {
      const response = await axios.post(
        "https://de.aignosismdw.in/rest/get_psychologist_form_results/",
        {
          patient_uid,
          transaction_id,
        }
      );

      const psych_form_results = response.data;

      return psych_form_results;
    } catch (error) {
      console.error("Error fetching psychologist form results:", error);
      // TODO: redirect to error page
    }
  };

  const replaceZeroWithTen = (value) => (value == 0 ? 10 : value);

  // Function to fetch test data
  const fetchTestData = async (patient_uid, transaction_id) => {
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_uid, transaction_id }),
      });
      const data = await response.json();

      if (!response.ok) {
        // TODO: redirect to error page
      }
     return data;
    } catch (error) {
      console.error("Error fetching test data:", error);
      // TODO: redirect to error page
    }
  };
  return (
    <AppContext.Provider value={{ testData, setTestData, fetchTestData }}>
      {children}
    </AppContext.Provider>
  );
};
