import React, { useState } from 'react';
import axios from 'axios';
import '../css/App.css';  // Adjust the path as necessary

function AddPatientModal({ onClose }) {
    const [formData, setFormData] = useState({
        status: '',
        source: '',
        name: '',
        age: '',
        sex: '',
        plan: '',
        presented: '',
        notes: '',
        mso: '',
        rule60: '',
        sourceOther: '',
        planOther: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveSubmit = async () => {
        // Log formData to the console before submitting
        console.log("Submitting form data:", formData);

        // Example validation: Ensure all required fields are filled
        if (!formData.name || !formData.source) {
            console.error('Please fill all required fields.');
            return;  // Prevent submission
        }

        try {
            const response = await axios.post('http://localhost:8080/patients', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Patient added:', response.data);
            onClose(); // Close modal on success
        } catch (error) {
            console.error('Failed to add patient:', error.response ? JSON.stringify(error.response.data) : error.message);
        }
    };

    return (
        <div className="modal">
            <h2>Add Patient to Possible Admissions</h2>
            <label>Status
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Ready">Ready</option>
                    <option value="Not Ready">Not Ready</option>
                    <option value="Home">Home</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Assigned">Assigned</option>
                </select>
            </label>
            <br/>
            <label>Source
                <select name="source" value={formData.source} onChange={handleChange}>
                    <option value="">Select Source</option>
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
            {formData.source === 'Other' && (
                <input
                    type="text"
                    name="sourceOther"
                    placeholder="Source-Other"
                    value={formData.sourceOther}
                    onChange={handleChange}
                />
            )}
            <br/>
            <label>Name
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Age
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Sex
                <select name="sex" value={formData.sex} onChange={handleChange}>
                    <option value="">Select Sex</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                </select>
            </label>
            <br/>
            <label>Plan
                <select name="plan" value={formData.plan} onChange={handleChange}>
                    <option value="">Select Plan</option>
                    <option value="SSSA">SSSA</option>
                    <option value="SSSP">SSSP</option>
                    <option value="MMMA">MMMA</option>
                    <option value="PMCA">PMCA</option>
                    {/* Additional plan options here */}
                    <option value="Other">Other</option>
                </select>
            </label>
            {formData.plan === 'Other' && (
                <input
                    type="text"
                    name="planOther"
                    placeholder="Plan-Other"
                    value={formData.planOther}
                    onChange={handleChange}
                />
            )}
            <br/>
            <label>Presented
                <input
                    type="text"
                    name="presented"
                    placeholder="Presented"
                    value={formData.presented}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Notes
                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>MSO
                <select name="mso" value={formData.mso} onChange={handleChange}>
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </label>
            <br/>
            <label>60% Rule
                <select name="rule60" value={formData.rule60} onChange={handleChange}>
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </label>
            <br/>
            <button onClick={handleSaveSubmit}>Save & Submit</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default AddPatientModal;