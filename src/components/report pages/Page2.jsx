import React from 'react'
import img1 from "../../assets/report/img4.png"
import img2 from "../../assets/report/img5.png"
import img3 from "../../assets/report/img6.png"

const Page2 = () => {
    const progressData = [
        { label: 'Name Call Response', value: 82 },
        { label: 'developmental Skills Summar', value: 76 },
        // { label: 'Visual Interest Response', value: 73 },
        // { label: 'Audio and Speech Response', value: 70 },
    ];

    const progressData2 = [
        { label: 'Eye Area Expressivity', value: 82 },
        { label: 'Lower Face Expressivity', value: 76 },
    ];
    const progressData3 = [
        { label: 'Emotional Range', value: 80 },
        { label: 'Emotion Mirroring Score', value: 78 },
    ];
    return (
        <div className=" pdf-image flex flex-col font-manrope items-center p-8 bg-white  min-h-screen">
            <div className="pdf-page bg-white p-8  rounded-md w-[210mm] m-auto h-[297mm] relative">
                <div className="absolute p-8 top-0 left-0 w-full">
                    <h1 className='text-left text-sm'>Detailed Featured report</h1>
                    <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
                </div>
                <h3 className='text-center font-playfair mt-[8%] font-semibold '>Developmental Skills Summary</h3>
                <div className="w-full justify-center font-playfair mt-8 font-semibold gap-5 px-5 items-center flex">
                    <div className="w-[50%] justify-center font-playfair mt-2 font-semibold items-center flex">
                        <div className="w-[10vw] flex flex-col justify-center items-center">
                            <img src={img2} alt="" />
                            <div className="w-[12vw] p-4 h-[8vw] bg-[#EC9D14] flex flex-col items-center justify-center rounded-3xl">
                                <h4 className='text-center'>Audio and Speech Response</h4>
                                <h4>77.6%</h4>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full h-full flex-col">
                        {progressData.map((item, index) => (
                            <div key={index} className="w-full h-[4vh] bg-[#F3CB2C6B] rounded-full mb-2">
                                <div
                                    className="h-full bg-[#EC9D14] rounded-full flex justify-between items-center p-1"
                                    style={{ width: `${item.value}%` }}
                                >
                                    <div>
                                        <h4 className="text-xs text-white ml-3">{item.label}</h4>
                                    </div>
                                    <div className="w-6 h-6 bg-white rounded-full flex justify-center items-center">
                                        <h5 className="text-[10px] text-[#EC9D14] font-raleway">{item.value}%</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full justify-center font-playfair mt-[2vw] font-semibold gap-5 px-5 items-center flex">
                    <div className="w-[50%] justify-center font-playfair mt-2 font-semibold items-center flex">
                        <div className="w-[10vw] flex flex-col justify-center items-center">
                            <img src={img3} alt="" />
                            <div className="w-[12vw] p-4 h-[8vw] bg-[#6B88FB] flex flex-col items-center justify-center rounded-3xl">
                                <h4 className='text-center'> Facial Muscular Response</h4>
                                <h4>79%</h4>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full h-full flex-col">
                        {progressData2.map((item, index) => (
                            <div key={index} className="w-full h-[4vh] bg-[#A8ADB3] rounded-full mb-2">
                                <div
                                    className="h-full bg-[#6B88FB] rounded-full flex justify-between items-center p-1"
                                    style={{ width: `${item.value}%` }}
                                >
                                    <div>
                                        <h4 className="text-xs text-white ml-3">{item.label}</h4>
                                    </div>
                                    <div className="w-6 h-6 bg-white rounded-full flex justify-center items-center">
                                        <h5 className="text-[10px] text-[#6B88FB] font-raleway">{item.value}%</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full justify-center font-playfair mt-[2vw] font-semibold gap-5 px-5 items-center flex">
                    <div className="w-[50%] justify-center font-playfair mt-2 font-semibold items-center flex">
                        <div className="w-[10vw] flex flex-col justify-center items-center">
                            <img src={img3} alt="" />
                            <div className="w-[12vw] p-4 h-[8vw] bg-[#19C18C] flex flex-col items-center justify-center rounded-3xl">
                                <h4 className='text-center'> Emotional and Mirroring Response</h4>
                                <h4>79%</h4>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full h-full flex-col">
                        {progressData3.map((item, index) => (
                            <div key={index} className="w-full h-[4vh] bg-[#19C18C5E] rounded-full mb-2">
                                <div
                                    className="h-full bg-[#19C18C] rounded-full flex justify-between items-center p-1"
                                    style={{ width: `${item.value}%` }}
                                >
                                    <div>
                                        <h4 className="text-xs text-white ml-3">{item.label}</h4>
                                    </div>
                                    <div className="w-6 h-6 bg-white rounded-full flex justify-center items-center">
                                        <h5 className="text-[10px] text-[#19C18C] font-raleway">{item.value}%</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute p-8 bottom-0 left-0 w-full">
                    <div className="w-full bottom-0 left-0 flex justify-between items-center text-xs font-manrope mt-10 border-t-2 border-[#800080] pt-2">
                        <span className='text-[10px]'>Sample</span>
                        <div className="text-center text-[10px]">
                            {/* <span>Received Date: 2023-07-28 17:22:09</span>
                            <br />
                            <span>ID: Report Generation Date:</span> */}
                        </div>
                        <span className='text-[10px]'>Page 07</span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Page2