import { School2, UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import SchoolsTable from "../components/school/SchoolsTable";
import ClassesTable from "../components/Classes/ClassTable";
import ClassesTable2 from "../components/Classes/ClassTable2";
import ClassServices from "../services/api/ClassServices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";



const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};


const SchoolContainer = () => {
	const dispatch = useDispatch()
	const classSelector = useSelector(state=> state.class)

	const {id}= useParams()


// 	useEffect(() => {
	
// 		ClassServices.getClassBySchoolId(dispatch, parseInt(id)).finally(() => {
			
// 		});
	
// }, [dispatch]);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Classes of School ' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				{/* <motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Class'
						icon={School2}
						value={classSelector.class.length}
						color='#6366F1'
					/>
				
				</motion.div> */}
                <ClassesTable2/>
				{/* <UsersTable /> */}

				{/* USER CHARTS */}
				{/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart />
				</div> */}
			</main>
		</div>
	);
};
export default SchoolContainer;
