import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, Search } from "lucide-react";
import { Button } from "@mui/material";
import SchoolForm from "./SchoolForm"; 
import CustomModal from "../reuse/Modal";
import { Link } from "react-router-dom";
import schoolServices from "../../services/api/schoolService";
import { useDispatch, useSelector } from "react-redux";

const SchoolsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredSchools, setFilteredSchools] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [schoolData, setSchoolData] = useState([]); // Initialise comme un tableau vide
	const userSelector = useSelector(state => state.User);
	const dispatch =useDispatch()
	const schoolSelector = useSelector(state=> state.school)

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = schoolSelector.schools.filter(
			(school) => 
				school.name.toLowerCase().includes(term) || 
				school.phone.includes(term)
		);
		setFilteredSchools(filtered);
	};

	useEffect(() => {
		const fetchSchools = async () => {
			
			try {
				const schools = await schoolServices.getSchoolsByUserId(dispatch,setSchoolData,userSelector.id);
				setSchoolData( schoolSelector.schools);
				// console.log(schoolSelector.schools)
				setFilteredSchools(schools); 
			} catch (error) {
				console.error("Failed to fetch schools:", error);
			}
		};

		fetchSchools();
	}, [userSelector.id]);

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
					>
						New
					</Button>
					<div className="relative">
						<input
							type="text"
							placeholder="Search schools..."
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
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone Number</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700">
							{filteredSchools.map((school) => (
								<motion.tr
									key={school.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="flex-shrink-0 h-10 w-10">
												<div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
													<img src={school.logo_url} className="rounded-full h-10 w-10 "/>
												</div>
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-100">{school.name}</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-300">{school.phone}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<Link to={`/schools/${school.id}`} className="text-green-400 hover:text-green-300 mr-2">view</Link>
										<Link to={`/schools/cards/${school.id}`}  className="text-indigo-400 hover:text-indigo-300 mr-2">Cards</Link>
										{/* <button className="text-red-400 hover:text-red-300">Delete</button> */}
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>

			<CustomModal showModal={showModal} setShowModal={setShowModal}>
				<SchoolForm />
			</CustomModal>
		</>
	);
};

export default SchoolsTable;