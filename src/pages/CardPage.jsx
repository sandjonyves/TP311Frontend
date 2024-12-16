import { School, School2, UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import SchoolsTable from "../components/school/SchoolsTable";



const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};

const CardPage = () => {
	return (
            <div className='flex-1 overflow-auto relative z-10'>
                {/* <Header title='Schools' /> */}

                <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                    {/* STATS */}
                    <motion.div
                        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* <StatCard
                            name='Total School'
                            icon={School}
                            value={5}
                            color='#6366F1'
                        />
                       */}

                    </motion.div>
                  


                </main>
            </div>
	);
};
export default CardPage;
