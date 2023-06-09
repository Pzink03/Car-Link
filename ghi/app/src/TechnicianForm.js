import React, { useState } from 'react';

function TechnicianForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
  });

  const handleFormDataChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.first_name = formData.firstName;
    data.last_name = formData.lastName;
    data.employee_id = formData.employeeId;

    const technicianUrl = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(technicianUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        firstName: '',
        lastName: '',
        employeeId: '',
      });
    }
  };

  return (
    <div className='row'>
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Add a Technician</h1>
          <form onSubmit={handleSubmit} id='add-technician-form'>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.firstName}
                placeholder='First Name'
                required
                type='text'
                name='firstName'
                id='firstName'
                className='form-control'
              />
              <label htmlFor='firstName'>First Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.lastName}
                placeholder='Last Name'
                required
                type='text'
                name='lastName'
                id='lastName'
                className='form-control'
              />
              <label htmlFor='lastName'>Last Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.employeeId}
                placeholder='Employee ID'
                required
                type='text'
                name='employeeId'
                id='employeeId'
                className='form-control'
              />
              <label htmlFor='employeeId'>Employee ID</label>
            </div>
            <button className='btn btn-primary'>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default TechnicianForm;
