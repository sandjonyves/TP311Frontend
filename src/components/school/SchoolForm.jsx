import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

export default function SchoolForm() {
  const [logo, setLogo] = useState(null);
  const [schoolName, setSchoolName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!schoolName) newErrors.schoolName = 'School name is required';
    if (!academicYear) newErrors.academicYear = 'Academic year is required';
    if (!/^\d{4}\/\d{4}$/.test(academicYear)) newErrors.academicYear = 'Format must be YYYY/YYYY';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!/^\d+$/.test(phoneNumber)) newErrors.phoneNumber = 'Phone number must be numeric';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", { schoolName, academicYear, phoneNumber, logo });
      // Logic to handle form submission, including the logo
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        // boxShadow: 3,
        // borderRadius: 2,
        bgcolor: '#1F2937', 
        color: 'white', 
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
        School Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* School Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="School Name"
              variant="outlined"
              required
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              error={!!errors.schoolName}
              helperText={errors.schoolName}
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
          {/* Academic Year */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Academic Year (YYYY/YYYY)"
              variant="outlined"
              required
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              error={!!errors.academicYear}
              helperText={errors.academicYear}
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
          {/* Phone Number */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
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
          {/* Upload School Logo */}
          <Grid item xs={12}>
            <Typography sx={{ color: 'gray', mb: 1 }}>Upload School Logo</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              style={{ color: 'white' }} // Input color
            />
            {logo && (
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
                  src={logo}
                  alt="School Logo Preview"
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