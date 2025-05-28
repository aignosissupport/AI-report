// Helper function to convert Base64 to ArrayBuffer
const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Helper function to parse PEM and convert it to JWK
const pemToArrayBuffer = (pem) => {
  const base64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');
  return base64ToArrayBuffer(base64);
};

// Function to decrypt the AES password using RSA private key
const decryptPassword = async (encryptedPasswordBase64, privateKeyPem) => {
  try {
    const privateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkQ/ZJwADdeF+l
oPdpgIQNoV5U8kM3JO9xMvbbot1hWdh7gmBbou07dNO4k3jbb7a1AMvU3EtmIS3e
SHSkJHCgwrCxeVh9gd4c8zlYLuXdB9uzVnaVO3Fqu/AxCo6EbC3M8fepeYzZUpE3
TmuxDwCE7sVQtTSkL4cSaAXc6WDm/aRRHrVv/EUT5YYEFkLue+uXOP9k41hinDCo
FCQ3tDkRdxKmkKUV45sKNJyq8pkoSA05UVMixHLtWqu6BuxDfUTw7Dp6RIC/IZrC
QmJFdSV3TBaJSUTHx6XFCsc+OC3eKkxJk9KbmU5J3w6ZznYXJU4kcz2hv3tu3Gwg
pD/G1CeNAgMBAAECggEAFwaJxvO5i1HcwmhKVgkUOZ7ljK2620d7otf8f3QYaRWB
gWqYnC+95kgth2Fwnv3NVBjs+YT5srKy7cYlR37uJLK1tuLmEw25t0AmySQlx3Jb
CwvzKl7/OnFmrVEoAgrx7pj6WNC3fB0VSvXcpaCPN5MKqJIF83/QBLX9IGa8VRR+
SOty/dDJI4w2ABFy6Eq6vFQmNPvbsvlEq9nA86jY9sKw1vCgAefXYHLapn/RWpAF
UAkfrK+91m2KborhBkMkfitTActNGFt23e7xF10KOzJVNRnsjHSCvb2u4SX1xuUC
BbW3bXVYMuYOLpC21D/YU+2yLPok8Qvl+Cji/oF9dwKBgQDTDINBHNRMvB5YgYOf
bDFtVzP/W7Mo+416BkU1GBU2s6b0v3oeiHxEa6JGCjwgRKNY0AJWnPiQ+5PsrGVM
QKmXdtRtFDYoFMEgKxFjxhnFFAR8QgEzfbM/TM4DqjYSYCIMJdRBp5US2KTKHpQR
HBzLlFIhGoPBivsqY/kAAPx/GwKBgQDHQJLt+ILU5pYojk5kpfT3+K7rBT5ETrdx
pOA0A1sNW2JcI9M24TtUGnKmn8CT/kKE10JtLiEV0Gi2jS8MT+b7e1oigEjCNRG0
5CMvc4YUfEnc0AyKHCrMwyjrWVpLZlLMCix3b6QLgRrNrlpcXudVDHF6FjlKP+3T
CKb7LmZWdwKBgExVgkPSwZbfk7o/XfQTle0OVWhPKoXwNkOkcPO7OjEG2aQ8fVb9
1rSImbDrksO5D7vXwIDDVcRaui4oTJs/6Bc4i6zIWq40k4WnDisgQ8Hcc6Ld3MFa
/bIvfXQl5FjRHH94T0VP78NZSIEyfiuSF3gqtWnzxSQDuMSkVDOEJ89xAoGBALQ9
wavrJc6ZWDQPpvJ8/YBjQTfwYkdAPclbsETc1Dzc8bkP3zzBuf12f0gjMv2s/1dT
sg85r0wgXtjkFi85CGVtTDfxe9/SSdYsmXePNTbKx7YrrWwx1rWrxRRAm+GhCjzw
5xCTuP1/KFPu6GauouzYeL5L5D86XVSNex+09XY5AoGBAL+Y441oQ93GHh+6nVih
DlnlKskrx/EolpfMYMipPDAkVG89wtj7C+U4TXbEwyMJ9J0BNZLL9yq0O8GY41aO
CNELk+mTpQ8y82Kb1gw+Stx7JBuUkOCGrroDAVTj5JZbeDhD7nv08NvlRRYDEqYq
tNCycxXwouQJEtM/Fx85ltKr
-----END PRIVATE KEY-----`;

    // Convert PEM to ArrayBuffer
    const privateKeyBuffer = pemToArrayBuffer(privateKeyPem);

    // Import the RSA private key
    const privateKey = await window.crypto.subtle.importKey(
      'pkcs8',
      privateKeyBuffer,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      false,
      ['decrypt']
    );

    // Convert encrypted password from Base64 to ArrayBuffer
    const encryptedPasswordBuffer = base64ToArrayBuffer(encryptedPasswordBase64);

    // Decrypt the AES password
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      privateKey,
      encryptedPasswordBuffer
    );

    // Convert decrypted buffer to string
    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};

// // // // // // // // // // // // // // ASSYMETRIC ENCRYPTION FROM HERE ONWARDS // // // // // // // // // // // // // // // // // // //

// Helper function to derive decryption key from password and salt
const deriveKey = async (password, salt) => {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, [
    'deriveBits',
    'deriveKey',
  ]);

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['decrypt']
  );
};

// Decrypt the calibration data
const decryptCalibrationData = async (encryptedBase64, password) => {
  try {
    // Convert Base64 to ArrayBuffer
    const encryptedArrayBuffer = base64ToArrayBuffer(encryptedBase64);
    const encryptedBytes = new Uint8Array(encryptedArrayBuffer);

    // Extract salt (16 bytes), IV (12 bytes), and encrypted data
    const salt = encryptedBytes.slice(0, 16);
    const iv = encryptedBytes.slice(16, 28);
    const encryptedData = encryptedBytes.slice(28);

    // Derive the AES decryption key
    const key = await deriveKey(password, salt);

    // Decrypt the data
    const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encryptedData
    );

    // Convert decrypted buffer to string and parse JSON
    const decryptedText = new TextDecoder().decode(decryptedArrayBuffer);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};

export { decryptPassword, decryptCalibrationData };
