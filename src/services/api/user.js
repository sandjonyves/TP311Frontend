
import { setUser,clearUser } from "../../redux/slices/userSlice"
import Axios from "../../utils/axios"
import { jwtDecode } from "jwt-decode"


class User{

    userRegister(dispatch, formData, navigate, setIsLoading, setMessageError) {
                setIsLoading(true);
        
                Axios.post('/account/register/', formData)
                    .then((response) => {
                        console.log(response);
                        setMessageError('Account created successfully!');
                        setIsLoading(false);
        
                        // const token = response.data.access; 
                        const decodedToken = jwtDecode(response.data.access);
                        const userData = {token:response.data.access, id:decodedToken.id,username: formData.username, email: formData.email }; // Ajustez selon votre réponse
                        dispatch(setUser(userData)); // Stockez les données de l'utilisateur dans le store
                        navigate('/'); // Redirection après l'enregistrement
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsLoading(false);
                        setMessageError(error.response.data.message); // Affichez le message d'erreur
                    });
            }
           
        
    // userLogin(dispatch,formData,navigate,setIsLoading,setMessageError){
      

    //     setIsLoading(true)
    //     Axios.post('/account/login',{'email':formData.email,'password':formData.password})
    //     .then((response)=>{
            
    //         setIsLoading(false)
    //         setMessageError('')           
    //         dispatch(login(response.data.access))
    //         // rediection  
    //         navigate('/dashboard')
       
            
    //     })
    //     .catch((error)=>{
        
    //         setIsLoading(false)
    //         console.log(error.response.data.message)
    //         setMessageError(error.response.data.message)
    //         // setIsLoading(false)
    //         // console.log(error.response)
    //         // console.log(error)
    //     //    alert(error)
    //     })
    // }


    userLogin(dispatch, formData, navigate, setIsLoading, setMessageError) {
        setIsLoading(true);
        Axios.post('/account/login/', { 'email': formData.email, 'password': formData.password })
            .then((response) => {
                setIsLoading(false);
                setMessageError('');

                const token = response.data.access; 
                const decodedToken = jwtDecode(token); // Décodez le token pour obtenir les données de l'utilisateur
                const userData = {
                    token: response.data.access,
                    id:decodedToken.id,
                    username: decodedToken.username, // Assurez-vous que ces champs existent dans le token
                    email: decodedToken.email,
                };
                
                dispatch(setUser(userData)); // Stockez les données de l'utilisateur dans le store
                navigate('/'); // Redirection après connexion
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error.response.data.message);
                setMessageError(error.response.data.message); // Affichez le message d'erreur
            });
    }

        userLogout(dispatch, user, navigate, setIsLoading) {
        setIsLoading(true);
        Axios.post(`/account/logout/${user.id}`)
            .then((response) => {
                console.log(response);
                setIsLoading(false);

                // Effacer les données d'authentification dans le store
                dispatch(clearUser());
                navigate('/signin'); // Redirection après déconnexion
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }
}


    // userLogout(dispatch,user,navigate,setIsLoading){
    //     setIsLoading(true)
    //     Axios.post(`/account/logout/${user.id}`)
    //     .then((response)=>{
    //         console.log(response)
    //         setIsLoading(false)    

    //         // Anhilation des donnees d'authetification dans le store 
    //         dispatch(login(null))
    //         navigate('/signin')             
    //     })
    //     .catch((error)=>{
    //         setIsLoading(false)
    //         console.log(error)
           
    //     })
    // }



const userServices = new User()

export default userServices

// import { setUser, clearUser } from "../../redux/slices/userSlices"; // Importez les actions
// import Axios from "../../utils/axios";
// import jwtDecode from "jwt-decode"; // Assurez-vous que jwt-decode est installé

// class User {



// const userServices = new User();
// export default userServices;