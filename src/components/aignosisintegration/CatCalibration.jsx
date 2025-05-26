// CatCalibration.jsx updated

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";
// import "bootstrap/dist/css/bootstrap.min.css";
import BeatLoader from "react-spinners/BeatLoader"; // Ensure you import the BeatLoader component

import {
  encryptCalibrationData,
  encryptPassword,
} from "./components/utils/EncryptionUtils";
import { AppContext } from "./AppContext";
import { useContext } from "react";

const CatCalibration = () => {
  const SERVER_MIDDLEWARE_URL = "https://de.aignosismdw.in/rest/calibration/data/";
  // const SERVER_MIDDLEWARE_URL = 'http://127.0.0.1:8000/rest/calibration/data/';

  const { testData } = useContext(AppContext);

  const [startTime, setStartTime] = useState();
  const [frameCaptureInterval, setFrameCaptureInterval] = useState();
  const [frames, setFrames] = useState([]);
  const [isCircleVisible, setIsCircleVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State for managing loading spinner

  const [currentCircleIndex, setCurrentCircleIndex] = useState(0);
  const [parentDimensions, setParentDimensions] = useState([0, 0]);

  const [videoResolution, setVideoResolution] = useState([640, 480]); // Static resolution for sample images

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [clickTimes, setClickTimes] = useState([]);
  const parentRef = useRef(null);

  const navigate = useNavigate();

  const circleCoordinates = [
    [window.innerWidth / 2, window.innerHeight / 2], // center
    [50, 50], // left top
    [50, window.innerHeight / 2], // left mid
    [50, window.innerHeight - 100], // left bottom
    [window.innerWidth - 100, 50], // right top
    [window.innerWidth - 100, window.innerHeight / 2], // right mid
    [window.innerWidth - 100, window.innerHeight - 100], // right bottom
    [window.innerWidth / 2, 50], // mid top
    [window.innerWidth / 2, window.innerHeight - 100], // mid bottom
  ];
  const audio = new Audio(`/CatMeow.mp3?timestamp=${Date.now()}`); // Path to your audio file
  useEffect(() => {
    const handleAudioPlay = () => {
      audio.loop = true; // Enable looping
      audio.play().catch((error) => console.error("Audio play error:", error));
    };

    audio.addEventListener("canplaythrough", handleAudioPlay);
    console.log("cat calibration TEST DATA", testData);

    // Get the webcam stream and metadata on mount
    window.history.pushState(null, null, window.location.href);

    const handleBackButton = () => {
      navigate("/calibrationpage"); // Redirect to calibration page
    };

    // Listen for the popstate event
    window.addEventListener("popstate", handleBackButton);

    if (parentRef.current) {
      const { clientWidth, clientHeight } = parentRef.current;
      setParentDimensions([clientWidth, clientHeight]);
    }

    const startWebcam = async () => {
      if (!navigator.mediaDevices.getUserMedia) {
        console.error("getUserMedia not supported");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;

        const handleMetadata = () => {
          const width = videoRef.current.videoWidth;
          const height = videoRef.current.videoHeight;
          setVideoResolution([width, height]);
        };

        videoRef.current.onloadedmetadata = handleMetadata;
      } catch (error) {
        console.error("Webcam start error:", error);
      }
    };

    startWebcam();
    return () => {
      window.removeEventListener("popstate", handleBackButton);
      audio.pause();
    };
  }, [navigate]);

  const handleNextButtonClick = () => {
    audio.pause();
    // audio.currentTime = 0; // Reset audio
    // audio.pause();
    // audio.currentTime = 0; // Reset audio
    navigate("/test/fillup");
  };

  const captureFrame = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const frameData = canvas.toDataURL("image/jpeg");
      return frameData;
    } else {
      console.warn("Frame capture failed: canvasRef or videoRef is null");
      // TODO: send back to take assignment page, with alert saying some error occurred
    }
  };

  const handleCircleClick = async () => {
    if (currentCircleIndex === 0) {
      setStartTime(Date.now());
      setClickTimes((clicktimes) => [...clicktimes, 0.0]);
      setFrameCaptureInterval(
        setInterval(() => {
          const frameData = captureFrame();
          setFrames((prevFrames) => [...prevFrames, frameData]);
        }, 33) // Adjusted to 33ms for ~30 fps
      );
      setCurrentCircleIndex(currentCircleIndex + 1);
    } else if (
      currentCircleIndex < circleCoordinates.length - 1 &&
      currentCircleIndex > 0
    ) {
      setClickTimes((clicktimes) => [
        ...clicktimes,
        (Date.now() - startTime) / 1000,
      ]);
      setCurrentCircleIndex(currentCircleIndex + 1);
    } else {
      // THIS IS THE FINAL CAT / DOG CLICK
      audio.loop = false;
      audio.pause();
      audio.currentTime = 0; // Reset audio

      setClickTimes((clicktimes) => [
        ...clicktimes,
        (Date.now() - startTime) / 1000,
      ]);
      var finalClickTimes = [...clickTimes, (Date.now() - startTime) / 1000];
      setIsCircleVisible(false);

      const timeElapsed = (Date.now() - startTime) / 1000;
      let fps = parseInt(
        (frames.length / parseInt(timeElapsed.toString())).toString()
      );

      const calibrationData = {
        patient_uid: testData.PATIENT_UID,
        transaction_id: testData.TRANSACTION_ID,
        camera_resolution: {
          width: videoResolution[0],
          height: videoResolution[1],
        },
        screen_resolution: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        debug: true,
      };

      var calibration_points = [];
      for (let i = 0; i < finalClickTimes.length; i++) {
        let currentClickFramesList = [];
        let frameRangeStartIndex = Math.floor(fps * finalClickTimes[i]);
        currentClickFramesList.push({
          timestamp: finalClickTimes[i],
          frame: frames[frameRangeStartIndex],
        });
        currentClickFramesList.push({
          timestamp: finalClickTimes[i] + 1 / fps,
          frame: frames[frameRangeStartIndex + 1],
        });
        calibration_points.push({
          point: {
            x: circleCoordinates[i][0],
            y: circleCoordinates[i][1],
            final: i === finalClickTimes.length - 1,
          },
          frames: currentClickFramesList,
        });
      }

      console.log(
        `FINAL CALIBRATION DATA BEFORE ENCRYPTION: ${JSON.stringify(
          calibrationData
        )}`
      ); // Fixed template literal

      // ENCRYPTION STARTS HERE

      async function processAndSendData() {
        setIsLoading(true); // Show spinner

        try {
          const aesKey = Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

          const encryptedCalibrationPoints = await encryptCalibrationData(
            calibration_points,
            aesKey
          ).catch((error) => {
            console.error("Failed to encrypt calibration points:", error);
            throw error;
          });

          const encryptedKey = await encryptPassword(aesKey).catch((error) => {
            console.error("Failed to encrypt password:", error);
            throw error;
          });

          // Create final data object
          const finalCalibrationData = {
            ...calibrationData,
            encrypted_calibration_points: encryptedCalibrationPoints,
            encrypted_Key: encryptedKey,
          };

          // Convert to string and send
          const calibrationDataString = JSON.stringify(finalCalibrationData);
          console.log(`FINAL CALIBRATION DATA: ${calibrationDataString}`); // Fixed template literal

          return axios
            .request({
              method: "POST",
              url: SERVER_MIDDLEWARE_URL,
              data: calibrationDataString,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              setIsLoading(false); // Hide spinner

              console.log(response.status);
              if (response.status !== 200) {
                navigate("/Error Page"); // Navigate to Error Page if status code is not 200
              }
            });
        } catch (error) {
          console.error("Processing error:", error);
          navigate("/Error");
          //   throw error;
          console.log(error);
        } finally {
          setIsLoading(false); // Ensure spinner is hidden in case of errors
        }
        // setIsLoading(false); // Ensure spinner is hidden in case of errors
      }

      processAndSendData()
        .then((response) => {
          clearInterval(frameCaptureInterval);
          console.log("Frame capturing stopped");
          console.log(response);
        })
        .catch((err) => {
          clearInterval(frameCaptureInterval);
          console.log("Frame capturing stopped");
          console.log(err);
        });
    }
  };

  return (
    <div
      id="parent-container"
      ref={parentRef}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1b0c26",
      }}
    >
      {isCircleVisible &&
        parentDimensions[0] > 0 &&
        parentDimensions[1] > 0 && (
          <Circle
            onClickHandler={handleCircleClick}
            x={circleCoordinates[currentCircleIndex][0]}
            y={circleCoordinates[currentCircleIndex][1]}
            radius={50}
            imageUrl="/catface.webp"
          />
        )}

      {/* Conditionally render spinner or button */}
      {!isCircleVisible &&
        (isLoading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <BeatLoader color="#ffffff" size={15} />
            <br />
            <p
              className="mt-4"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(138, 0, 194, 0.6)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "25px",
                border: "none",
                fontSize: "32px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {" "}
              Calibrating
            </p>
          </div>
        ) : (
          <button
            className="mt-4"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "transparent", // Transparent background
              color: "white",
              padding: "12px 24px",
              borderRadius: "50px", // Elliptical shape
              border: "2px solid white", // White border
              fontSize: "32px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        ))}
      <div style={{ display: "none", flex: 1 }}>
        <video ref={videoRef} autoPlay playsInline></video>
      </div>
      <canvas ref={canvasRef} style={{ flex: 1, display: "none" }} />
    </div>
  );
};

export default CatCalibration;
