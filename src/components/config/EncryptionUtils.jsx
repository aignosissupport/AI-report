
// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  
  // Helper function to generate encryption key from a password
  const generateKey = async (password) => {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
  
    // Generate a random salt
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
  
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt']
    );
  
    return { key, salt };
  };
  
  // Encrypt the calibration data
  const encryptCalibrationData = async (calibrationPoints, password) => {
    try {
      // Generate encryption key and salt
      const { key, salt } = await generateKey(password);
  
      // Generate random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
      // Convert calibration points to array buffer
      const encoder = new TextEncoder();
      const dataArrayBuffer = encoder.encode(JSON.stringify(calibrationPoints));
  
      // Encrypt the data
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv
        },
        key,
        dataArrayBuffer
      );
  
      // Combine salt, IV, and encrypted data
      const encryptedArray = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
      encryptedArray.set(salt, 0);
      encryptedArray.set(iv, salt.length);
      encryptedArray.set(new Uint8Array(encryptedData), salt.length + iv.length);
  
      // Convert to base64 string for JSON compatibility without using spread operator
      return arrayBufferToBase64(encryptedArray);
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  };
  
  // Encrypt the AES password with RSA
  const encryptPassword = async (password) => {
    try {
      // Get and import RSA public key
      const jwk = await fetch('https://de.aignosismdw.in/rest/return_rsa_public_key').then(res => res.json()).catch(err=>console.log('wehgowgr' + err));
      const publicKey = await window.crypto.subtle.importKey(
        'jwk',
        jwk,
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256',
        },
        false,
        ['encrypt']
      );
  
      // Encrypt the password
      const encryptedPassword = await window.crypto.subtle.encrypt(
        {
          name: 'RSA-OAEP'
        },
        publicKey,
        new TextEncoder().encode(password)
      );
  
      // Convert to base64 string without using spread operator
      return arrayBufferToBase64(encryptedPassword);
    } catch (error) {
      console.error('Password encryption error:', error);
      throw error;
    }
  };
  
  export { encryptCalibrationData, encryptPassword };
  