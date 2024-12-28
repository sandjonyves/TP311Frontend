import axios from "axios";

const Axios = axios.create({
   
    // baseURL:"https://tp331-backend-1.onrender.com"
    baseURL : 'http://127.0.0.1:8000'
// 
})

export default Axios