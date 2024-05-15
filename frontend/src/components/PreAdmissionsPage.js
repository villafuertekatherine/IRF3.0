import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios to make HTTP requests
import '../css/PreAdmissionsPage.css';
import ConfirmationModal from '../notifications/ConfirmationModal';
import SuccessModal from '../notifications/SuccessModal';

const PreAdmissionsPage = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [patients, setPatients] = useState([]); // State to store patients data
    const [admissions, setAdmissions] = useState([]); // State to store admissions data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [showAdmitSuccessModal, setShowAdmitSuccessModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');

    useEffect(() => {
        fetchPatients(); // Call the function to fetch patients data
        fetchAdmissions(); // Call the function to fetch admissions data
    }, []);

    //Function to fetch patients
    const fetchPatients = async () => {
        console.log("Fetching patients...");
        try {
            const response = await axios.get('http://localhost:8080/api/patients');
            console.log('Patients fetched:', response.data);
            setPatients(response.data || []);
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        }
    };

    // Function to fetch admissions data
    const fetchAdmissions = async () => {
        try {
             const response = await axios.get('http://localhost:8080/api/admissions'); // Adjust the API URL as needed
             console.log('Admissions fetched:', response.data);
             setAdmissions(response.data || []);
        } catch (error) {
             console.error('Failed to fetch admissions:', error);
        }
    };

    const isValidPatient = (patient) => {
        // Required fields to confirm patient is valid for admission
        return patient.status && patient.source && patient.name && patient.age &&
               patient.sex && patient.plan && patient.dx && patient.presented &&
               patient.notes && patient.mso && patient.sixtyPercentRule;
    };

    const handleAdmit = async () => {
        if (selectedPatientId && selectedRoom && admissionDate) {
            try {
                const payload = {
                    room_number: selectedRoom,
                    admission_date: admissionDate
                };
                const response = await axios.post(`http://localhost:8080/api/admit-patient/${selectedPatientId}`, payload);
                console.log('Patient admitted:', response.data);
                closeModal(); // Close the modal
                setShowAdmitSuccessModal(true); // Show the success modal
            } catch (error) {
                console.error('Failed to admit patient:', error);
                closeModal(); // Ensure modal is closed on error too
            }
        } else {
            alert("Please select a room and date before submitting.");
        }
    };

    const openModal = (patientId) => {
        setSelectedPatientId(patientId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="page-container">
            <h1>Pre-Admissions Page</h1>
            {/* Admissions Section */}
            <section>
                <h2>Admissions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Plan</th>
                            <th>DX</th>
                            <th>Notes</th>
                            <th>60% Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(admissions) && admissions.map((admission) => (
                            <tr key={admission.id}>
                                <td>
                                    <button onClick={() => navigate(`/edit-admission/${admission.id}`)}>
                                        Edit
                                    </button>
                                </td>
                                <td>{admission.name}</td>
                                <td>{admission.age}</td>
                                <td>{admission.sex}</td>
                                <td>{admission.plan}</td>
                                <td>{admission.dx}</td>
                                <td>{admission.notes}</td>
                                <td>{admission.sixtyPercentRule}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section>
                <button onClick={() => navigate('/add-possible-admission')}>Add a new Possible Admission</button>
            </section>
            <section>
                <h2>Possible Admissions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Status</th>
                            <th>Source</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Plan</th>
                            <th>DX</th>
                            <th>Presented</th>
                            <th>Notes</th>
                            <th>MSO</th>
                            <th>60% Rule</th>
                            {/* Add more headers based on the fields you want to display */}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(patients) && patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>
                                    <button onClick={() => navigate(`/edit-patient/${patient.id}`)}>Edit</button>
                                    {isValidPatient(patient) && (
                                        <button
                                            className="admit-button"
                                            onClick={() => openModal(patient.id)}>
                                            Admit
                                        </button>
                                    )}
                                </td>
                                <td>{patient.status}</td>
                                <td>{patient.source}</td>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.sex}</td>
                                <td>{patient.plan}</td>
                                <td>{patient.dx}</td>
                                <td>{patient.presented}</td>
                                <td>{patient.notes}</td>
                                <td>{patient.mso}</td>
                                <td>{patient.sixtyPercentRule}</td>
                                {/* Render more data as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {/* Modal Component */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={() => handleAdmit(selectedRoom)}
                message="Are you sure you want to admit this patient? If so select a room and date of admission:"
                confirmButtonText="Confirm Admission"
                cancelButtonText="Cancel"
            >
                <select
                    value={selectedRoom}
                    onChange={e => setSelectedRoom(e.target.value)}
                    style={{ margin: '10px 0', display: 'block', width: '100%' }}
                >
                    <option value="">Select a Room</option>
                    {Array.from({ length: 20 }, (_, i) => 480 + i).map(room => (
                        <option key={room} value={room}>{room}</option>
                    ))}
                </select>
                <input
                    type="date"
                    value={admissionDate}
                    onChange={e => setAdmissionDate(e.target.value)}
                    style={{ margin: '10px 0', display: 'block', width: '100%' }}
                />
            </ConfirmationModal>
            <SuccessModal
                isOpen={showAdmitSuccessModal}
                onClose={() => {
                    setShowAdmitSuccessModal(false);
                    window.location.reload(); // Reload the page after the modal is closed
                }}
                message="Patient has been admitted successfully."
            />
        </div>
    );
};

export default PreAdmissionsPage;
