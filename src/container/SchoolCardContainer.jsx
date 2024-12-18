// import React, { useEffect, useState } from 'react'
// import Header from '../components/common/Header'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import ClassServices from '../services/api/ClassServices';
// import CardClass from '../components/Classes/CardClass';
// import PrototypeServices from '../services/api/PrototypeServices';

// export default function SchoolCardContainer() {

//     const params = useParams();
//     const dispatch = useDispatch();

//     const classSelector = useSelector((state) => state.class);
//     const prototypeSelector = useSelector((state) => state.Prototype); // Correction : clé en minuscule

//     const [classes, setClasses] = useState([]);
//     const [prototype, setPrototype] = useState(null);

//     useEffect(() => {
//         // Appels d'API pour récupérer les données
    
//      ClassServices.getClassBySchoolId(dispatch, params.id);
//         PrototypeServices.getPrototypeChoice(dispatch);
     
//     }, [dispatch, params.id]);

//     useEffect(() => {
//         // Met à jour l'état une fois les données disponibles
//         if (classSelector.class) setClasses(classSelector.class);
//         if (prototypeSelector.setPrototype) setPrototype(prototypeSelector.setPrototype);
//     }, [classSelector, prototypeSelector]);

//   return (
//     <div className='flex-1 overflow-auto relative z-10'>
//     <Header title='Schools' />
//     dfsfdsf
//     </div>
//   )
// }



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ClassServices from '../services/api/ClassServices';
import CardClass from '../components/Classes/CardClass';
import PrototypeServices from '../services/api/PrototypeServices';

export default function SchoolCardContainer() {
    const params = useParams();
    const dispatch = useDispatch();

    const classSelector = useSelector((state) => state.class);
    const prototypeSelector = useSelector((state) => state.Prototype); // Correction : clé en minuscule

    const [classes, setClasses] = useState([]);
    const [prototype, setPrototype] = useState(null);

    useEffect(() => {
        // Appels d'API pour récupérer les données
        const fetchData = async () => {
            await ClassServices.getClassBySchoolId(dispatch, params.id);
            await PrototypeServices.getPrototypeChoice(dispatch);
        console.log(prototypeSelector)
        };

        fetchData();
    }, [dispatch, params.id]);

    useEffect(() => {
        // Met à jour l'état une fois les données disponibles
        if (classSelector.class) setClasses(classSelector.class);
        // if (prototypeSelector.setPrototype) setPrototype(prototypeSelector.setPrototype);
    }, [classSelector, prototypeSelector]);

    return (
        <div className='relative'>
           <div className='grid grid-cols-4 md:grid-cols-2 gap-3'>
           {classes.length > 0 ? (
                classes.map((classeItem) => (
                    <CardClass
                        key={classeItem.id}
                        img_url={prototypeSelector.setPrototype?.image || ''}
                        class_id={classeItem.id}
                        class_name={classeItem.name || 'Unnamed Class'}
                    />
                ))
            ) : (
                <p>No classes available.</p>
            )}
           </div>
         
        </div>
    );
}
