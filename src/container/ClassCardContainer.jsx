import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StudentServices from '../services/api/studentServices';
import Resume from '../components/reuse/Resume';
import { Button } from '@mui/material';
import { DownloadIcon } from 'lucide-react';

export default function ClassCardContainer() {
    const studentSelector = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const [students, setStudents] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchStudents = async () => {
            await StudentServices.getStudentByClassId(dispatch, params.class_id);
        };

        fetchStudents();
    }, [params.class_id]);

    // Fonction pour télécharger tous les PDF
    const handleDownloadAll = async () => {
        const pdfUrls = studentSelector.student.map(student => student.card_file);

        // Pour chaque URL, on télécharge le PDF
        pdfUrls.forEach(async (pdfUrl) => {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = pdfUrl.split('/').pop() || 'document.pdf';
            link.click();
            URL.revokeObjectURL(link.href); // Libérer l'URL
        });
    };

    return (
        <div className='relative overflow-auto w-full grid grid-cols-4'>
            {studentSelector.student.length > 0 ? (
                <>
                    {studentSelector.student.map((student) => (
                        <div className='flex flex-row' key={student.id}>
                            <Resume pdfUrl={student.card_file} />
                        </div>
                    ))}
                </>
            ) : (
                <p>No students found.</p>
            )}
        </div>
    );
}