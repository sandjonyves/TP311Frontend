import { Button } from '@mui/material';
import { DownloadIcon } from 'lucide-react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CardClass({ img_url, class_id, class_name }) {
    const currentRoute = useLocation()
    // React.useEffect(()=>{console.log(currentRoute)},[img_url])
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
           <Link to={`${currentRoute.pathname}/${class_id}`}>
           <img
                className="rounded-t-lg"
                src={img_url}
                alt={`Image for ${class_name}`}
            />
           </Link>
            <h5 className="m-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {class_name}
                </h5>
            <div className="flex justify-end p-5">
                
                <Button
                variant='contained'
                color='primary'
                endIcon={<DownloadIcon/>}
                >
                    Dawnload all
                </Button>
            </div>
        </div>
    );
}
