import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StudentServices from '../services/api/studentServices';
import Resume from '../components/reuse/Resume';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DownloadIcon } from 'lucide-react';
import Header from '../components/common/Header';

export default function ClassCardContainer() {
    const dispatch = useDispatch();
    const studentSelector = useSelector((state) => state.student);
    const [students, setStudents] = useState([]); // Local state for students
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // État pour gérer les erreurs
    const [openErrorDialog, setOpenErrorDialog] = useState(false); // État pour gérer l'ouverture du dialogue

    // Fetch students when class_id changes
    const fetchStudents = async () => {
        setLoading(true);
        const response = await StudentServices.getStudentByClassId(dispatch, params.class_id);
        console.log(response);
        if (response) {
            setStudents(response); 
        }
        setLoading(false); // Set loading to false after fetching
    };

    useEffect(() => {
        fetchStudents();
    }, [dispatch, params.class_id]);

    // Fonction pour télécharger tous les PDFs
    const handleDownloadAll = async () => {
        setDownloadLoading(true);
        setErrorMessage(''); // Réinitialiser le message d'erreur

        const pdfUrls = students.map(student => student.card_file);

        // Vérifier si des PDFs sont présents pour le téléchargement
        if (pdfUrls.length === 0) {
            alert("No PDFs available to download.");
            setDownloadLoading(false); // Reset loading state
            return;
        }

        // Pour chaque URL, télécharger le PDF
        for (const pdfUrl of pdfUrls) {
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
                URL.revokeObjectURL(link.href);
            } catch (error) {
                // console.log("Download error:", error);
                setErrorMessage(`Error downloading `); // Mettre à jour le message d'erreur
                setOpenErrorDialog(true); // Ouvrir le dialogue d'erreur
            }
        }

        setDownloadLoading(false); // Reset loading state after downloads
    };

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };

    return (
        <>
         <div className='flex-1 overflow-auto relative z-10'>
         {/* <Header title={'students cards'}/> */}
         <div className="mb-4">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleDownloadAll}
                    disabled={students.length === 0 || downloadLoading} // Désactiver si aucun étudiant ou si téléchargement en cours
                    startIcon={<DownloadIcon />}
                >
                    {downloadLoading ? <><CircularProgress size={24} /> Downloading...</> : 'Download All PDFs'}
                </Button>
            </div>
        <div className='relative overflow-auto w-full grid grid-cols-2  gap-4 xl:grid-cols-4'>
            

            {loading ? (
                <p>Loading Cards of students...</p> // Message pendant le chargement
            ) : students.length > 0 ? (
                students.map((student) => (
                 <>
                    {student.card_file && 
                    <div className='flex flex-row' key={student.id}>
                        <Resume pdfUrl={student.card_file} />
                    </div>
                }
                 </>
                ))
                
            ) : (
                <p>No students found.</p>
            )}
            
            {/* Dialog pour afficher les messages d'erreur */}
            <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
                <DialogTitle color='red'>Error</DialogTitle>
                <DialogContent>
                    <p>{errorMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </div>
        </>
    );
}