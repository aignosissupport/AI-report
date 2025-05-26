import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router, Route, and Routes
import Report from "./components/ReportPages/page1";
import ReportComLast from "./components/ReportComLast";
import { AppProvider } from "./AppContext"; // Import AppProvider
import ResultsPage from "./components/ResultsPage";
import GeneratePDF from "./components/report pages/GeneratePDF";
import Page5 from "./components/report pages/Page5";
import Page4 from "./components/report pages/Page4";
import Page3 from "./components/report pages/Page3";
import Page2 from "./components/report pages/Page2";
import Page1 from "./components/report pages/Page1";
import ISAA from "./components/report pages/isaa";
import ISAA2 from "./components/report pages/isaa2";
import ISAA3 from "./components/report pages/isaa3";
import ISAA4 from "./components/report pages/isaa4";
import MCHAT from "./components/report pages/mchat";
import MCHAT2 from "./components/report pages/mchat2";
import MCHAT3 from "./components/report pages/mchat3";
import CARS from "./components/report pages/cars";
import CARS2 from "./components/report pages/cars2";
import CARS3 from "./components/report pages/cars3";
// import ReactDOM from "react-dom";

const App = () => {
  const [offerTimeLeft, setOfferTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isOfferVisible, setIsOfferVisible] = useState(true);

  // Countdown timer logic
  useEffect(() => {
    if (!isOfferVisible || offerTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setOfferTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(timer);
  }, [isOfferVisible, offerTimeLeft]);

  // Auto-hide when timer reaches 0
  useEffect(() => {
    if (offerTimeLeft <= 0) {
      setIsOfferVisible(false);
    }
  }, [offerTimeLeft]);
  return (
    <AppProvider>
      <Router>
        <Routes>
          {" "}
          {/* Use Routes to define all your routes */}
          {/* <Route path="/download" element={<Report />} /> */}
          <Route path="/report" element={<ReportComLast />} />
          {/* <Route path="/" element={<ResultsPage />} /> */}
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          {/* <Route path='/generatepdf' element={<GeneratePDF />} /> */}
          <Route path="/" element={<GeneratePDF />} />
          <Route path="/isaa" element={<ISAA />} />
          <Route path="/isaa2" element={<ISAA2 />} />
          <Route path="/isaa3" element={<ISAA3 />} />
          <Route path="/isaa4" element={<ISAA4 />} />
          <Route path="/mchat" element={<MCHAT />} />
          <Route path="/mchat2" element={<MCHAT2 />} />
          <Route path="/mchat3" element={<MCHAT3 />} />
          <Route path="/cars" element={<CARS />} />
          <Route path="/cars2" element={<CARS2 />} />
          <Route path="/cars3" element={<CARS3 />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
