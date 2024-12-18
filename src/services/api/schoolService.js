import Axios from '../../utils/axios';
import { fetchSchoolsStart, fetchSchoolsSuccess, fetchSchoolsFailure } from '../../redux/slices/schoolSlice'; // Ajustez le chemin

const schoolServices = {
    // Create a new school
    createSchool: async (schoolData,setIsLoading,setMessageError) => {
        setIsLoading(true)
        try {
            const response = await Axios.post('/app/school/', schoolData);
            setMessageError(response.data.message)
            setIsLoading(false)
            console.log(response)
            return response.data;
        
        } catch (error) {
            setMessageError(error.message)
            setIsLoading(false)
            console.log(error)
            throw error.response ? error.response.data : error.message;
        }
    },

    // Get all schools
    getSchools: () => async (dispatch) => {
        dispatch(fetchSchoolsStart());
        try {
            const response = await Axios.get('/app/school/');
            dispatch(fetchSchoolsSuccess(response.data));
        } catch (error) {
            dispatch(fetchSchoolsFailure(error.response ? error.response.data : error.message));
        }
    },
    

    async getSchoolsByUserId(dispatch,setSchoolsData,user_id){
        try {
            const response = await Axios.get(`/app/schools/user/${user_id}/`);
            dispatch(fetchSchoolsSuccess(response.data));
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    



    // Get a school by ID
    getSchoolById: async (id) => {
        try {
            const response = await Axios.get(`/app/school/${id}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Update a school
    updateSchool: async (id, schoolData) => {
        try {
            const response = await Axios.put(`/app/school/${id}/`, schoolData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Delete a school
    deleteSchool: async (id) => {
        try {
            const response = await Axios.delete(`/app/school/${id}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

export default schoolServices;