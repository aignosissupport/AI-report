import React, { useContext } from 'react';
import backgroundImage from '../../assets/page1bg.png'; // Importing the background image
// import { useLocation } from 'react-router-dom';
import { AppContext } from "../../AppContext";

function ReportPage() {
    // const location = useLocation();
    // const getQueryParams = (search) => {
    //   const params = new URLSearchParams(search);
    //   return {
    //     dob: params.get("patientDOB"),
    //     name: params.get("name"),
    //   };
    // };
  
    // const {dob, name } = getQueryParams(location.search);
      const { testData,  } = useContext(AppContext);
      let name = testData.name;

  
  return (
    <div style={styles.container}>
      <div style={styles.logo}>Ai.gnosis</div>
      <img
        src={backgroundImage}
        alt="Background"
        style={styles.backgroundImage}
      />
      <div style={styles.overlayBox}>
        <h1 style={styles.title}>Ai.gnosis Cognitive & Developmental Report</h1>
        <p style={styles.infoText}>Name: {name}</p>
        {/* <p style={styles.infoText}>Date of Birth: {dob}</p> */}
        {/* <p style={styles.infoText}>Age at Assessment: 3 years old</p> */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#1b0238' , // Changed to a solid colorbackground: #33253E;
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: `'Cormorant Garamond', serif`,
  },
  logo: {
    position: 'absolute',
    top: '20px', // Adjusted distance from the top
    left: '20px', // Adjusted distance from the left
    fontSize: '3em', // Enlarged font size for the logo
    fontWeight: 'bold',
    color: '#ff79c6', // Pink color for logo
    padding: '10px 20px', // Added padding for the logo
    margin: '10px', // Added margin to create space around the logo
  },
  backgroundImage: {
    position: 'absolute',
    width: '600px', // Adjusted width for background image
    height: '700px', // Adjusted height for background image
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Center alignment
    opacity: 1,
  },
  overlayBox: {
    position: 'absolute',
    width: '400px', // Set fixed width for a square shape
    height: '400px', // Set fixed height for a square shape
    top: '60%', // Adjust top position
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center alignment
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Increased transparency (0.5)
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Left alignment
    justifyContent: 'center',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'left', // Left alignment for text
    color: 'white',
  },
  title: {
    fontSize: '2em', // Enlarged title font size
    marginBottom: '15px', // Adjusted margin
  },
  infoText: {
    fontSize: '1.5em', // Enlarged font size for info text
    lineHeight: '1.5',
    marginBottom: '10px', // Added margin between text lines
  },
};

export default ReportPage;
