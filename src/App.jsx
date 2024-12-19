import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import SchoolPage from "./pages/SchoolPage";
import ClassPage from "./pages/ClassPage";
import StudentPage from "./pages/StudentsPage";
import CardPage from "./pages/CardPage";
import CardSavePage from "./pages/CardSavePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import WelcomePage from "./pages/WelcomePage";
import ClassContainer from "./container/ClassContainer";
import SchoolContainer from "./container/SchoolContainer";
import SchoolCardContainer from "./container/SchoolCardContainer";
import ClassCardContainer from "./container/ClassCardContainer";
import { Worker } from '@react-pdf-viewer/core';
import CardView from "./pages/CardView";

function App() {
    const currentRoute = useLocation();
    const userSelector = useSelector((state) => state.User);
    const navigate = useNavigate();
    const isAuthRoute = ["/signup", "/signin"].includes(currentRoute.pathname);

    useEffect(() => {
        if (!userSelector.token && !isAuthRoute) {
            navigate("/signin");
        }
    }, [userSelector.token, isAuthRoute, navigate]);

    return (
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
        <div className={`flex h-screen overflow-hidden ${isAuthRoute ? "bg-gray-100" : "bg-gray-900 text-gray-100"}`}>
             
            {/* Background pour les pages non-auth */}
            {!isAuthRoute && (
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
                    <div className="absolute inset-0 backdrop-blur-sm" />
                </div>
            )}

            {/* Sidebar */}
            {!isAuthRoute && <Sidebar />}
           

            <Routes>
                {userSelector.token ? (
                    <>
                        <Route path="/" element={<SchoolPage />} />
                        <Route path="/classes" element={<ClassPage />} />
                        <Route path="/students" element={<StudentPage />} />
                        <Route path="/classes/:id" element={<ClassContainer />} />
                        <Route path="/schools/:id" element={<SchoolContainer />} />
                        <Route path="/schools/cards/:id" element={<SchoolCardContainer />} />
                        <Route path="/schools/cards/:id/:class_id" element={<ClassCardContainer />} />
                        <Route path="/card/save" element={<CardSavePage />} />
                        <Route path="/cards" element={<CardView />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/sales" element={<SalesPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                    </>
                )}
            </Routes>
           
         </div>
         </Worker>
    );
}

export default App;
