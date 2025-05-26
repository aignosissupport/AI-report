import React from "react";

const ReportPage2 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Developmental Screening Results</h1>

      <div style={styles.meterContainer}>
        <div style={styles.gauge}>
          <div style={styles.gaugeInner}>
            <span style={{ ...styles.gaugeLabel, ...styles.lowLabel }}>Low</span>
            <span style={{ ...styles.gaugeLabel, ...styles.midLabel }}>Mid</span>
            <span style={{ ...styles.gaugeLabel, ...styles.highLabel }}>High</span>
            <div style={styles.needle}></div>
          </div>
        </div>
        <div style={styles.legend}>
          <span style={{ ...styles.legendItem, backgroundColor: "#ff4d4d" }}>
            0-40 : Low
          </span>
          <span style={{ ...styles.legendItem, backgroundColor: "#f5deb3", marginLeft: "20px", marginRight: "20px" }}>
            40-60 : Mid
          </span>
          <span style={{ ...styles.legendItem, backgroundColor: "#4caf50" }}>
            60-100 : High
          </span>
        </div>
      </div>

      <div style={styles.textContainer}>
        <div style={styles.resultBox}>
          <p style={styles.resultText}>YOUR CHILD IS AT RISK OF AUTISM</p>
          <p style={styles.resultDescription}>
            32 out of 100, which implies that your child shows no traits of Autism.
          </p>
        </div>

        <div style={styles.overviewBox}>
          <h3 style={styles.overviewTitle}>Developmental Skills Overview</h3>
          <p style={styles.overviewText}>
            32 out of 100, which implies that your child shows traits of Neurodiversity.
            The entire purpose of this screening is to detect the possibility of social and
            communication issues that the child might be facing.
          </p>
          <p style={styles.overviewText}>
            There is a requirement to consult a developmental pediatrician for further evaluation.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to bottom, #f5e8f5, #ffffff)",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  meterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  },
  gauge: {
    position: "relative",
    width: "300px",
    height: "150px",
  },
  gaugeInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "150px 150px 0 0",
    background: "conic-gradient(#ff4d4d 0deg 120deg, #f5deb3 120deg 240deg, #4caf50 240deg 360deg)",
    border: "2px dashed #333",
  },
  gaugeLabel: {
    position: "absolute",
    fontSize: "14px",
    color: "#333",
    fontWeight: "bold",
  },
  lowLabel: {
    left: "5%",
    top: "60%",
  },
  midLabel: {
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
  },
  highLabel: {
    right: "5%",
    top: "60%",
  },
  needle: {
    position: "absolute",
    width: "2px",
    height: "80px",
    backgroundColor: "#333",
    transformOrigin: "bottom",
    transform: "rotate(-60deg)",
    top: "calc(50% - 80px)",
    left: "50%",
  },
  legend: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  legendItem: {
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#fff",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    maxWidth: "500px",
    marginTop: "30px",
  },
  resultBox: {
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    margin: "20px 0",
    width: "100%",
  },
  resultText: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  resultDescription: {
    fontSize: "14px",
    color: "#666",
  },
  overviewBox: {
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "100%",
  },
  overviewTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#333",
  },
  overviewText: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
  },
};

export default ReportPage2;
