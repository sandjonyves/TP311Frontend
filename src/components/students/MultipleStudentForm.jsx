import { useState } from "react";
import { Button, Typography, CircularProgress, ImageListItem } from "@mui/material";
import Axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import Papa from "papaparse"; 
import csvImage from '../../assets/csv.png'
const MultipleStudentForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [csvData, setCsvData] = useState(null);
    const [loading, setLoading] = useState(false);  // Nouveau state pour gérer le loading

    const params = useParams();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (
            selectedFile &&
            (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv"))
        ) {
            setFile(selectedFile);
            setError("");
            // Parse the CSV file into JSON
            parseCSVFile(selectedFile);
        } else {
            setFile(null);
            setError("Please upload a valid CSV file.");
        }
    };

    const parseCSVFile = (file) => {
        // Utilisation de PapaParse pour convertir le CSV en JSON
        Papa.parse(file, {
            complete: (result) => {
                setCsvData(result.data); // Stocke les données CSV converties en JSON
                console.log(result.data); // Affiche le JSON pour vérifier
            },
            header: true, // Utiliser la première ligne comme clés de colonnes
            skipEmptyLines: true, // Ignorer les lignes vides
        });
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please upload a CSV file.");
            return;
        }
        if (!csvData) {
            setError("CSV data not parsed correctly.");
            return;
        }

        // Démarrer le loading
        setLoading(true);
        setError(""); // Réinitialiser l'erreur avant d'envoyer la requête

        // Envoi du fichier CSV sous forme de données JSON au backend
        try {
            const response = await Axios.post("app/students/registers/", {
                students: csvData, // Données JSON du CSV
                class_id: params.class_id,
            });

            if (response.status >= 200 && response.status < 300) {
                alert("CSV file successfully uploaded.");
                setFile(null);
                setCsvData(null); // Réinitialiser les données CSV
            } else {
                alert("Failed to upload CSV file. Please try again.");
            }
        } catch (error) {
            console.log("Error uploading CSV:", error);
            setError(
                error.response?.data?.message ||
                "An error occurred while uploading the CSV file."
            );
        } finally {
            // Terminer le loading après la requête
            setLoading(false);
        }
    };

    return (
        <div className="csv-upload-form">
            <Typography variant="h6" style={{ marginBlock: 50 }}>
                Choose a CSV of Students
            </Typography>
            <img src={csvImage} /> 
            <Typography variant="h6" style={{ marginBlock: 2 }}>
                ci dessus ce trouve la stucture d'un csv
            </Typography>

            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="mb-4"
            />
            {error && <Typography color="error">{error}</Typography>}

            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!file || !csvData || loading} 
                style={{ marginTop: 20, position: 'relative' }}
            >
                {loading ? (
                    <CircularProgress size={24} style={{ position: 'absolute' }} />
                ) : (
                    "Save"
                )}
            </Button>
        </div>
    );
};

export default MultipleStudentForm;
