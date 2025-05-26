import React, { useEffect, useContext, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { AppContext } from "../../AppContext";

const ISAA4 = () => {
  const { testData } = useContext(AppContext);
  var [patientData, setPatientData] = useState({
    socialResponsiveness: 0,
    emotionalResponsiveness: 0,
    speechRecognition: 0,
    behaviouralPattern: 0,
    sensoryAspects: 0,
    cognitiveComponent: 0,
  });

  const ISAAQuestions = [
    // ["Has poor eye contact", "Lacks social smile", "Remains aloof", "Does not reach out to others", "Unable to relate to people", "Unable to respond to social/environmental cues", "Engages in solitary and repetitive play activities", "Unable to take turns in social interaction", "Does not maintain peer relationships"],
    // ["Inconsistent attention and concentration", "Shows delay in responding", "Has unusual memory of some kind", "Has 'savant' ability"],
    // ["Shows inappropriate emotional response", "Shows exaggerated emotions", "Engages in self-stimulating emotions", "Lacks fear of danger", "Excited or agitated for no apparent reason"],
    // ["Acquired speech and lost it", "Has difficulty in using non-verbal language or gestures to communicate", "Engages in stereotyped and repetitive use of language", "Engages in echolalic speech", "Produces infantile squeals/unusual noises", "Unable to initiate or sustain conversation with others", "Uses jargon or meaningless words", "Uses pronoun reversals", "Unable to grasp pragmatics of communication (real meaning)"],
    // ["Engages in stereotyped and repetitive motor mannerisms", "Shows attachment to inanimate objects", "Shows hyperactivity/restlessness", "Exhibits aggressive behavior", "Throws temper tantrums", "Engages in self-injurious behavior", "Insists on sameness"],
    [
      "Unusually sensitive to sensory stimuli",
      "Stares into space for long periods of time",
      "Has difficulty in tracking objects",
      "Has unusual vision",
      "Insensitive to pain",
      "Responds to objects/people unusually by smelling, touching or tasting",
    ],
  ];

  const domainNames = [
    // "Social Relationship and Reciprocity",
    // "Cognitive Component",
    // "Emotional Responsiveness",
    // "Speech, Language, and Communication",
    // "Behavioral Patterns",
    "Sensory Aspects",
  ];

  const formatToOneDecimal = (value) => parseFloat(value).toFixed(1);
  const currentDate = new Date().toLocaleDateString();
  const displayData = () => {
    document.getElementById("isaapatientNamecell").innerText =
      getURLParameter("Name") || "N/A";
    document.getElementById("chronologicalAgecell").innerText =
      (getURLParameter("Age") || "N/A") + " Years";
    document.getElementById("isaascore").innerText = formatToOneDecimal(
      patientData.TOT_ISAA
    );
    document.getElementById("isaaInterpretationmessage").innerText =
      patientData.isaaInterpretation;

    createBarChart(patientData);
  };

  let chartInstance = null; // Store the chart instance globally

  const createBarChart = (data) => {
    const ctx = document.getElementById("barChart").getContext("2d");

    // Destroy existing chart if it exists
    if (chartInstance) {
      console.log("destroying chart instance: ", chartInstance);
      chartInstance.destroy();
    }

    // Create new chart instance
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Social Responsiveness",
          "Emotional Responsiveness",
          "Speech Recognition",
          "Behavioural Pattern",
          "Sensory Aspects",
          "Cognitive Component",
        ],
        datasets: [
          {
            label: "Percentage",
            data: [
              data.socialResponsiveness,
              data.emotionalResponsiveness,
              data.speechRecognition,
              data.behaviouralPattern,
              data.sensoryAspects,
              data.cognitiveComponent,
            ],
            backgroundColor: [
              "#93ef93",
              "#8bd0fa",
              "#b20fa9",
              "#bc81f6",
              "#f7a000",
              "#cbcbcb",
            ],
            borderColor: [
              "#4bc0c0",
              "#36a2eb",
              "#ffce56",
              "#9966ff",
              "#ff9f40",
              "#c9cbcf",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
          },
        },
        plugins: {
          datalabels: {
            color: "white",
            anchor: "center",
            align: "center",
            font: {
              weight: "bold",
              size: 14,
            },
            formatter: (value) => value.toFixed(2),
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  };
  const [responses, setResponses] = useState({});
  const calculateSum = (data, x, y, z) => {
    let sum = 0;
    let jj = 1;
    const newResponses = {};

    for (let i = x; i < y; i++) {
      let value = parseInt(data[i], 10); // Convert string to number
      // console.log("value at index ", i, " = ", value, " with jj= ", jj, " and z= ", z);
      newResponses[`isaa_${z}.${jj}`] = value;
      jj++;
      if (!isNaN(value)) {
        sum += value;
      }
    }

    setResponses((prevResponses) => ({
      ...prevResponses,
      ...newResponses,
    }));

    return sum;
  };

  useEffect(() => {
    // displayData();
    console.log("current debugging", testData);

    if (
      testData.psychologistformtestsData != undefined &&
      testData.featureExtractionTestData != undefined
    ) {
      const isaa_social_responsiveness =
        (calculateSum(
          testData.psychologistformtestsData["isaaFormData"],
          0,
          9,
          1
        ) /
          45) *
        100;

      const isaa_emotional_responsiveness =
        (calculateSum(
          testData.psychologistformtestsData["isaaFormData"],
          9,
          14,
          2
        ) /
          25) *
        100;

      const isaa_speech_recognition =
        (calculateSum(
          testData.psychologistformtestsData["isaaFormData"],
          14,
          23,
          3
        ) /
          45) *
        100;
      const isaa_behavioural_pattern =
        (calculateSum(
          testData.psychologistformtestsData["isaaFormData"],
          23,
          30,
          4
        ) /
          35) *
        100;
      const isaa_sensory_aspects =
        (calculateSum(
          testData.psychologistformtestsData["isaaFormData"],
          30,
          36,
          5
        ) /
          30) *
        100;
      const isaa_cognitive_component =
        (calculateSum(
          testData.psychologistformtestsData["isaaFormData"],
          36,
          40,
          6
        ) /
          20) *
        100;

      const isaascore =
        parseFloat(testData.psychologistformtestsData["isaascore"]) || 0;

      console.log("NEW DEBUGGIN", isaa_social_responsiveness);
      console.log("NEW DEBUGGIN", isaa_emotional_responsiveness);
      console.log("isaa responses", responses);
      console.log(responses[`isaa_1.2`]);

      const isaasInterpretation =
        isaascore === "" || isNaN(isaascore)
          ? ""
          : isaascore < 70
          ? "No Risk of Autism"
          : isaascore <= 106
          ? "Mild Risk of Autism"
          : isaascore <= 153
          ? "Moderate Risk of Autism"
          : "Severe Risk of Autism";

      setPatientData({
        // patientId: testData.PATIENT_UID,
        socialResponsiveness: parseFloat(isaa_social_responsiveness) || 0,
        emotionalResponsiveness: parseFloat(isaa_emotional_responsiveness) || 0,
        speechRecognition: parseFloat(isaa_speech_recognition) || 0,
        behaviouralPattern: parseFloat(isaa_behavioural_pattern) || 0,
        sensoryAspects: parseFloat(isaa_sensory_aspects) || 0,
        cognitiveComponent: parseFloat(isaa_cognitive_component) || 0,
        TOT_ISAA:
          parseFloat(testData.psychologistformtestsData["isaascore"]) || 0,
        isaaInterpretation: isaasInterpretation,
        // name: getURLParameter("Name") || "N/A",
      });
    }
  }, [testData]);
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
      <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen">
        <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
          <div>
            <h1 className="text-left text-sm">
              Indian Scale for Assessment of Autism Report
            </h1>
            <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
          </div>

          <div
            className="container"
            style={{ width: "100%", maxWidth: "800px", margin: "auto" }}
          >
            {/* <h1 style={{paddingBottom: "15px",
            marginLeft:"-23vw",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: "600",
            fontSize: "xx-large",
            color: "#94059f",
            }}>Developmental <span style={{color:"black"}}> Screening:</span>
        </h1>
        <div style={{textAlign:"justify"}}>
                The Indian Scale for Assessment of Autism (ISAA) is a standardized tool designed to evaluate autism
                spectrum disorder (ASD) in children. It assesses social, emotional, communication, behavioral, sensory,
                and cognitive aspects through structured observations and parent interviews. The ISAA score helps
                determine the severity of autism, categorizing it as mild, moderate, or severe. A higher score indicates
                more pronounced autism-related challenges. It is widely used in clinical, research, and diagnostic
                settings in India.
                <br />
                The system provides outputs as <span id="isaaInterpretationmessage"
                    style={{fontSize: "15px", color: "#007bff"}}> {patientData.isaaInterpretation}</span> and the Aignosis ISAA test output was: <span id='isaascore'
                    style={{fontSize: "xx-large", color: "#007bff"}}>{patientData.TOT_ISAA}</span> 
                <br /><br />
        </div>
        
        <div id="patientData" style={{fontSize:"larger"}}>
          <div><span className="label" >Patient Name:</span> <span id="isaapatientNamecell"></span></div>
          <div><span className="label">Age:</span> <span id="chronologicalAgecell"></span></div>
        </div>
        <br /><br />
        <canvas id="barChart"></canvas>
        <br /><br />
        <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{patientData.TOT_ISAA} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="isaaInterpretationmessage">{patientData.isaaInterpretation}</span></p>

        <br /><br /><br /><br />
         */}
            <br />
            <br />
            {domainNames.map((domain, index) => (
              <div key={index}>
                <h2 className="section-title">{domain}</h2>
                <center>
                  <table border="1" width="80%">
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid #d1d5db",
                            borderLeft: "0px",
                            padding: "8px",
                          }}
                        >
                          Question
                        </th>
                        <th
                          style={{
                            border: "1px solid #d1d5db",
                            borderLeft: "0px",
                            borderRight: "0px",
                            padding: "8px",
                          }}
                        >
                          Response
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ISAAQuestions[index].map((question, qIndex) => (
                        <tr key={qIndex}>
                          <td
                            style={{
                              border: "1px solid #d1d5db",
                              borderLeft: "0px",
                              padding: "8px",
                            }}
                          >
                            {question}
                          </td>
                          <td
                            style={{
                              border: "1px solid #d1d5db",
                              borderLeft: "0px",
                              borderRight: "0px",
                              padding: "8px",
                            }}
                          >
                            {responses[`isaa_${index + 1}.${qIndex + 1}`] ||
                              "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  <br />
                </center>
              </div>
            ))}
            <center>
              <table
                border="4"
                style={{
                  width: "50%",
                  textAlign: "center",
                  marginTop: "10px",
                  border: "1px solid #d1d5db",
                  padding: "8px",
                }}
              >
                <tr>
                  <th
                    style={{
                      border: "1px solid #d1d5db",
                      borderLeft: "0px",
                      borderRight: "0px",
                      padding: "8px",
                    }}
                  >
                    Score Range
                  </th>
                  <th
                    style={{
                      border: "1px solid #d1d5db",
                      borderRight: "0px",
                      padding: "8px",
                    }}
                  >
                    Classification
                  </th>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #d1d5db",
                      borderLeft: "0px",
                      padding: "8px",
                    }}
                  >
                    &lt; 70
                  </td>
                  <td
                    style={{
                      border: "1px solid #d1d5db",
                      borderRight: "0px",
                      padding: "8px",
                    }}
                  >
                    Normal
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #d1d5db",
                      borderLeft: "0px",
                      padding: "8px",
                    }}
                  >
                    70 - 105
                  </td>
                  <td
                    style={{
                      border: "1px solid #d1d5db",
                      borderRight: "0px",
                      padding: "8px",
                    }}
                  >
                    Mild Autism
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #d1d5db",
                      borderLeft: "0px",
                      padding: "8px",
                    }}
                  >
                    106 - 153
                  </td>
                  <td
                    style={{
                      border: "1px solid #d1d5db",
                      borderRight: "0px",
                      padding: "8px",
                    }}
                  >
                    Moderate Autism
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #d1d5db",
                      borderLeft: "0px",
                      padding: "8px",
                    }}
                  >
                    &gt; 153
                  </td>
                  <td
                    style={{
                      border: "1px solid #d1d5db",
                      borderRight: "0px",
                      padding: "8px",
                    }}
                  >
                    Severe Autism
                  </td>
                </tr>
              </table>
            </center>
            <br />
            <br />
            <h2 style={{ textAlign: "left" }}>
              ISAA Score: <span id="isaascore">{patientData.TOT_ISAA} </span>
            </h2>
            <p style={{ textAlign: "left" }}>
              Interpretation:{" "}
              <span id="isaaInterpretationmessage">
                {patientData.isaaInterpretation}
              </span>
            </p>

            {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
            <div className="w-full flex justify-between items-center text-xs font-manrope mt-60 border-t-2 border-[#800080] pt-2">
              <span className="text-[10px]">
                ISAA Report - {patientData.name}
              </span>
              <div className="text-center text-[10px]">
                {/* <span></span>
                <br />
                <span>ID: Report Generation Date: {currentDate}</span> */}
              </div>
              <span className="text-[10px]">Page 11</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ISAA4;
