import { Button } from '@mui/material';
import { DownloadIcon, EyeIcon } from 'lucide-react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StudentServices from '../../services/api/studentServices';
import { useDispatch, useSelector } from 'react-redux';

export default function CardClass({ img_url, class_id, class_name }) {
    const currentRoute = useLocation()
    // React.useEffect(()=>{console.log(currentRoute)},[img_url])
    const studentSelector = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const [students, setStudents] = React.useState([]);
    // const params = useParams();

    React.useEffect(() => {
        const fetchStudents = async () => {
            await StudentServices.getStudentByClassId(dispatch, class_id);
        };

        fetchStudents();
    }, [class_id]);

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
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
           {/* <Link to={`${currentRoute.pathname}/${class_id}`}>
           <img
                className="rounded-t-lg"
                src={img_url}
                alt={`Image for ${class_name}`}
            />
           </Link> */}
            <h5 className="m-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {class_name}
                </h5>
            <div className="flex justify-between gap-4 p-5">
            <Link to={`${currentRoute.pathname}/${class_id}`}>
            <Button
                variant='contained'
                color='primary'
                endIcon={<EyeIcon/>}
                >
                   all View 
                </Button>
           </Link>
                <Button
                variant='contained'
                color='success'
                endIcon={<DownloadIcon/>}
                onClick ={handleDownloadAll}
                >
                    Dawnload all
                </Button>
            </div>
        </div>
    );
}
