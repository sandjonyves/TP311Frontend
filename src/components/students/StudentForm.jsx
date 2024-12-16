import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

export default function StudentForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [matricule, setMatricule] = useState('');
  const [photo, setPhoto] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errors, setErrors] = useState({});

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!matricule) newErrors.matricule = 'Matricule is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) newErrors.dateOfBirth = 'Format must be YYYY-MM-DD';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", { firstName, lastName, matricule, dateOfBirth, photo });
      // Logic to handle form submission, e.g., sending data to an API
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        bgcolor: '#1F2937',
        color: 'white',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
        Student Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* First Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputLabelProps={{ style: { color: 'gray' } }}
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#374151', // bg-gray-700 equivalent
                  borderRadius: 4,
                },
              }}
            />
          </Grid>
          {/* Last Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputLabelProps={{ style: { color: 'gray' } }}
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#374151', // bg-gray-700 equivalent
                  borderRadius: 4,
                },
              }}
            />
          </Grid>
          {/* Matricule */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Matricule"
              variant="outlined"
              required
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              error={!!errors.matricule}
              helperText={errors.matricule}
              InputLabelProps={{ style: { color: 'gray' } }}
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#374151', // bg-gray-700 equivalent
                  borderRadius: 4,
                },
              }}
            />
          </Grid>
          {/* Date of Birth */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth (YYYY-MM-DD)"
              variant="outlined"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              InputLabelProps={{ style: { color: 'gray' } }}
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#374151', // bg-gray-700 equivalent
                  borderRadius: 4,
                },
              }}
            />
          </Grid>
          {/* Upload Student Photo */}
          <Grid item xs={12}>
            <Typography sx={{ color: 'gray', mb: 1 }}>Upload Student Photo</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ color: 'white' }} // Input color
            />
            {photo && (
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ color: 'gray', mb: 1 }}>Preview:</Typography>
                <img
                  src={photo}
                  alt="Student Photo Preview"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                />
              </Box>
            )}
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: '#3a3a55', // Button background
                '&:hover': {
                  bgcolor: '#55557f', // Button hover
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}