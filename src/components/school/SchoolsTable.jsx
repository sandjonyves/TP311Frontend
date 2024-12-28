import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, School2Icon, Search} from "lucide-react";
import { Button } from "@mui/material";
import SchoolForm from "./SchoolForm"; 
import CustomModal from "../reuse/Modal";
import { Link } from "react-router-dom";
import schoolServices from "../../services/api/schoolService";
import { useDispatch, useSelector } from "react-redux";
import SkeletonStatCard from "../reuse/SkeletonCard";
import StatCard from "../common/StatCard";
import SkeletonLoadingTable from "../reuse/SkeletonLoadingTable";

const SchoolsTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [schoolData, setSchoolData] = useState([]);
	const [isLoading,setIsLoading] = useState(false)
    const userSelector = useSelector(state => state.User);
    const dispatch = useDispatch();
    const schoolSelector = useSelector(state => state.school);
	

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = schoolData.filter(
            (school) =>
                school.name.toLowerCase().includes(term) || 
                school.phone.includes(term)
        );
        setFilteredSchools(filtered);
    };

    const fetchSchools = async () => {
		setIsLoading(true)
        try {
			
            const schools = await schoolServices.getSchoolsByUserId(dispatch, setSchoolData,userSelector.id);
            setSchoolData(schoolSelector.schools); // Synchroniser avec Redux
            setFilteredSchools(schools);
        } catch (error) {
            console.error("Failed to fetch schools:", error);
			
        }finally{
			setIsLoading(false)
		}
    };

    useEffect(() => {
        fetchSchools();
    }, [userSelector.id]);

    const refreshSchools = (newSchool) => {
        // Ajouter la nouvelle école localement
        const updatedSchools = [newSchool, ...schoolData];
        setSchoolData(updatedSchools);
        setFilteredSchools(updatedSchools); // Appliquer le filtre si nécessaire
    };

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
						name='Total student'
						icon={School2Icon}
						value={filteredSchools.length}
						color='#6366F1'
					/>}
					
					
					{/* <StatCard name='New Users Today' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' /> */}
					{/* <StatCard
						name='Active Users'
						icon={UserCheck}
						value={userStats.activeUsers.toLocaleString()}
						color='#F59E0B'
					/> */}
					{/* <StatCard name='Churn Rate' icon={UserX} value={userStats.churnRate} color='#EF4444' /> */}
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
                            placeholder="Search schools..."
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                <div className="overflow-x-auto">
				{
					isLoading
					? <SkeletonLoadingTable rows={5} columns={3}/>
                    :<table className="w-full divide-y divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {(filteredSchools).map((school) => (
                                <motion.tr
                                    key={school.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img src={school.logo_url} className="rounded-full h-10 w-10" alt={school.name} />
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
                                        <Link to={`/schools/${school.id}`} className="text-green-400 hover:text-green-300 mr-2">View</Link>
                                        <Link to={`/schools/cards/${school.id}`} className="text-indigo-400 hover:text-indigo-300 mr-2">Cards</Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
				}
                </div>
            </motion.div>

            <CustomModal showModal={showModal} setShowModal={setShowModal}>
                <SchoolForm onSuccess={refreshSchools} />
            </CustomModal>
        </>
    );
};

export default SchoolsTable;
