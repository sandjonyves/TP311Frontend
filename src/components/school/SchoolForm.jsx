import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, CircularProgress } from '@mui/material';
import CloudinaryWidget from '../reuse/CloudinaryWidget';
import { useSelector } from 'react-redux';
import schoolServices from '../../services/api/schoolService';

export default function SchoolForm({ onSuccess }) {
  const [logo, setLogo] = useState(null);
  const [schoolName, setSchoolName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const userSelector = useSelector((state) => state.User);

  const validateForm = () => {
    const newErrors = {};
    if (!schoolName) newErrors.schoolName = 'School name is required';
    if (!academicYear) newErrors.academicYear = 'Academic year is required';
    if (!/^\d{4}\/\d{4}$/.test(academicYear)) newErrors.academicYear = 'Format must be YYYY/YYYY';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!/^\d+$/.test(phoneNumber)) newErrors.phoneNumber = 'Phone number must be numeric';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = {
        user: userSelector.id,
        name: schoolName,
        academic_year: academicYear,
        phone: phoneNumber,
        logo_url: logo, // Assuming logo is uploaded and returns a valid URL
      };

      setIsSubmitting(true);
      setSubmitMessage('');

      try {
        const newSchool = await schoolServices.createSchool(
          formData,
          setIsSubmitting,
          setSubmitMessage
        );

        if (newSchool && onSuccess) {
          onSuccess(newSchool); // Notify parent component with the new school
        }
      } catch (error) {
        console.error('Error creating school:', error);
        setSubmitMessage('Failed to create school. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
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
      <Typography variant="h5" gutterBottom>
        School Information Form
      </Typography>
      {submitMessage && (
        <Typography
          sx={{
            color: submitMessage.includes('successfully') ? 'green' : 'red',
            textAlign: 'center',
            mb: 2,
          }}
        >
          {submitMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
                  backgroundColor: '#374151',
                  borderRadius: 4,
                },
              }}
            />
          </Grid>
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
                  backgroundColor: '#374151',
                  borderRadius: 4,
                },
              }}
            />
          </Grid>
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
                  backgroundColor: '#374151',
                  borderRadius: 4,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CloudinaryWidget setImageUrl={setLogo} />
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
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{
                bgcolor: '#3a3a55',
                '&:hover': {
                  bgcolor: '#55557f',
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Submit'
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
