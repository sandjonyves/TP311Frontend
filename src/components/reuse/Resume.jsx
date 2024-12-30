import React, { useEffect, useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { themePlugin } from '@react-pdf-viewer/theme';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Button, Modal, Box } from '@mui/material';
import { DownloadIcon } from 'lucide-react';

// REACT PLUGIN STYLE   
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Style pour la carte d'identité
const idCardStyle = {
    width: '85.6mm',
    height: '53.98mm',
    margin: '0 auto',
    overflow: 'hidden',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transition pour l'animation
};

// Style pour la carte en survol
const idCardHoverStyle = {
    transform: 'scale(1.05)', // Agrandir légèrement
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)', // Ombre plus prononcée
};

// Style pour le modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    maxHeight: '80vh',
};

const Resume = ({ pdfUrl }) => {
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Plugins PDF
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const themePluginInstance = themePlugin();

    const handleDownload = async () => {
        if (!pdfUrl || pdfUrl.trim() === "") {
            alert("PDF URL is empty or invalid.");
            return;
        }

        try {
            const response = await fetch(pdfUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch PDF from ${pdfUrl}`);
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = pdfUrl.split('/').pop() || 'document.pdf';
            link.click();
            URL.revokeObjectURL(link.href); // Libérer l'URL après le téléchargement
        } catch (error) {
            console.log("Download error:", error);
            alert("There was an error downloading the PDF.");
        }
    };
    useEffect(()=>{
        console.log(pdfUrl)
    })

    // Ne pas rendre le Viewer si pdfUrl est vide ou invalide
    if (!pdfUrl || pdfUrl.trim() === "") {
        return <p>No PDF available to view or download.</p>;
    }

    return (
        <main className="resume">
            {/* Section pour afficher uniquement la première page */}
            <section
                className="wrapper hover:cursor-pointer bg-gray-100"
                style={{
                    ...idCardStyle,
                    ...(isHovered ? idCardHoverStyle : {}),
                }}
                onClick={handleOpen}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Viewer
                    fileUrl={pdfUrl}
                    plugins={[themePluginInstance]}
                />
            </section>
            <Button
                variant="contained"
                color="success"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
            >
                Télécharger
            </Button>

            {/* Modal pour afficher tout le PDF */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-pdf-viewer">
                <Box sx={modalStyle}>
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                    >
                        Télécharger
                    </Button>
                </Box>
            </Modal>
        </main>
    );
};

export default Resume;
