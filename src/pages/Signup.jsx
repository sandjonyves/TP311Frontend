import React, { useState } from 'react';
import image from '../assets/Signup.png';
import { Button, TextField, Container, Typography } from '@mui/material';
import userServices from '../services/api/user'; // Importer le service utilisateur
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice'; // Ajustez le chemin selon votre structure
import { useNavigate, Link } from 'react-router-dom'; // Importer Link pour la navigation

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, email, password, confirmPassword } = formData;

        // Validation des champs
        if (!username || !email || !password || !confirmPassword) {
            setRequestMessage('Please fill in all required fields.');
            return;
        }
      
        if (password !== confirmPassword) {
            setRequestMessage('Passwords do not match.');
            return;
        }

        // Appel à l'API pour enregistrer l'agence
        userServices.userRegister(dispatch, formData, navigate, setIsLoading, setRequestMessage);
    };

    return (
        <Container className='md:flex items-center md:justify-center h-screen relative'>
            <div className="font-[sans-serif] bg-white md:h-auto rounded-xl">
                <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                    <div className="max-md:order-1 p-4">
                        <img src={image} className="w-2xl h-full object-contain block mx-auto" alt="Agency" />
                    </div>

                    <div className="flex justify-center items-center md:p-8 bg-[#0C172C] dark:bg-gray-100 dark:text-stone-700 h-full w-full lg:ml-auto rounded-xl">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <Typography variant="h2" className='text-center mb-16 text-blue-500' style={{ margin: 15 }}>
                                Register You
                            </Typography>

                            <TextField
                                label="Username"
                                name="username"
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your username"
                                required
                            />

                            <TextField
                                label="Email"
                                name="email"
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your email"
                                type="email"
                                required
                            />

                            <TextField
                                label="Password"
                                name="password"
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your password"
                                type="password"
                                required
                            />

                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                placeholder="Confirm your password"
                                type="password"
                                required
                            />

                            {requestMessage && <Typography color="error" textAlign="center">{requestMessage}</Typography>}

                            <div className="mt-12 flex justify-center">
                                <Button 
                                    type="submit" 
                                    color='primary' 
                                    variant="contained" 
                                    disabled={isLoading}
                                    fullWidth
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </Button>
                            </div>

                            <div className="mt-4 text-center">
                                <Typography>
                                    Already have an account?{' '}
                                    <Link to="/signin" style={{ color: '#3f51b5', textDecoration: 'underline' }}>
                                        Sign In
                                    </Link>
                                </Typography>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}