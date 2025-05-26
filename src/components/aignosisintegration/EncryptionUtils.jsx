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
    
    // Encrypt the video blob
    const encryptVideo = async (videoBlob, password) => {
      try {
        // Generate encryption key and salt
        const { key, salt } = await generateKey(password);
        
        // Generate random IV
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        
        // Convert blob to array buffer
        const videoArrayBuffer = await videoBlob.arrayBuffer();
        
        // Encrypt the video data
        const encryptedData = await window.crypto.subtle.encrypt(
          {
            name: 'AES-GCM',
            iv
          },
          key,
          videoArrayBuffer
        );
        
        // Combine salt, IV, and encrypted data
        const encryptedArray = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
        encryptedArray.set(salt, 0);
        encryptedArray.set(iv, salt.length);
        encryptedArray.set(new Uint8Array(encryptedData), salt.length + iv.length);
        
        // Convert to blob for sending
        return new Blob([encryptedArray], { type: 'application/octet-stream' });
      } catch (error) {
        console.error('Encryption error:', error);
        throw error;
      }
    };
    
    export { encryptVideo };