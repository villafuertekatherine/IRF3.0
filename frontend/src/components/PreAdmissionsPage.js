import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios to make HTTP requests
import '../css/PreAdmissionsPage.css';

const PreAdmissionsPage = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [patients, setPatients] = useState([]); // State to store patients data

    useEffect(() => {
        // Function to fetch patients data
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/patients'); // Adjust the API URL as needed
                console.log('Patients fetched:', response.data); // Log the data received
                setPatients(response.data);
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        };

        fetchPatients(); // Call the function to fetch data
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="page-container">
            <h1>Pre-Admissions Page</h1>
            <button onClick={() => navigate('/add-possible-admission')}>Add a new Possible Admission</button>
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
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td><button onClick={() => navigate(`/edit-patient/${patient.id}`)}>Edit</button></td>
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
