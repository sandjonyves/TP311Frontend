import Axios from '../../utils/axios';
import { fetchStudentStart, fetchStudentSuccess, fetchStudentFailure } from '../../redux/slices/studentSlice'; // Ajustez le chemin

const StudentServices = {
    // Create a new Class
    createStudent: async (studentData, setIsLoading, setRequestMessage) => {
        setIsLoading(true);
        try {
            const response = await Axios.post('/app/students/', studentData);
            console.log(response.data)
            // updateStudents(response.data)
            setRequestMessage('Student added successfully!');
            return response.data;
        } catch (error) {
            console.log(error)
            setRequestMessage('Failed to add student. Please try again.');
            
            // throw error.response ? error.response.data : error.message;
        } finally {
            setIsLoading(false);
        }
    },

    // Get all Classes
    getClasses: () => async (dispatch) => {
        dispatch(fetchStudentStart());
        try {
            const response = await Axios.get('/app/classes/');
            dispatch(fetchStudentSuccess(response.data));
        } catch (error) {
            dispatch(fetchStudentFailure(error.response ? error.response.data : error.message));
        }
    },

    // Get Classes by School ID
    getStudentByClassId: async (dispatch, setIsLoading,schoolId) => {
        setIsLoading(true)
        try {
            const response = await Axios.get(`/app/students/classe/${parseInt(schoolId)}/`);
            setIsLoading(false)
            dispatch(fetchStudentSuccess(response.data));
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Get a Class by ID
    getStudentById: async (id) => {
        try {
            const response = await Axios.get(`/app/classes/${id}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Update a Class
    updateStudent: async (id, studentData) => {
        try {
            const response = await Axios.put(`/app/classes/${id}/`, studentData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Delete a Class
    deleteClass: async (id) => {
        try {
            const response = await Axios.delete(`/app/classes/${id}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

export default StudentServices;