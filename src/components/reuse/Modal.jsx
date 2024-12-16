import React from 'react';
import { Modal, Backdrop, Fade, Typography, IconButton, Button } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
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
                    color: 'white' 
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <Typography variant="h6" style={{ flex: 1 }}>
                            {title}
                        </Typography>
                        <IconButton 
                            onClick={() => setShowModal(false)} 
                            style={{ color: 'white' }} 
                        >
                            <ShieldCloseIcon />
                        </IconButton>
                    </div>

                    {children}

                    <div style={{ marginTop: '16px', textAlign: 'right' }}>
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