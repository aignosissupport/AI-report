import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/aignosisintegration/AppContext';

const DataCollectionPage = () => {
  // const location = useLocation();
  const navigate = useNavigate();

  const {testData, setTestData} = useContext(AppContext);

  useEffect(() => {
    if (!testData.dataCollectionMode || testData.dataCollectionMode.length === 0) {
      navigate('/patienthistory'); // Redirect to /patienthistory if no testData.dataCollectionMode present
    } else if (testData.dataCollectionMode.includes('INCLEN')) {
        navigate('/INCLEN');
    } else if (testData.dataCollectionMode.includes('ISAA')) {
        navigate('/ISAA');
    } else if (testData.dataCollectionMode.includes('CARS')) {
        navigate('/CARS');
    } else {
      navigate('/patienthistory'); // Default to patienthistory if none of the options are present
    }
  }, [testData.dataCollectionMode, navigate]);

  return (
    <div>
      {/* You can conditionally render components if needed, though they won't be displayed because of the navigation above */}
      {/* {testData.dataCollectionMode.includes('INCLEN') && <INCLEN testData.dataCollectionMode={testData.dataCollectionMode} />}
      {testData.dataCollectionMode.includes('ISAA') && <ISAA testData.dataCollectionMode={testData.dataCollectionMode} />}
      {testData.dataCollectionMode.includes('CARS') && <CARS testData.dataCollectionMode={testData.dataCollectionMode} />} */}
    </div>
  );
};

export default DataCollectionPage;
