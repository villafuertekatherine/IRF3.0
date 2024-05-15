import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios to make HTTP requests
import '../css/PreAdmissionsPage.css';

const PreAdmissionsPage = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [patients, setPatients] = useState([]); // State to store patients data
    const [admissions, setAdmissions] = useState([]); // State to store admissions data

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                // Function to fetch patients data
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
                setAdmissions(response.data);
            } catch (error) {
                console.error('Failed to fetch admissions:', error);
            }
        };

        fetchPatients();
        fetchAdmissions(); // Call the function to fetch admissions data

    }, []); // Empty dependency array means this effect runs once on mount

    const isValidPatient = (patient) => {
        // Add more fields as necessary
        return patient.status && patient.source && patient.name && patient.age &&
               patient.sex && patient.plan && patient.dx && patient.presented &&
               patient.notes && patient.mso && patient.sixtyPercentRule;
    };

const handleAdmit = async (patientId) => {
    try {
        // Call the API to admit the patient
        const response = await axios.post(`http://localhost:8080/api/admit-patient/${patientId}`);
        console.log('Patient admitted:', response.data);

        // Update the local state to remove the patient from the list
        const updatedPatients = patients.filter(patient => patient.id !== patientId);
        setPatients(updatedPatients);
    } catch (error) {
        console.error('Failed to admit patient:', error);
    }
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
                        {Array.isArray(admissions) && admissions.map((admission) => (
                            <tr key={admission.id}>
                                <td>
                                    <button onClick={() => navigate(`/edit-admission/${admission.id}`)}>
                                        Edit
                                    </button>
                                </td>
                                <td>{admission.status}</td>
                                <td>{admission.source}</td>
                                <td>{admission.name}</td>
                                <td>{admission.age}</td>
                                <td>{admission.sex}</td>
                                <td>{admission.plan}</td>
                                <td>{admission.dx}</td>
                                <td>{admission.presented}</td>
                                <td>{admission.notes}</td>
                                <td>{admission.mso}</td>
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
                                            onClick={() => handleAdmit(patient.id)}>
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
        </div>
    );
};

export default PreAdmissionsPage;
