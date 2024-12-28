import Axios from '../../utils/axios';
import { fetchClassStart ,fetchClassSuccess,fetchClassFailure} from '../../redux/slices/classSlice'; // Ajustez le chemin

const ClassServices = {
    // Create a new Class
    createClass: async (ClassData,setIsLoading,setREquestMessage) => {
        setIsLoading(true)
        try {
            const response = await Axios.post('/app/classes/', ClassData);
            setREquestMessage(response.data.message)
            setIsLoading(false)
            console.log(response)
            return response.data;
        
        } catch (error) {
            setREquestMessage(error.message)
            setIsLoading(false)
            console.log(error)
            throw error.response ? error.response.data : error.message;
        }
    },

    // Get all Classs
    getClass: () => async (dispatch) => {
        dispatch(fetchClassStart());
        try {
            const response = await Axios.get('/app/classes/');
            dispatch(fetchClassSuccess(response.data));
        } catch (error) {
            dispatch(fetchClassFailure(error.response ? error.response.data : error.message));
        }
    },
    

    async getClassBySchoolId(dispatch,setIsLoading,school_id){
        setIsLoading(true)
        try {
            const response = await Axios.get(`/app/classes/school/${school_id}/`);
            console.log('classe',response.data)
            dispatch(fetchClassSuccess(response.data));
            setIsLoading(false)

            return response.data;
        } catch (error) {
            setIsLoading(false)

            throw error.response ? error.response.data : error.message;
        }
    },

    



    // Get a Class by ID
    getClassById: async (id) => {
        try {
            const response = await Axios.get(`/app/classes/${id}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    // Update a Class
    updateClass: async (id, ClassData) => {
        try {
            const response = await Axios.put(`/app/classes/${id}/`, ClassData);
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

export default ClassServices;