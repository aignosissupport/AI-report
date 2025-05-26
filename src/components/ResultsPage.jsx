import { useSearchParams } from 'react-router-dom';

function ResultsPage() {
  const [searchParams] = useSearchParams();

  const patientId = searchParams.get('patient_id');
  const transactionId = searchParams.get('transaction_id');
//   const focalPointIOU = searchParams.get('Focal Point IOU');
//   const jointAttentionError = searchParams.get('Joint Attention Error (%)');
//   const eyeContactError = searchParams.get('Eye Contact Error');
//   const gazeDispersion = searchParams.get('Gaze Dispersion (pixels)');
//   const gazeSpeed = searchParams.get('Gaze Speed (px/sec)');
//   const screenFocus = searchParams.get('Screen Focus (%)');
//   const objectTrackingError = searchParams.get('Object Tracking Error (px)');
//   const socialPreference = searchParams.get('Social Preference (%)');
//   const gazeHolds = searchParams.get('Gaze Holds');
//   const saccades = searchParams.get('Saccades (per second)');
//   const lipSyncRecognisability = searchParams.get('LipSync Recognisability (%)');
//   const convoRecognisability = searchParams.get('Convo Recognisability (%)');
//   const meanYaw = searchParams.get('meanYaw (deg/sec)');
//   const meanPitch = searchParams.get('meanPitch (deg/sec)');
//   const meanRoll = searchParams.get('meanRoll (deg/sec)');

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patient Analysis</h2>
      <ul className="space-y-2">
        <li>Patient ID: {patientId}</li>
        <li>Transaction ID: {transactionId}</li>
        {/* <li>Focal Point IOU: {focalPointIOU}</li>
        <li>Joint Attention Error (%): {jointAttentionError}</li>
        <li>Eye Contact Error: {eyeContactError}</li>
        <li>Gaze Dispersion (pixels): {gazeDispersion}</li>
        <li>Gaze Speed (px/sec): {gazeSpeed}</li>
        <li>Screen Focus (%): {screenFocus}</li>
        <li>Object Tracking Error (px): {objectTrackingError}</li>
        <li>Social Preference (%): {socialPreference}</li>
        <li>Gaze Holds: {gazeHolds}</li>
        <li>Saccades (per second): {saccades}</li>
        <li>LipSync Recognisability (%): {lipSyncRecognisability}</li>
        <li>Convo Recognisability (%): {convoRecognisability}</li>
        <li>Mean Yaw (deg/sec): {meanYaw}</li>
        <li>Mean Pitch (deg/sec): {meanPitch}</li>
        <li>Mean Roll (deg/sec): {meanRoll}</li> */}
      </ul>
    </div>
  );
}

export default ResultsPage;