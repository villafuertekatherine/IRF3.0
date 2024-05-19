import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/PreAdmissionsPage.css';
import ConfirmationModal from '../notifications/ConfirmationModal';
import SuccessModal from '../notifications/SuccessModal';

const PreAdmissionsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [patients, setPatients] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [showAdmitSuccessModal, setShowAdmitSuccessModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/patients');
                setPatients(response.data || []);
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        };

        const fetchAdmissionsWithDates = async () => {
            const { startDate, endDate } = location.state;
            try {
                const response = await axios.get('http://localhost:8080/api/admissions/date-range', {
                    params: { startDate, endDate }
                });
                const sortedAdmissions = response.data.sort((a, b) => new Date(a.admissionDate) - new Date(b.admissionDate));
                setAdmissions(sortedAdmissions || []);
            } catch (error) {
                console.error('Failed to fetch admissions:', error);
            }
        };

        fetchPatients();
        if (location.state && location.state.startDate && location.state.endDate) {
            fetchAdmissionsWithDates();
        }
    }, [location.state]);

    const isValidPatient = (patient) => {
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
                await axios.post(`http://localhost:8080/api/admit-patient/${selectedPatientId}`, payload);
                closeModal();
                setShowAdmitSuccessModal(true);
            } catch (error) {
                console.error('Failed to admit patient:', error);
                closeModal();
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
            <section>
                <h2>Admissions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Room</th>
                            <th>Admission Date</th>
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
                                    <button onClick={() => navigate(`/edit-admission/${admission.id}`)}>Edit</button>
                                </td>
                                <td>{admission.roomNumber}</td>
                                <td>{admission.admissionDate}</td>
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
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(patients) && patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>
                                    <button onClick={() => navigate(`/edit-patient/${patient.id}`)}>Edit</button>
                                    {isValidPatient(patient) && (
                                        <button className="admit-button" onClick={() => openModal(patient.id)}>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
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
                    window.location.reload();
                }}
                message="Patient has been admitted successfully."
            />
        </div>
    );
};

export default PreAdmissionsPage;
