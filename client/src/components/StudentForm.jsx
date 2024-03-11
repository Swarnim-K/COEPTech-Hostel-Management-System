import React, { useState } from 'react';
import './StudentForm.css'; // Make sure the CSS file is in the same folder

function StudentForm() {
    // State for each form field
    const [formData, setFormData] = useState({
        name: '',
        misId: '',
        email: '',
        year: '',
        cgpa: '',
        caste: '',
        permanentAddress: '',
        emergencyContact: '',
        documents: null
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Process the form data as needed
    };

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <h2>Student Information Form</h2>
            <div className="form-field">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="misId">MIS ID:</label>
                <input
                    type="text"
                    id="misId"
                    name="misId"
                    value={formData.misId}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="year">Year:</label>
                <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="cgpa">CGPA:</label>
                <input
                    type="text"
                    id="cgpa"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="caste">Caste:</label>
                <select
                    id="caste"
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                </select>
            </div>
            <div className="form-field">
                <label htmlFor="permanentAddress">Permanent Address:</label>
                <textarea
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-field">
                <label htmlFor="emergencyContact">Emergency Contact:</label>
                <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="documents">Upload Documents:</label>
                <input
                    type="file"
                    id="documents"
                    name="documents"
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default StudentForm;
