import React, { useContext } from 'react';
import img1 from "../../assets/report/img4.png";
import img2 from "../../assets/report/img5.png";
import img3 from "../../assets/report/img6.png";
import { AppContext } from "../../AppContext";

const Page3 = () => {
    const getURLParameter = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
      };
    const { testData } = useContext(AppContext);
    const name=getURLParameter("name") || "";
    const {timestamp}=getURLParameter("timestamp") || "";

    const tableData = [
        {
            subskill: "Social Preference",
            description: "Indicates focus on social stimuli (people) over non-social elements, reflecting social interest levels.",
            percentage: testData.social_preference,
            color: "bg-[#4CAF50]",
            explain: "Shows strong social preference, suggesting healthy social engagement."
        },
        {
            subskill: "Eye Contact",
            description: "Tracks frequency and duration of eye contact, showing comfort with social interaction.",
            percentage: 100-testData.eye_contact_error,
            color: "bg-[#66BB6A]",
            explain: "Maintains good eye contact, indicating responsiveness in social interactions."
        },
        {
            subskill: "Joint Attention",
            description: "Measures shared focus on an object or event with another person, a key skill for early communication.",
            percentage: 100-testData.joint_attention_error,
            color: "bg-[#FFC107]",
            explain: "Easily engages in joint attention, suggesting strong foundational communication skills."
        },
        {
            subskill: "Gaze Hold",
            description: "Indicates duration of gaze on an object, reflecting attentiveness and sustained focus.",
            percentage: testData.gaze_holds,
            color: "bg-[#66BB6A]",
            explain: "Demonstrates sustained attention, indicating interest in surroundings."
        },
        {
            subskill: "Gaze Speed",
            description: "Assesses the speed of gaze shifts, which is associated with attentiveness and visual processing.",
            percentage: testData.gaze_speed,
            color: "bg-[#FFC107]",
            explain: "Displays typical gaze speed, reflecting balanced visual responsiveness."
        },
        {
            subskill: "Attention Shift Frequency",
            description: "Frequency of attention shifts, suggesting cognitive flexibility and engagement.",
            percentage: testData.saccades,
            color: "bg-[#66BB6A]",
            explain: "Balanced shift frequency, suggesting natural curiosity and engagement."
        },
        {
            subskill: "Gaze Stability",
            description: "Measures spread of gaze across different areas, showing exploration and focus distribution.",
            percentage: testData.gaze_dispersion,
            color: "bg-[#4CAF50]",
            explain: "Distributes gaze well, indicating healthy exploration of surroundings."
        },
        {
            subskill: "Focal Points",
            description: "Measures preference for gaze points, such as faces and social interactions.",
            percentage: testData.focal_IOU,
            color: "bg-[#66BB6A]",
            explain: "Focuses on multiple points, showing curiosity and attention to detail."
        },
        {
            subskill: "Screen Focus",
            description: "Measures screen fixation to typical engagement levels, assessing attentional stability.",
            percentage: testData.screen_focus,
            color: "bg-[#66BB6A]",
            explain: "Maintains attention on visual tasks, indicating good focus abilities."
        },
        {
            subskill: "Object Tracking",
            description: "Observes ability to follow moving objects for visual-motor coordination.",
            percentage: 100-testData.object_tracking_error,
            color: "bg-[#FFC107]",
            explain: "Tracks objects smoothly, indicating typical visual-motor coordination skills."
        }
    ];
    

    return (
        <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen">
            <div className="pdf-page bg-white p-8 shadow-md rounded-md flex justify-center items-center w-[210mm] h-[297mm] relative">
                {/* Header */}
                <div className="absolute p-8 top-0 left-0 w-full">
                    <h1 className="text-center text-base font-bold">Feature Analysis Table</h1>
                    <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
                </div>

                {/* Table */}
                <div className="w-full border rounded-3xl p-4 border-[#CDAAE0] font-manrope">
                    <h3 className='text-center text-sm font-bold mb-5'></h3>
                    <table className="w-full border-collapse">
                        {/* Table Header */}
                        <thead>
                            <tr className="text-left">
                                <th className="p-2 text-[12px] border-r font-lg border-b border-gray-300 text-center">Feature</th>
                                <th className="p-2 text-[12px] border-r font-lg border-b border-gray-300 text-center">Percentile</th>
                                <th className="p-2 text-[12px] font-lg border-b border-gray-300 text-center">Explanation</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-300 ]">
                                    {/* Subskill */}
                                    <td className="p-2.5 text-[10px] text-gray-800 w-[35%] font-semibold border-r border-gray-300">
                                        {row.subskill}
                                        <br />
                                        <span className="font-normal text-gray-600 text-[12px]">{row.description}</span>
                                    </td>
                                    {/* Performance */}
                                    <td className="py-6 px-6 text-center w-[30%] border-r border-gray-300">
                                        <div className="w-[80%] h-5 mx-auto rounded-full bg-gray-200">
                                            <div className={`flex justify-end items-center h-full rounded-full ${row.color}`} style={{ width: `${row.percentage < 75 ? row.percentage + 15 : row.percentage}%` }}>
                                                <div className="flex justify-center items-center w-6 h-6 rounded-full bg-gray-100 text-[0.5rem] font-bold shadow-md">
                                                    {row.percentage}%
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Results */}
                                    <td className="py-4 px-4 text-[8px] text-gray-800 w-[35%]">{row.explain}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                            
                {/* Footer */}
                <div className="absolute p-8 bottom-0 left-0 w-full">
                    <br />
                    <div className="w-full flex justify-between items-center text-xs font-manrope mt-10 border-t-2 border-[#800080] pt-2">
                        <span className="text-[10px]">{name}</span>
                        <div className="text-center text-[10px]">
                            {/* <span>Received Date: {timestamp}</span>
                            <br />
                            <span>ID: Report Generation Date:</span> */}
                        </div>
                        <span className="text-[10px]">Page 07</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page3;
