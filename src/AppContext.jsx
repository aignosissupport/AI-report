import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
export const AppContext = createContext();

// API Endpoints
const API_URL = "https://de.aignosismdw.in/rest/feature_extraction_test_results/";
const AI_REPORT_URL =
  "https://de.aignosismdw.in/rest/get_ai_report_available_status/";
const PSYCHOLOGIST_REPORT_URL =
  "https://de.aignosismdw.in/rest/get_psychologist_report_available_status/";

// Create the provider component
export const AppProvider = ({ children }) => {
  const [testData, setTestData] = useState({
    PATIENT_UID: "",
    TRANSACTION_ID: "",
    patientName: "",
    patienDOB: "",
    focal_IOU: "",
    joint_attention_error: "",
    eye_contact_error: "",
    gaze_dispersion: "",
    gaze_speed: "",
    screen_focus: "",
    object_tracking_error: "",
    social_preference: "",
    gaze_holds: "",
    saccades: "",
    lipsync_recog: "",
    convo_recog: "",
    yaw: "",
    pitch: "",
    roll: "",
    ai_report_available: "",
    psychologist_report_available: "",
    psychologistformtestsData: "",
    autismProbability: "",
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
              console.log("psychologist_form_results", results);

              setTestData((prevState) => ({
                ...prevState,
                psychologistformtestsData: results,
              }));

              fetchTestData(patient_uid, transaction_id)
                .then((data) => {
                  console.log('AI results data ', data);

                  setTestData((prevState) => ({
                    ...prevState,
                    featureExtractionTestData: data,
                  }));
                  
                })
                .catch((error) => {
                  console.log("Error fetching test data", error);
                });
            })
            .catch((error) => {
              console.log("Error fetching psychologist form results: ", error);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

      console.log("ai data available = ", aiData.ai_report_available);
      console.log(
        "psychologist data available = ",
        psychologistData.Psychologist_report_available
      );

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

      // const psychologistFormData = {
      //   PATIENT_UID: data.PATIENT_UID,
      //   TRANSACTION_ID: data.TRANSACTION_ID,
      //  Math.round( patientName: data.patientName) || "",
      //  Math.round( patienDOB: data.patientDOB) || "",
      //  Math.round( inclenFormData: data.inclenFormData) || {},
      //  Math.round( isaaFormData: data.isaaFormData) || {},
      //  Math.round( carsFormData: data.carsFormData) || {},
      //  Math.round( dataCollectionMode: data.dataCollectionMode) || [],
      //  Math.round( patienthistoryform1Data: data.patienthistoryform1Data) || "",
      //  Math.round( patienthistoryform2Data: data.patienthistoryform2Data) || "",
      //  Math.round( patienthistoryform3Data: data.patienthistoryform3Data) || "",
      //  Math.round( patienthistoryform4Data: data.patienthistoryform4Data) || "",
      //  Math.round( videolanguage: data.videolanguage) || "",
      //  Math.round( mchatscore: data.mchatscore) || "",
      //  Math.round( carsscore: data.carsscore) || "",
      //  Math.round( isaascore: data.isaascore) || "",
      //  Math.round( inclenscore: data.inclenscore) || "",
      //  Math.round( inclenScores: data.inclenScores) || {},
      //  Math.round( inclenFullScore: data.inclenFullScore) || "",
      //  Math.round( patienthistoryform1data: data.patienthistoryform1data) || {},
      //  Math.round( patienthistoryform2data: data.patienthistoryform2data) || {},
      //  Math.round( patienthistoryform3data: data.patienthistoryform3data) || {},
      //  Math.round( mchatScore: data.mchatScore) || "",
      //  Math.round( patienthistoryform4data: data.patienthistoryform4data) || {},
      // };

      // setTestData((prevData) => ({
      //   ...prevData,
      //   ...psychologistFormData,
      // }));
    } catch (error) {
      console.error("Error fetching psychologist form results:", error);
      // TODO: redirect to error page
    }
  };

  const replaceZeroWithTen = (value) => (value == 0 ? 10 : value);

  // Function to fetch test data
  const fetchTestData = async (patient_uid, transaction_id) => {
    // console.log("Fetching test data...");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_uid, transaction_id }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to fetch ai test data");
        // TODO: redirect to error page
      }
      setTestData({
        PATIENT_UID: data.patient_id || "",
        TRANSACTION_ID: data.transaction_id || "",
        focal_IOU: replaceZeroWithTen(Math.round(data["Focal Point IOU"]) || ""),
        joint_attention_error: replaceZeroWithTen(Math.round(data["Joint Attention Social"]) || ""),
        eye_contact_error: replaceZeroWithTen(Math.round(data["Eye Contact Error"]) || ""),
        gaze_dispersion: replaceZeroWithTen(Math.round(data["Gaze Dispersion"]) || ""),
        gaze_speed: replaceZeroWithTen(Math.round(data["Gaze Speed"]) || ""),
        screen_focus: replaceZeroWithTen(Math.round(data["Screen Focus"]) || ""),
        object_tracking_error: replaceZeroWithTen(Math.round(data["Object Tracking"]) || ""),
        social_preference: replaceZeroWithTen(Math.round(data["Social Preference"]) || ""),
        gaze_holds: replaceZeroWithTen(Math.round(data["Gaze Hold"]) || ""),
        saccades: replaceZeroWithTen(Math.round(data["Saccades"]) || ""),
        lipsync_recog: replaceZeroWithTen(Math.round(data["Lipsync"]) || ""),
        convo_recog: replaceZeroWithTen(Math.round(data["Conversation Recognition"]) || ""),
        yaw: replaceZeroWithTen(Math.round(data["Yaw"]) || ""),
        pitch: replaceZeroWithTen(Math.round(data["Pitch"]) || ""),
        roll: replaceZeroWithTen(Math.round(data["Roll"]) || ""),
        autismProbability: data["autismProbability"] || "",
        TXGB_model_proba: data["TXGB_model_proba"] || undefined,
        etsp_lstm_cnn_model_prediction: data["etsp_lstm_cnn_model_prediction"] || undefined,
      });
      return data;
    } catch (error) {
      console.error("Error fetching test data:", error);
      // TODO: redirect to error page
    }
  };
  // console.log("Testdata at context= ",testData);
  return (
    <AppContext.Provider value={{ testData, setTestData, fetchTestData }}>
      {children}
    </AppContext.Provider>
  );
};
