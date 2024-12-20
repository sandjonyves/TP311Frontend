import { BarChart2, ClipboardList, CreditCardIcon, DollarSign, LogOutIcon, Menu, School, Settings, ShoppingBag, ShoppingCart, TrendingUp, User, User2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import userServices from "../../services/api/user";
import { useDispatch, useSelector } from "react-redux";

const SIDEBAR_ITEMS = [
    { name: "School", icon: School, color: "#6366f1", href: "/" },
    { name: "Classes", icon: ClipboardList, color: "#8B5CF6", href: "/classes" },
    // { name: "Students", icon: Users, color: "#EC4899", href: "/students" },
    { name: "Card", icon: CreditCardIcon, color: "#8B5CF6", href: "/cards" },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
    { name: "Logout", icon: LogOutIcon, color: "red", href: "/signin" }
];

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userSelector = useSelector(state => state.User);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(userSelector);
    }, [userSelector]); // Ajout de userSelector comme dépendance

    const handleLogout = () => {
        userServices.userLogout(dispatch, userSelector, navigate);
    };

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
                >
                    <Menu size={24} />
                </motion.button>

                <nav className='mt-8 flex-grow'>
                    {userSelector.token ? (
                        <>
                            {SIDEBAR_ITEMS.map((item) => (
                                <Link key={item.name} to={item.href} onClick={item.name === 'Logout' ? handleLogout : undefined}>
                                    <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
                                        <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                        <AnimatePresence>
                                            {isSidebarOpen && (
                                                <motion.span
                                                    className='ml-4 whitespace-nowrap'
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2, delay: 0.3 }}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </Link>
                            ))}
                        </>
                    ) : null}
                </nav>
            </div>
        </motion.div>
    );
};

export default Sidebar;