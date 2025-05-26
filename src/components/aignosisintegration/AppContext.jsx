import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  // Define the shared state
  const [testData, setTestData] = useState({
    PATIENT_UID: '',
    TRANSACTION_ID: '',
    patientName: '',
    patienDOB: '',
    inclenFormData: '',
    isaaFormData: '',
    carsFormData: '',
    dataCollectionMode: [],
    patienthistoryform1Data: '',
    patienthistoryform2Data: '',
    patienthistoryform3Data: '',
    patienthistoryform4Data: '',
    videolanguage:'',
    mchatscore:'',
    carsscore:'',
    isaascore:'',
    inclenscore:'',
  });

  // Pass the state and updater function to the provider
  return (
    <AppContext.Provider value={{ testData, setTestData }}>
      {children}
    </AppContext.Provider>
  );
};
