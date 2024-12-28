import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Snackbar } from "@mui/material";
import ClassServices from "../../services/api/ClassServices";
import { useParams } from "react-router-dom";

const ClassForm = ({ selectedSchool, schools, onSuccess }) => {
  const [className, setClassName] = useState("");
  const [schoolId, setSchoolId] = useState(selectedSchool);
  const [isLoading, setIsLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {school_id} = useParams()

  useEffect(() => {
    setSchoolId(selectedSchool); // Met à jour le schoolId lorsque selectedSchool change
  }, [selectedSchool]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (className.trim() === "") return;

    const newClass = {
      name: className,
      school: parseInt(school_id),
    };

    setIsLoading(true);
    setRequestMessage("");

    try {
      const createdClass = await ClassServices.createClass(newClass,setSnackbarOpen,setRequestMessage); // Assurez-vous que cette méthode retourne les données de la classe créée
      setRequestMessage("Class created successfully!");
      setSnackbarOpen(true);
      setClassName("");

      // Appeler onSuccess si défini
      if (onSuccess) {
        onSuccess(createdClass);
      }
    } catch (error) {
      console.log("Error creating class:", error);
      setRequestMessage("Failed to create class. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
      {requestMessage && <h3 className={`text-${requestMessage.includes("success") ? "green" : "red"}-500`}>{requestMessage}</h3>}

      {/* <FormControl variant="outlined" fullWidth>
        <InputLabel id="school-select-label" style={{ color: "gray" }}>
          Select School
        </InputLabel>
        <Select
          labelId="school-select-label"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          label="Select School"
          style={{ color: "white" }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: "#374151",
                color: "white",
              },
            },
          }}
          InputLabelProps={{ style: { color: "gray" } }}
        >
          {schools.map((school) => (
            <MenuItem key={school.id} value={school.id} style={{ color: "white" }}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      <TextField
        label="Class Name"
        variant="outlined"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        required
        InputLabelProps={{ style: { color: "gray" } }}
        style={{ color: "white" }}
      />

      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Enregistrer"}
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={requestMessage}
      />
    </form>
  );
};

export default ClassForm;
