import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useSelector } from 'react-redux';
import StudentServices from '../../services/api/studentServices';
import CloudinaryWidget from '../reuse/CloudinaryWidget';

export default function StudentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    matricule: '',
    date_of_birth: '',
    classe: '',
    sexe: '',
    image_url: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success' ou 'error'
  const classSelector = useSelector((state) => state.class);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.matricule) newErrors.matricule = 'Matricule is required';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date_of_birth)) {
      newErrors.date_of_birth = 'Format must be YYYY-MM-DD';
    }
    if (!formData.classe) newErrors.classe = 'Class selection is required';
    if (!formData.sexe) newErrors.sexe = 'Gender selection is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await StudentServices.createStudent(formData, setIsLoading, setRequestMessage);
        setAlertType('success');
        resetForm();
      } catch (error) {
        setAlertType('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      matricule: '',
      date_of_birth: '',
      classe: '',
      sexe: '',
      image_url: null,
    });
    setErrors({});
    setRequestMessage('');
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        bgcolor: '#1F2937',
        color: 'white',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
        Student Information Form
      </Typography>

      {requestMessage && (
        <Alert severity={alertType} sx={{ marginBottom: 2 }}>
          {requestMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            { label: 'First Name', field: 'firstName' },
            { label: 'Last Name', field: 'lastName' },
            { label: 'Matricule', field: 'matricule' },
            { label: 'Date of Birth (YYYY-MM-DD)', field: 'date_of_birth' },
          ].map(({ label, field }) => (
            <Grid item xs={12} key={field}>
              <TextField
                fullWidth
                label={label}
                variant="outlined"
                required
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                error={!!errors[field]}
                helperText={errors[field]}
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
          ))}

          {/* Class Selection */}
          <Grid item xs={12}>
            <FormControl fullWidth required error={!!errors.classe}>
              <InputLabel sx={{ color: 'gray' }}>Class</InputLabel>
              <Select
                value={formData.classe}
                onChange={(e) => handleInputChange('classe', e.target.value)}
                sx={{
                  color: 'white',
                  backgroundColor: '#374151',
                  '& .MuiSelect-icon': { color: 'white' },
                }}
              >
                <MenuItem value="">
                  <em>Select Class</em>
                </MenuItem>
                {classSelector.class.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.classe && <Typography sx={{ color: 'red' }}>{errors.classe}</Typography>}
            </FormControl>
          </Grid>

          {/* Gender Selection */}
          <Grid item xs={12}>
            <FormControl fullWidth required error={!!errors.sexe}>
              <InputLabel sx={{ color: 'gray' }}>Gender</InputLabel>
              <Select
                value={formData.sexe}
                onChange={(e) => handleInputChange('sexe', e.target.value)}
                sx={{
                  color: 'white',
                  backgroundColor: '#374151',
                  '& .MuiSelect-icon': { color: 'white' },
                }}
              >
                <MenuItem value="">
                  <em>Select Gender</em>
                </MenuItem>
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
              {errors.sexe && <Typography sx={{ color: 'red' }}>{errors.sexe}</Typography>}
            </FormControl>
          </Grid>

          {/* Upload Student Image */}
          <Grid item xs={12}>
            <CloudinaryWidget setImageUrl={(url) => handleInputChange('image_url', url)} />
            {formData.image_url && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography sx={{ color: 'gray', mb: 1 }}>Preview:</Typography>
                <img
                  src={formData.image_url}
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
              disabled={isLoading}
              sx={{
                bgcolor: '#3a3a55',
                '&:hover': { bgcolor: '#55557f' },
              }}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
