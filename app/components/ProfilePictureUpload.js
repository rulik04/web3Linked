import React, { useState } from 'react';
import { uploadToPinata } from '../utils/pinata';

const ProfilePictureUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    try {
      const url = await uploadToPinata(file);
      setImageUrl(url);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload to IPFS</button>
      {imageUrl && (
        <div>
          <p>Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
          <img src={imageUrl} alt="Profile" style={{ width: '200px', height: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
