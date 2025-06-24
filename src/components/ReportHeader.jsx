import { useContext } from "react";
import { AppContext } from "../AppContext";

const AIGNOSIS_LOGO = "/aignosislogo.png";

const ReportHeader = () => {
  const { clinicLogo } = useContext(AppContext);

  return (
    <div className="absolute flex justify-between items-center w-full left-0 top-0 z-50 bg-transparent p-2">
       {clinicLogo && (
        <>
         <img src={clinicLogo} alt="Clinic Logo" style={{ height: 60, maxWidth: 180, objectFit: "contain" }} />
         <img src={AIGNOSIS_LOGO} alt="Aignosis Logo" style={{ height: 60 }} />
        </>
      ) }
    </div>
  );
};

export default ReportHeader;
