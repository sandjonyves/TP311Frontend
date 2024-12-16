import React, { useState } from "react";
import { Button, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

const ClassForm = ({ selectedSchool, onSubmit }) => {
	const [className, setClassName] = useState("");
	const [schoolId, setSchoolId] = useState(selectedSchool);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (className.trim() === "") return;

		const newClass = {
			id: Date.now(),
			name: className,
			schoolId: schoolId,
		};

		onSubmit(newClass);
		setClassName("");
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
			<FormControl variant="outlined">
				<InputLabel id="school-select-label "style={{color:'gray'}} >Select School</InputLabel>
				<Select
					labelId="school-select-label"
					value={schoolId}
					onChange={(e) => setSchoolId(e.target.value)}
					label="Select School"
                    style={{
                        color:'white'
                    }}
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
					<MenuItem value={1} style={{ color: 'white' }}>École Primaire A</MenuItem>
					<MenuItem value={2} style={{ color: 'white' }}>Collège B</MenuItem>
					<MenuItem value={3} style={{ color: 'white' }}>Lycée C</MenuItem>
				</Select>
			</FormControl>

			<TextField
				label="Class Name"
				variant="outlined"
				value={className}
				onChange={(e) => setClassName(e.target.value)}
				required
				InputLabelProps={{ style: { color: 'gray' } }}
                    style={{
                        color:'white'
                    }}
				
				
			/>

			<Button variant="contained" color="primary" type="submit">
				Enregistrer
			</Button>
		</form>
	);
};

export default ClassForm;