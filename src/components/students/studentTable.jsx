import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusIcon, Search } from "lucide-react";
import { Button } from "@mui/material";
import CustomModal from "../reuse/Modal";
import StudentForm from "./StudentForm";
import MultipleStudentForm from "./MultipleStudentForm";
import { useParams } from "react-router-dom";
import StudentServices from "../../services/api/studentServices";
import { useDispatch, useSelector } from "react-redux";

const StudentsTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalAddMultipleStudents, setShowModalAddMultipleStudents] = useState(false);
    const studentSelector = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        const fetchStudents = () => {
             StudentServices.getStudentByClassId(dispatch,params.id);
                // console.log(params.id)
				console.log(studentSelector)
                    setStudents(studentSelector.student);
                    setFilteredStudents(studentSelector.student);
                // }
           
        };

        fetchStudents();
    }, [dispatch, params.id]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = students.filter(
            (student) =>
                student.firstName.toLowerCase().includes(term) ||
                student.lastName.toLowerCase().includes(term) ||
                student.matricule.includes(term)
        );
        setFilteredStudents(filtered);
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
                    <div className="space-x-5">
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<PlusIcon />}
                            onClick={() => setShowModal((prev) => !prev)}
                        >
                            New
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<PlusIcon />}
                            onClick={() => setShowModalAddMultipleStudents((prev) => !prev)}
                        >
                            New Students
                        </Button>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search students..."
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">First Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Matricule</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date of Birth</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredStudents.map((student, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={student.image_url}
                                            alt={`${student.firstName} ${student.lastName}`}
                                            className="rounded-full h-10 w-10"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">{student.firstName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">{student.lastName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">{student.matricule}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">{student.date_of_birth}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <button className="text-green-400 hover:text-green-300 mr-2">View</button>
                                        <button className="text-indigo-400 hover:text-indigo-300 mr-2">Edit</button>
                                        <button className="text-red-400 hover:text-red-300">Delete</button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <CustomModal showModal={showModal} setShowModal={setShowModal}>
                <StudentForm />
            </CustomModal>
            <CustomModal showModal={showModalAddMultipleStudents} setShowModal={setShowModalAddMultipleStudents}>
                <MultipleStudentForm />
            </CustomModal>
        </>
    );
};

export default StudentsTable;
