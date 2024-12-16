import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

const MultipleStudentForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "text/csv") {
            setFile(selectedFile);
            setError("");
        } else {
            setError("Please upload a valid CSV file.");
        }
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append("csv", file);

          
        //     fetch("YOUR_BACKEND_ENDPOINT", {
        //         method: "POST",
        //         body: formData,
        //     })
        //     .then((response) => {
        //         if (response.ok) {
        //             alert("CSV file successfully uploaded.");
        //             // Reset the file input
        //             setFile(null);
        //         } else {
        //             alert("Failed to upload CSV file.");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error uploading CSV:", error);
        //         alert("An error occurred while uploading the CSV file.");
        //     });
        }
    };

    return (
        <div className="csv-upload-form">
            <Typography variant="h6" style={{marginBlock:50}}>
                Choises CSV of Students
            </Typography>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="mb-4"
            />
            {error && <div className="text-red-500">{error}</div>}
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!file}
            >
                Upload CSV
            </Button>
        </div>
    );
};

export default MultipleStudentForm;