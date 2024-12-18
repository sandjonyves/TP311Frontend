import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import StudentServices from '../services/api/studentServices';


export default function ClassCardContainer() {
    const studentSelector = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const [students,setStudents] = useState()


    const params = useRoutes()
    useEffect(() => {
        const fetchStudents = () => {
             StudentServices.getStudentByClassId(dispatch,params.class_id);
                // console.log(params.id)
				console.log(studentSelector)
                    setStudents(studentSelector.student);
                    // setFilteredStudents(studentSelector.student);
                // }
           
        };

        fetchStudents();
    }, [dispatch, params.class_id]);
  return (
    <div>

        {students.map(()=>{
            
        })}


    </div>
  )
}
