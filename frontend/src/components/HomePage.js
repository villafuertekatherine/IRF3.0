import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    if (date.getDay() !== 0) {
      setError('Start date must be a Monday.');
      setStartDate('');
      setEndDate('');
    } else {
      setError('');
      setStartDate(e.target.value);
      const sunday = new Date(date);
      sunday.setDate(sunday.getDate() + 6);
      setEndDate(sunday.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(startDate).getDay() !== 0) {
      setError('Start date must be a Monday.');
    } else {
      navigate('/pre-admissions', { state: { startDate, endDate } });
    }
  };

  return (
    <div className="homepage-container">
      <h1>Home Page</h1>
      <section>
        <h2>Pre-Admissions Page - Week Selection</h2>
        <p>
          Please select a week start date for which to view the Pre-Admissions Page. The start date must be a Monday,
          and the end date will be the calculated as the corresponding Sunday from the selected week start date.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Week Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              required
            />
          </div>
          <div>
            <label>Week End Date:</label>
            <input
              type="date"
              value={endDate}
              readOnly
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">View Pre-Admissions Data</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
