import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditPatientPage = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        status: '',
        source: '',
        sourceOther: '',
        sex: '',
        plan: '',
        planOther: '',
        dx: '',
        presented: '',
        notes: '',
        mso: '',
        sixtyPercentRule: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/patients/${patientId}`)
             .then(response => {
                 const fetchedPatient = response.data;
                 const predefinedSources = [
                    "HIMA Caguas (HC)", "Hogar", "San Lucas (SL)", "Aguadilla (Ag)", "HDLC",
                    "ASEM/UDH/Ped (UDH)", "Pila", "San Carlos (SCar)", "Menonita Cay (MenCay)",
                    "Perea", "BellaV (BV)", "San Crist (SCris)", "Damas", "Yauco",
                    "Menonita Cag (MenCag)", "DCSJ", "MetroSG (MSG)"
                 ];
                 const predefinedPlans = [
                    "SSSA", "SSSP", "MMMA", "PMCA", "FMP", "FMA", "MCSP", "MAF", "MEDPR", "PRM",
                    "FMV", "SSSV", "HUMA", "HUMP", "PSMP", "PSMV", "MMMV", "TRI"
                 ];
                 // Handling for source
                 if (!predefinedSources.includes(fetchedPatient.source)) {
                     fetchedPatient.sourceOther = fetchedPatient.source;
                     fetchedPatient.source = 'Other';
                 }
                 // Handling for plan
                 if (!predefinedPlans.includes(fetchedPatient.plan)) {
                     fetchedPatient.planOther = fetchedPatient.plan;
                     fetchedPatient.plan = 'Other';
                 }
                 setPatient(fetchedPatient);
             })
             .catch(error => console.error('Error fetching patient details:', error));
    }, [patientId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    // Update the source field if 'Other' is selected
    const finalPatientData = {
       ...patient,
       source: patient.source === 'Other' ? patient.sourceOther : patient.source,
       plan: patient.plan === 'Other' ? patient.planOther : patient.plan
    };

        axios.put(`http://localhost:8080/api/patients/${patientId}`, finalPatientData)
             .then(() => {
                 navigate('/pre-admissions');
             })
             .catch(error => {
                 console.error('Failed to update patient:', error);
             });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            axios.delete(`http://localhost:8080/api/patients/${patientId}`)
                .then(() => {
                    alert("Patient has been deleted successfully.");
                    navigate('/pre-admissions');
                })
                .catch(error => {
                    console.error('Failed to delete patient:', error);
                    alert("There was a problem deleting the patient.");
                });
        }
    };

    return (
        <div className="form-container">
            <h1>Edit Patient</h1>
            <form onSubmit={handleSubmit}>
                {/* Repeat the form fields similarly to AddPossibleAdmission, utilizing handleInputChange for updates */}
                <label>
                Status:
                <select name="status" value={patient.status} onChange={handleInputChange}>
                    <option value="" disabled>Select Option</option>
                    <option value="Ready">Ready</option>
                    <option value="Not Ready">Not Ready</option>
                    <option value="Discharge Home">Discharge Home</option>
                    <option value="Assigned">Assigned</option>
                </select>
                </label>
                <label>
                    Source:
                    <select name="source" value={patient.source || ''} onChange={handleInputChange}>
                        <option value="">Select Option</option>
                        <option value="HIMA Caguas (HC)">HIMA Caguas (HC)</option>
                        <option value="Hogar">Hogar</option>
                        <option value="San Lucas (SL)">San Lucas (SL)</option>
                        <option value="Aguadilla (Ag)">Aguadilla (Ag)</option>
                        <option value="HDLC">HDLC</option>
                        <option value="ASEM/UDH/Ped (UDH)">ASEM/UDH/Ped (UDH)</option>
                        <option value="Pila">Pila</option>
                        <option value="San Carlos (SCar)">San Carlos (SCar)</option>
                        <option value="Menonita Cay (MenCay)">Menonita Cay (MenCay)</option>
                        <option value="Perea">Perea</option>
                        <option value="BellaV (BV)">BellaV (BV)</option>
                        <option value="San Crist (SCris)">San Crist (SCris)</option>
                        <option value="Damas">Damas</option>
                        <option value="Yauco">Yauco</option>
                        <option value="Menonita Cag (MenCag)">Menonita Cag (MenCag)</option>
                        <option value="DCSJ">DCSJ</option>
                        <option value="MetroSG (MSG)">MetroSG (MSG)</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                {/* Conditional rendering for custom source */}
                {patient.source === 'Other' && (
                    <label>
                        Source-Other:
                        <input
                            type="text"
                            name="sourceOther"
                            value={patient.sourceOther || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                )}
                <label>
                    Name:
                    <input type="text" name="name" value={patient.name} onChange={handleInputChange} />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={patient.age} onChange={handleInputChange} />
                </label>
                <label>
                    Sex:
                    <select name="sex" value={patient.sex || ''} onChange={handleInputChange}>
                        <option value="" disabled>Select Option</option>
                        <option value="F">F</option>
                        <option value="M">M</option>
                    </select>
                </label>
                <label>
                    Plan:
                    <select name="plan" value={patient.plan || ''} onChange={handleInputChange}>
                        <option value="" disabled>Select Option</option>
                            <option value="SSSA">SSSA</option>
                            <option value="SSSP">SSSP</option>
                            <option value="MMMA">MMMA</option>
                            <option value="PMCA">PMCA</option>
                            <option value="FMP">FMP</option>
                            <option value="FMA">FMA</option>
                            <option value="MCSP">MCSP</option>
                            <option value="MAF">MAF</option>
                            <option value="MEDPR">MEDPR</option>
                            <option value="PRM">PRM</option>
                            <option value="FMV">FMV</option>
                            <option value="SSSV">SSSV</option>
                            <option value="HUMA">HUMA</option>
                            <option value="HUMP">HUMP</option>
                            <option value="PSMP">PSMP</option>
                            <option value="PSMV">PSMV</option>
                            <option value="MMMV">MMMV</option>
                            <option value="TRI">TRI</option>
                        {/* Add other plan options similarly */}
                        <option value="Other">Other</option>
                    </select>
                </label>
                {patient.plan === 'Other' && (
                    <label>
                        Plan-Other:
                        <input
                            type="text"
                            name="planOther"
                            value={patient.planOther || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                )}
                <label>
                    DX:
                    <input type="text" name="dx" value={patient.dx || ''} onChange={handleInputChange} />
                </label>
                <label>
                    Presented:
                    <input type="text" name="presented" value={patient.presented || ''} onChange={handleInputChange} />
                </label>
                <label>
                    Notes:
                    <textarea name="notes" value={patient.notes || ''} onChange={handleInputChange} />
                </label>
                <label>
                    MSO:
                    <select name="mso" value={patient.mso || ''} onChange={handleInputChange}>
                        <option value="" disabled>Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <label>
                    60% Rule:
                    <select name="sixtyPercentRule" value={patient.sixtyPercentRule || ''} onChange={handleInputChange}>
                        <option value="" disabled>Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={handleDelete} className="delete-button">Delete Patient</button>
            </form>
      </div>
    );
};

export default EditPatientPage;