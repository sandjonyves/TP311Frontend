import React, { useState } from 'react';
import image from '../assets/Signin.png';
import { Button, TextField, Container, Typography } from '@mui/material';
import userServices from '../services/api/user'; // Importer le service utilisateur
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice'; // Importer l'action setUser
import { useNavigate } from 'react-router-dom'; // Pour la navigation
import { Link } from 'react-router-dom'; // Importer Link pour la navigation

export default function Signin() {
    const [formData, setFormData] = useState({
        identifier: '', // Pour email ou username
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');
    const dispatch = useDispatch(); // Hook pour accéder au dispatch Redux
    const navigate = useNavigate(); // Hook pour la navigation

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { identifier, password } = formData;

        // Validation des champs
        if (!identifier || !password) {
            setRequestMessage('Please fill in all required fields.');
            return;
        }

        // Appel à l'API pour la connexion
        userServices.userLogin(dispatch, { email: identifier, password }, navigate, setIsLoading, setRequestMessage);
    };

    return (
        <Container className='md:flex items-center md:justify-center h-screen relative'>
            <div className="font-[sans-serif] bg-white md:h-auto rounded-xl">
                <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                    <div className="max-md:order-1 p-4">
                        <img src={image} className="w-full h-full object-contain block mx-auto" alt="Agency" />
                    </div>

                    <div className="flex justify-center items-center md:p-8 bg-[#0C172C] dark:bg-gray-100 dark:text-stone-700 h-full w-full lg:ml-auto rounded-xl">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <Typography variant="h2" className='text-center mb-16 text-blue-500' style={{ margin: 15 }}>
                                Sign In
                            </Typography>

                            <TextField
                                label="Email or Username"
                                name="identifier"
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your email or username"
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

                            {requestMessage && <Typography color="error" textAlign="center">{requestMessage}</Typography>}

                            <div className="mt-12 flex justify-center">
                                <Button 
                                    type="submit" 
                                    color='primary' 
                                    variant="contained" 
                                    disabled={isLoading}
                                    fullWidth
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </div>

                            <div className="mt-4 text-center">
                                <Typography>
                                    Don't have an account?{' '}
                                    <Link to="/signup" style={{ color: '#3f51b5', textDecoration: 'underline' }}>
                                        Sign Up
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