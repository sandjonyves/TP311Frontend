import React, { useRef } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';

const CloudinaryWidget = () => {

  const cloudinaryRef = useRef()
  cloudinaryRef.current = window.cloudinary;
  const uploadWidget = () => {
    console.log(cloudinaryRef)
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dqripzmub',
        uploadPreset: 'hjy7hlob',
        sources: ['local', 'url', 'camera'],
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Uploaded image details:', result.info);
          const imageUrl = result.info.secure_url; // Utilisez secure_url pour HTTPS
          console.log('Uploaded image URL:', imageUrl);
  
          // Faites quelque chose avec l'URL de l'image
        }
      }
    );
  };

  return (
    <CloudinaryContext cloudName="dqripzmub">
      <button onClick={uploadWidget}>Upload Image</button>
    </CloudinaryContext>
  );
};

export default CloudinaryWidget;