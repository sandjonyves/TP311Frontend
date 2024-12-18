import axios from "axios";

const Axios = axios.create({
    // baseURL:"http://127.0.0.1:8000"
    // baseURL:"https://e-commerce-backend-qmkw.onrender.com/"
    // baseURL:"https://rqaxyn5max.us-east-1.awsapprunner.com/"
    baseURL : 'http://127.0.0.1:8000'

})

export default Axios