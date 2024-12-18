import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusIcon, Search } from "lucide-react";
import { Button, MenuItem, Select, FormControl, InputLabel, Snackbar } from "@mui/material";
import CustomModal from "../reuse/Modal";
import ClassForm from "./ClassForm"; // Assuming you have a ClassForm component
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClassServices from "../../services/api/ClassServices";

const ClassesTable2 = () => {
	const [selectedSchool, setSelectedSchool] = useState('');
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredClasses, setFilteredClasses] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [requestMessage, setRequestMessage] = useState("");
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const currentRoute = useLocation();
	const schoolSelector = useSelector(state => state.school);
	const classSelector  = useSelector(state => state.class)

    const params =useParams()

	const dispatch = useDispatch();

	const initialClassesData = classSelector.class || [{}];

	// Update schoolsData based on Redux state
	const schoolsData = schoolSelector.schools || [];

	// Effect to set initial classes based on selected school
	// useEffect(() => {
		
	// 		const initialFilteredClasses = initialClassesData.filter(
	// 			(classItem) => classItem.school === Number(selectedSchool)
	// 		);
	// 		setFilteredClasses(initialFilteredClasses);
	
	// }, [dispatch]);

	const handleSchoolChange = (event) => {
		setSelectedSchool(event.target.value);
	};

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = initialClassesData.filter(
			(classItem) =>
				classItem.name.toLowerCase().includes(term) &&
				classItem.school === Number(selectedSchool)
		);
        
		setFilteredClasses(filtered);
	};

	useEffect(() => {
        
		
			ClassServices.getClassBySchoolId(dispatch,parseInt(params.id));
            setFilteredClasses(classSelector.class)
		
	}, [ dispatch]);

	

	

	return (
		<>
			<motion.div
				className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className="flex justify-between items-center mb-6">
					<Button
						variant="contained"
						color="primary"
						endIcon={<PlusIcon />}
						onClick={() => setShowModal(prev => !prev)}
						disabled={isLoading} // Disable while loading
					>
						{isLoading ? "Loading..." : "New"}
					</Button>
					{/* <FormControl variant="outlined" className="mr-4 w-1/2">
						<InputLabel id="school-select-label" style={{ color: "white" }}>
							Select School
						</InputLabel>
						<Select
							labelId="school-select-label"
							value={selectedSchool}
							onChange={handleSchoolChange}
							label="Select School"
							style={{ color: "white" }}
						>
							{schoolsData.map((school) => (
								<MenuItem key={school.id} value={school.id}>
									{school.name}
								</MenuItem>
							))}
						</Select>
					</FormControl> */}
					<div className="relative">
						<input
							type="text"
							placeholder="Search classes..."
							className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={searchTerm}
							onChange={handleSearch}
						/>
						<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full divide-y divide-gray-700">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Class Name</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700">
							{filteredClasses.map((classItem) => (
								<motion.tr
									key={classItem.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-300">{classItem.id}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-300">{classItem.name}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<Link to={`/classes/${classItem.id}`} className="text-green-400 hover:text-green-300 mr-2">
											view
										</Link>
										<button className="text-indigo-400 hover:text-indigo-300 mr-2">
											Edit
										</button>
										<button className="text-red-400 hover:text-red-300">
											Delete
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>

			<CustomModal showModal={showModal} setShowModal={setShowModal} title={'CLASSES FORM'}>
				<ClassForm 
					selectedSchool={selectedSchool} 
					schools={schoolsData} 
				/>
			</CustomModal>

			{/* <Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				message={requestMessage}
			/> */}
		</>
	);
};

export default ClassesTable2;