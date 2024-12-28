import {  UsersIcon } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import StudentsTable from "../components/students/studentTable";

import { useSelector } from "react-redux";
import ClassCardContainer from "./ClassCardContainer";




const ClassContainer = () => {

    const studentSelector = useSelector(state=>state.student)

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<ClassCardContainer />
			<Header title='Students' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
						{/* {
						isLoading?
						<SkeletonStatCard/>
						
						:
					<StatCard
			name='Total Class'
			icon={School2}
			value={classSelector.class.length}
			color='#6366F1'
		/> */}
					{/* } */}
					{/* <StatCard
						name='Total student'
						icon={UsersIcon}
						value={studentSelector.student.length}
						color='#6366F1'
					/> */}
					{/* <StatCard name='New Users Today' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' /> */}
					{/* <StatCard
						name='Active Users'
						icon={UserCheck}
						value={userStats.activeUsers.toLocaleString()}
						color='#F59E0B'
					/> */}
					{/* <StatCard name='Churn Rate' icon={UserX} value={userStats.churnRate} color='#EF4444' /> */}
				</motion.div>
                <StudentsTable />
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
export default ClassContainer;
