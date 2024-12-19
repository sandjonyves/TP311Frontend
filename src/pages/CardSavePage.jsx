import React, { useState } from 'react';
import CloudinaryWidget from '../components/reuse/CloudinaryWidget';
import { Button, Card, CardContent, Typography } from '@mui/material';
import PrototypeServices from '../services/api/PrototypeServices';

export default function CardSavePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    await PrototypeServices.createPrototype({ image: imageUrl }, setIsLoading, setRequestMessage);
    setIsLoading(false);
    setImageUrl('')
  };

  return (
    <div className="flex w-full relative items-center justify-center h-screen">
      <Card sx={{ width: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Save Prototype
          </Typography>
          <CloudinaryWidget setImageUrl={setImageUrl} label={'Upload Image'} />
          <img src={imageUrl}/>
          {requestMessage && <Typography color="text.secondary" mt={2}>{requestMessage}</Typography>}
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
            sx={{ mt: 2 }} // Ajout d'une marge supérieure pour le bouton
          >
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}