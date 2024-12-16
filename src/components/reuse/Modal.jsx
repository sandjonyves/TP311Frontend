import React from 'react';
import { Modal, Backdrop, Fade, Typography, IconButton, Button } from '@mui/material';
import { ShieldCloseIcon } from 'lucide-react';

export default function CustomModal({ children, showModal, setShowModal, title }) {
    return (
        <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={showModal}>
                <div style={{ 
                    backgroundColor: '#1F2937', 
                    borderRadius: '8px', 
                    padding: '16px', 
                    maxWidth: '600px', 
                    margin: 'auto',
                    position: 'relative',
                    color: 'white',
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '50%',
                    transform: 'translateY(-50%)', 
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
                        <Typography variant="h6" style={{ flex: 1 }}>
                            {title}
                        </Typography>
                        <IconButton 
                            onClick={() => setShowModal(false)} 
                            style={{ color: 'white' }} 
                            
                        >
                            <ShieldCloseIcon className='hover:text-red-500' />
                        </IconButton>
                    </div>

                    {children}

                    <div style={{ marginTop: '16px', textAlign: 'right', width: '100%' }}>
                        <Button 
                            variant="outlined" 
                            onClick={() => setShowModal(false)} 
                            style={{ 
                                color: 'white',
                                borderColor: 'white', 
                                '&:hover': { borderColor: '#bbb' } 
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}