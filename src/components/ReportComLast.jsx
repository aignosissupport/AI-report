import React, { useContext, useEffect } from "react";
import Page1 from "./ReportPages/page1";
import Page2 from "./ReportPages/page2";
import Page3 from "./ReportPages/page3";
// import { useLocation } from 'react-router-dom';

import { AppContext } from "../AppContext";

const ReportComLast = () => {
  const { testData } = useContext(AppContext);
  //  const location = useLocation();
  //     const getQueryParams = (search) => {
  //       const params = new URLSearchParams(search);
  //       return {
  //         dob: params.get("patientDOB"),
  //         name: params.get("name"),
  //       };
  //     };

  // const {dob, name } = getQueryParams(location.search);
  const ProgressBar = ({ label, value, customClass, barColor = "#562b7f" }) => {
    return (
      <div className="progress-bar" style={{ width: "30vw" }}>
        {" "}
        {/* Increased width */}
        <div
          className="bar"
          style={{ backgroundColor: barColor, height: "30px" }}
        >
          {" "}
          {/* Decreased height */}
          <div
            className={customClass || "fill"}
            style={{ width: value, height: "100%" }}
          >
            <div className={"percentage-circle"} style={{ height: "90%" }}>
              {value}
            </div>
            <div className="label">{label}</div>
          </div>
        </div>
      </div>
    );
  };

  // console.log(useContext(AppContext));
  // const { testData, fetchTestData } = useContext(AppContext);
  let name = testData.name;
  useEffect(() => {
    console.log("YEs");
    // fetchTestData('e0408f60-c3a5-42f9-b98e-c2ec5969df4b', '612325cb-1373-4f86-9064-b6ff4185facb');
  }, []);
  // console.log(testData);
  return (
    <div className="">
      <Page1 />
      {/* <Page2 /> */}
      {/* <Page3 /> */}
      <div className="w-full h-auto font-manrope flex p-[4vw] justify-center items-center bg-new-gradient">
        <div className="w-[85%] h-[90%] rounded-3xl bg-[#FFF9F8] p-6 shadow-lg">
          <table className="w-full table-auto text-center">
            <thead className="text-center">
              <tr className="text-left font-raleway text-g h-[2vw]ray-600">
                <th className="py-[2.5vw] px-6 mt-[4vw]  border-b font-bold  text-2xl border-r text-center border-gray-300">
                  Subskill
                </th>
                <th className="py-[2.5vw] px-6 mt-[4vw] border-b font-bold text-2xl border-r text-center border-gray-300">
                  Performance
                </th>
                <th className="py-[2.5vw] text-center mt-[4vw]  font-bold  text-2xl border-b px-6">
                  Results
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="1 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Facing Forward: <br />
                  <span className="text-wrap font-normal">
                    Measures the percentage of overlap between a child's gaze
                    and predefined focus points in video modules, using gaze
                    heatmaps to identify focal areas.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar label="" value={testData.focal_IOU + "%"} />
                </td>
                <td className="py-4 px-[5vw]">
                  Measures the percentage of overlap between a child's gaze and
                  predefined focus points in video modules, using gaze heatmaps
                  to identify focal areas.
                </td>
              </tr>
              <tr className="2 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Joint Attention:
                  <br />
                  <span className="text-wrap font-normal">
                    Percentage of time the child gazed at the social half of the
                    screen and the concentration of gaze on specific elements
                    like people or toys.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar
                    label=""
                    value={testData.joint_attention_error + "%"}
                  />
                </td>
                <td className="py-4 px-[5vw]">
                  Measures the percentage of overlap between a child's gaze and
                  predefined focus points in video modules, using gaze heatmaps
                  to identify focal areas.
                </td>
              </tr>
              <tr className="3 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Gaze Dispersion:
                  <br />
                  <span className="text-wrap font-normal">
                    Evaluates the spread of gaze across the screen, reflecting
                    the extent of visual exploration when the child is focused
                    on the screen.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar
                    label=""
                    value={testData.gaze_dispersion + "%"}
                  />
                </td>
                <td className="py-4 px-[5vw]">
                  Evaluates the spread of gaze across the screen, reflecting the
                  extent of visual exploration when the child is focused on the
                  screen.
                </td>
              </tr>
              <tr className="4 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Gaze Speed:
                  <br />
                  <span className="text-wrap font-normal">
                    Measures the average speed of eye movements while the child
                    maintains focus on the screen.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar label="" value={testData.gaze_speed + "%"} />
                </td>
                <td className="py-4 px-[5vw]">
                  Measures the average speed of eye movements while the child
                  maintains focus on the screen.
                </td>
              </tr>
              <tr className="5 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Screen Focus:
                  <br />
                  <span className="text-wrap font-normal">
                    Determines the percentage of time the child looks at the
                    screen with open eyes, steady gaze, and minimal head
                    movement.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar label="" value={testData.screen_focus + "%"} />
                </td>
                <td className="py-4 px-[5vw]">
                  Determines the percentage of time the child looks at the
                  screen with open eyes, steady gaze, and minimal head movement.
                </td>
              </tr>
              <tr className="6 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Object Tracking Error:
                  <br />
                  <span className="text-wrap font-normal">
                    Calculates the percentage of deviation in a child’s gaze
                    from a moving object on the screen, assessing tracking
                    accuracy.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar
                    label=""
                    value={testData.object_tracking_error + "%"}
                  />
                </td>
                <td className="py-4 px-[5vw]">
                  Calculates the percentage of deviation in a child’s gaze from
                  a moving object on the screen, assessing tracking accuracy.
                </td>
              </tr>
              <tr className="7 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Gaze Holds
                  <br />
                  <span className="text-wrap font-normal">
                    Identifies moments when a child's gaze remains within a
                    small area on the screen, indicating sustained visual
                    attention.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar label="" value={testData.gaze_holds + "%"} />
                </td>
                <td className="py-4 px-[5vw]">
                  Identifies moments when a child's gaze remains within a small
                  area on the screen, indicating sustained visual attention.
                </td>
              </tr>
              <tr className="8 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Saccades:
                  <br />
                  <span className="text-wrap font-normal">
                    Measures the frequency of rapid eye movements (saccades) per
                    second, reflecting shifts in focus.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar label="" value={testData.saccades + "%"} />
                </td>
                <td className="py-4 px-[5vw]">
                  Measures the frequency of rapid eye movements (saccades) per
                  second, reflecting shifts in focus.
                </td>
              </tr>
              <tr className="9 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Head Movement:
                  <br />
                  <span className="text-wrap font-normal">
                    Analyzes head movement patterns during video viewing to
                    assess attentional engagement and postural stability.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar
                    label=""
                    value={testData.eye_contact_error + "%"}
                  />
                </td>
                <td className="py-4 px-[5vw]">
                  Analyzes head movement patterns during video viewing to assess
                  attentional engagement and postural stability.
                </td>
              </tr>
              <tr className="10 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Social Preference:
                  <br />
                  <span className="text-wrap font-normal">
                    Calculates the percentage of time spent looking at social
                    elements (e.g., faces or people) compared to non-social
                    elements (e.g., objects or background).
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar
                    label=""
                    value={testData.social_preference + "%"}
                  />
                </td>
                <td className="py-4 px-[5vw]">
                  Calculates the percentage of time spent looking at social
                  elements (e.g., faces or people) compared to non-social
                  elements (e.g., objects or background).
                </td>
              </tr>
              <tr className="11 border-b border-gray-200">
                <td className="py-4 px-[5vw] border-r border-gray-300 font-semibold">
                  Name Call:
                  <br />
                  <span className="text-wrap font-normal">
                    Evaluates the child's response when their name is called,
                    indicating social awareness and auditory attention.
                  </span>
                </td>
                <td className="py-4 px-[3vw] border-r border-gray-300">
                  <ProgressBar label="" value={testData.convo_recog + "%"} />
                </td>
                <td className="py-4 px-[5vw]">
                  Evaluates the child's response when their name is called,
                  indicating social awareness and auditory attention.
                </td>
              </tr>
              {/* <tr className='12 border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Emotions Mirroring:<br />
                                    <span className='text-wrap font-normal'>Measures how accurately a child mimics emotions displayed in the video modules, reflecting emotional resonance.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'>
                                    
                                    
                                    <ProgressBar label="" value={testData.eye_contact_error+"%"} />
                                    
                                    </td>
                                <td className='py-4 px-[5vw]'>Measures how accurately a child mimics emotions displayed in the video modules, reflecting emotional resonance.</td>
                            </tr> */}
              {/* <tr className='13 border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Emotions Range:<br />
                                    <span className='text-wrap font-normal'>Assesses the variety of emotions expressed by the child throughout the video viewing, indicating emotional responsiveness.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'>
                                    
                                    
                                    <ProgressBar label="" value={testData.eye_contact_error+"%"} />
                                    
                                    </td>
                                <td className='py-4 px-[5vw]'>Assesses the variety of emotions expressed by the child throughout the video viewing, indicating emotional responsiveness.</td>
                            </tr>
                            <tr className='14 border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Pointing: <br />
                                    <span className='text-wrap font-normal'>Observes the child’s use of pointing to direct attention or indicate interest, a key aspect of nonverbal communication and joint attention.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'>
                                    
                                    
                                    <ProgressBar label="" value={testData.eye_contact_error+"%"} />
                                    
                                    </td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr> */}
              {/* <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr>
                            <tr className='border-b border-gray-200'>
                                <td className='py-4 px-[5vw] border-r border-gray-300 font-semibold'>Facing Forward: <br />
                                    <span className='text-wrap font-normal'>Percentage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</span></td>
                                <td className='py-4 px-[3vw] border-r border-gray-300'><div className='w-[18vw] h-[2vw] rounded-full bg-red-300'>
                                    <div className="flex w-[11vw] justify-end items-end h-full rounded-full bg-[#F32A2A]">
                                        <div className='flex justify-center text-sm items-center w-[2vw] h-[2vw] rounded-full bg-white'>
                                            <h1>33%</h1>
                                        </div>
                                    </div>
                                </div></td>
                                <td className='py-4 px-[5vw]'>Perce ntage of time the child faced the screen with open eyes, steady gaze, and stable face; used as a proxy for attention to the movies.</td>
                            </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full h-[30vw] bg-[#43284c] flex-col flex justify-center items-center text-justify">
        <h1 className="text-white font-Cormorant text-7xl font-semibold">
          Thank You !
        </h1>
        <div className="flex w-[60vw] mt-[3vw] gap-[4vw] justify-center items-center">
          {/* <div className="w-[15vw] h-[15vw] bg-slate-300"></div> */}
          <div className="w-[50%] text-base text-white font-montserrat ">
            <h1>
              Thank you for conducting the developmental screening for <br />{" "}
              <center>
                {" "}
                <span className="font-bold text-3xl">{name}</span>{" "}
              </center>
            </h1>
            <h1 className="mt-4">
              Your thorough assessment and careful observation have provided
              valuable insights into his abilities across key areas. We greatly
              appreciate your time, effort, and expertise in ensuring a
              comprehensive evaluation.{" "}
            </h1>
            <h1 className="mt-4">
              Your dedication to this process is truly commendable, and we are
              grateful for your contribution to {name}'s growth and development.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportComLast;
