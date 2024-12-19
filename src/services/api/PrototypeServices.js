import Axios from '../../utils/axios';
import {
    fetchPrototypeStart,
    fetchPrototypeSuccess,
    fetchPrototypeFailure,
    setPrototype,
} from '../../redux/slices/prototyprSlice'; // Ajustez le chemin

const PrototypeServices = {
    // Crée une nouvelle classe
    createPrototype: async (classData, setIsLoading, setRequestMessage) => {
        setIsLoading(true);
        try {
            const response = await Axios.post('/app/prototype/', classData);
            setRequestMessage(response.data.statusText);
            console.log(response)
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.statusText: error.message;
            setRequestMessage(errorMessage);
            throw errorMessage;
        } finally {
            setIsLoading(false);
        }
    },

    // Récupère tous les prototypes
    getPrototype : async (dispatch) => {
        try {
            const response = await Axios.get('/app/prototype/');
            console.log(response.data)

            dispatch(fetchPrototypeSuccess(response.data));
            // console.log(response.data)
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            throw errorMessage;
        }
    },

    // Récupère le prototype choisi
    getPrototypeChoice: async (dispatch) => {
        try {
            const response = await Axios.get('/app/prototype/get-choice/');
            console.log(response.data)

            dispatch(setPrototype(response.data));
            // console.log(response.data)
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            throw errorMessage;
        }
    },

      // Récupère le prototype choisi
      setPrototypeChoice: async (dispatch,prototype_id) => {
        try {
            const response = await Axios.post(`/app/prototype/${prototype_id}/set-choice/`);
            console.log(response.data)

            dispatch(setPrototype(response.data));
            // console.log(response.data)
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            throw errorMessage;
        }
    },

    // Récupère un prototype par son ID
    getPrototypeById: async (id) => {
        try {
            const response = await Axios.get(`/app/prototype/${id}/`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            throw errorMessage;
        }
    },

    // Met à jour une classe
    updateClass: async (id, classData) => {
        try {
            const response = await Axios.put(`/app/prototype/${id}/`, classData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            throw errorMessage;
        }
    },

    // Supprime une classe
    deleteClass: async (id) => {
        try {
            const response = await Axios.delete(`/app/prototype/${id}/`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            throw errorMessage;
        }
    },
};

export default PrototypeServices;
