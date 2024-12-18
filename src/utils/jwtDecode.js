import { jwtDecode } from "jwt-decode";

function decode() {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken);
            return decodedToken
            // Vous pouvez ajouter d'autres logiques ici, comme stocker des informations dans l'état global ou mettre à jour l'UI
        } catch (error) {
            console.error("Invalid token:", error);
        }
    } else {
        console.log("No token found in localStorage.");
    }
}