import React, { useState } from 'react';
import AddPatientModal from './AddPatientModal';  // We'll create this component next
import '../css/App.css';  // Adjust the path as necessary


function PreAdmissionsWeeklyView() {
    const [showModal, setShowModal] = useState(false);

    const handleAddClick = () => {
        setShowModal(true);
    };

    return (
        <div>
            <h1>Pre-Admissions Weekly View</h1>
            <button onClick={handleAddClick}>Add a new Possible Admission</button>
            {showModal && <AddPatientModal onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default PreAdmissionsWeeklyView;
