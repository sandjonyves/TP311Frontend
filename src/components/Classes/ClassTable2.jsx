import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusIcon, School2, Search } from "lucide-react";
import { Button } from "@mui/material";
import CustomModal from "../reuse/Modal";
import ClassForm from "./ClassForm";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClassServices from "../../services/api/ClassServices";
import StatCard from "../common/StatCard";
import SkeletonLoadingTable from "../reuse/SkeletonLoadingTable";
import SkeletonStatCard from "../reuse/SkeletonCard";

const ClassesTable2 = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredClasses, setFilteredClasses] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [initialClassesData, setInitialClassesData] = useState([]);
	const params = useParams();
	const dispatch = useDispatch();
	const schoolSelector = useSelector((state) => state.school);
	const classSelector = useSelector(state => state.class);
	const [isLoading,setIsLoading] =useState(false)

	const schoolsData = schoolSelector.schools || [];

	// Fetch classes by schoolId
	const fetchClasses = async () => {
	  	await ClassServices.getClassBySchoolId(dispatch,setIsLoading ,parseInt(params.id));
		const classes = classSelector.class; // Get the classes from Redux state
		setInitialClassesData(classes);
		setFilteredClasses(classes); // Initially set filtered classes
	};

	// Handle search functionality
	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = initialClassesData.filter((classItem) =>
			classItem.name.toLowerCase().includes(term)
		);
		setFilteredClasses(filtered);
	};

	// Run fetchClasses only when the component mounts or params.id changes
	useEffect(() => {
		fetchClasses();
	}, [dispatch, params.id]);

	// Refresh the classes data after adding a new class
	const refreshClasses = (newClass) => {
		
		// const updatedClasses = [newClass, ...initialClassesData];
		setInitialClassesData((prev)=> [newClass,...prev]);
		setFilteredClasses((prev)=> [newClass,...prev]);
		fetchClasses()
	};


	// if (isLoading){
	// 	return <motion.div
	// 				className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
	// 				initial={{ opacity: 0, y: 20 }}
	// 				animate={{ opacity: 1, y: 0 }}
	// 				transition={{ duration: 1 }}
	// 			> <SkeletonLoadingTable rows={5} columns={4}/>
	// 			</motion.div>
	// }

	return (
		<>
		

		<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					{
						isLoading?
						<SkeletonStatCard/>
						
						:
					<StatCard
			name='Total Class'
			icon={School2}
			value={initialClassesData.length}
			color='#6366F1'
		/>
					}
					</motion.div>


		
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
					onClick={() => setShowModal((prev) => !prev)}
				>
					New
				</Button>

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
			{
						isLoading?
						<SkeletonLoadingTable/>
						
						:
				<table className="w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
								ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
								Class Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-700">
						{/* Use filteredClasses if available, else fallback to classSelector.class */}
						{(filteredClasses).map((classItem) => (
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
									<Link
										to={`/classes/${classItem.id}`}
										className="text-green-400 hover:text-green-300 mr-2"
									>
										View
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
				}
			</div>
		</motion.div>

		<CustomModal showModal={showModal} setShowModal={setShowModal} title={"Class Form"}>
			<ClassForm onSuccess={refreshClasses} schools={schoolsData} />
		</CustomModal>
	</>
	);
};

export default ClassesTable2;
