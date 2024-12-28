import Axios from '../../utils/axios';
import { fetchSchoolsStart, fetchSchoolsSuccess, fetchSchoolsFailure } from '../../redux/slices/schoolSlice'; // Ajustez le chemin

const schoolServices = {
    // Create a new school
    createSchool: async (schoolData,setIsLoading,setMessageError) => {
        setIsLoading(true)
        try {
            const response = await Axios.post('/app/schools/', schoolData);
            setMessageError('create School successfully ')
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
            const response = await Axios.get('/app/schools/');
            dispatch(fetchSchoolsSuccess(response.data));
        } catch (error) {
            dispatch(fetchSchoolsFailure(error.response ? error.response.data : error.message));
        }
    },
    

    async getSchoolsByUserId(dispatch,setSchoolsData,user_id){
        try {
            const response = await Axios.get(`/app/schools/user/${user_id}/`);
            console.log('user school', response.data)
            dispatch(fetchSchoolsSuccess(response.data));
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    



    // Get a school by ID
    getSchoolById: async (id) => {
        try {
            const response = await Axios.get(`/app/schools/${id}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Update a school
    updateSchool: async (id, schoolData) => {
        try {
            const response = await Axios.put(`/app/schools/${id}/`, schoolData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Delete a school
    deleteSchool: async (id) => {
        try {
            const response = await Axios.delete(`/app/schools/${id}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

export default schoolServices;