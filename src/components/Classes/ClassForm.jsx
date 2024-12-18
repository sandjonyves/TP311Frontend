import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Snackbar } from "@mui/material";
import ClassServices from "../../services/api/ClassServices";

const ClassForm = ({ selectedSchool, schools }) => {
	const [className, setClassName] = useState("");
	const [schoolId, setSchoolId] = useState(selectedSchool);
	const [isLoading, setIsLoading] = useState(false);
	const [requestMessage, setRequestMessage] = useState("");
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	useEffect(() => {
		setSchoolId(selectedSchool); // Met à jour le schoolId lorsque selectedSchool change
	}, [selectedSchool]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (className.trim() === "") return;

		const newClass = {
			name: className,
			school: schoolId,
		};

		// setIsLoading(true);
	
			ClassServices.createClass(newClass,setIsLoading,setRequestMessage);
			// setRequestMessage("Class created successfully!");
			// onSubmit(newClass);
			// setClassName("");
		
			// setSnackbarOpen(true);
		
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
			{
				requestMessage && <h3 className="text-red-500"> {requestMessage}</h3>
			}
			<FormControl variant="outlined" fullWidth>
				<InputLabel id="school-select-label" style={{ color: 'gray' }}>Select School</InputLabel>
				<Select
					labelId="school-select-label"
					value={schoolId}
					onChange={(e) => setSchoolId(e.target.value)}
					label="Select School"
					style={{ color: 'white' }}
					MenuProps={{
						PaperProps: {
							style: {
								backgroundColor: '#374151',
								color: 'white',
							},
						},
					}}
					InputLabelProps={{ style: { color: 'gray' } }}
				>
					{schools.map((school) => (
						<MenuItem key={school.id} value={school.id} style={{ color: 'white' }}>
							{school.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<TextField
				label="Class Name"
				variant="outlined"
				value={className}
				onChange={(e) => setClassName(e.target.value)}
				required
				InputLabelProps={{ style: { color: 'gray' } }}
				style={{ color: 'white' }}
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