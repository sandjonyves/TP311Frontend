import { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, Search } from "lucide-react";
import { Button } from "@mui/material";
import Modal from "../reuse/Modal";
import SchoolForm from "./SchoolForm"; 
import CustomModal from "../reuse/Modal";

const schoolData = [
	{ id: 1, name: "École Primaire A", phoneNumber: "01 23 45 67 89", logo: "url_du_logo_a" },
	{ id: 2, name: "Collège B", phoneNumber: "01 23 45 67 90", logo: "url_du_logo_b" },
	{ id: 3, name: "Lycée C", phoneNumber: "01 23 45 67 91", logo: "url_du_logo_c" },
];

const SchoolsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(schoolData);
	const [showModal, setShowModal] = useState(false);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = schoolData.filter(
			(school) => 
				school.name.toLowerCase().includes(term) || 
				school.phoneNumber.includes(term) // Corrected to use phoneNumber
		);
		setFilteredUsers(filtered);
	};

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
							placeholder="Search users..."
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
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Phone Number
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700">
							{filteredUsers.map((school) => (
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
													{school.name.charAt(0)}
												</div>
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-100">
													{school.name}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-300">{school.phoneNumber}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<button className="text-green-400 hover:text-green-300 mr-2">
											Consulter
										</button>
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

			<CustomModal showModal={showModal} setShowModal={setShowModal}>
				<SchoolForm />
			</CustomModal>
		</>
	);
};

export default SchoolsTable;