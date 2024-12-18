import { agencyReducer, assignmentReducer } from "../../redux/slices/assigmentSlice";
import Axios from "../../utils/axios";

class Assignment {
  
    // Fonction pour enregistrer une nouvelle mission
    async register(assignmentData,dispatch) {
        try {
            const response = await Axios.post('/app/assignments/', assignmentData);

            return response.data;
        } catch (error) {
            console.error("Error registering assignment:", error);
            throw error;
        }
    }
    async registerAgency(agencyData,setIsLoading,setMessageError) {
        setIsLoading(true)
        try {
            const response = await Axios.post('/app/agencies/', agencyData);
            setMessageError('Success Create')
            return response.data;
        } catch (error) {
            console.error("Error registering assignment:", error);
            setMessageError('Error')
            setIsLoading(false)
            throw error;
        }finally{
          
           
            setIsLoading(false)
            
        }
    }
    async getsAgency(dispatch) {
        try {
            const response = await Axios.get(`/app/agencies/`);
            // console.log(response.data)
            dispatch(agencyReducer(response.data));
            return response.data;
        } catch (error) {
            console.error("Error getting agencies:", error);
            throw error; 
        } 
    }
    
    // Fonction pour obtenir toutes les missions
    async get(dispatch,id) {
        try {
            const response = await Axios.get(`/app/assignments/${id}`);
            console.log(response.data)
            dispatch(assignmentReducer(response.data))
            // return response.data;
        } catch (error) {
            console.error("Error getting assignments:", error);
            throw error;
        }
    }
}

const AssignmentInstance =new Assignment()

export default AssignmentInstance 