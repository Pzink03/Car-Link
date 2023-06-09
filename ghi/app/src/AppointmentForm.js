import React, { useEffect, useState } from 'react';

function AppointmentForm() {
  const [technicians, setTechnicians] = useState([]);
  const [autos, setAutos] = useState([]);
  const [formData, setFormData] = useState({
    vin: '',
    customer: '',
    technician: '',
    reason: '',
    date: '',
    time: '',
  });

  const getAutos = async () => {
    const autosResponse = await fetch('http://localhost:8100/api/automobiles/');

    if (autosResponse.ok) {
      const autos = await autosResponse.json();
      setAutos(autos.autos);
    }
  };

  const inventoryVins = autos.map((auto) => {
    return auto.vin;
  });

  const getTechnicians = async () => {
    const techResponse = await fetch('http://localhost:8080/api/technicians/');

    if (techResponse.ok) {
      const technicians = await techResponse.json();
      setTechnicians(technicians.technicians);
    }
  };

  useEffect(() => {
    getTechnicians();
    getAutos();
  }, []);

  const handleFormDataChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    const fDate = formData.date;
    const fTime = formData.time;
    const formDateTime = `${fDate} ${fTime}`;

    data.vin = formData.vin;
    data.customer = formData.customer;

    data.date_time = formDateTime;

    data.technician = formData.technician;
    data.reason = formData.reason;

    const appointmentUrl = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        vin: '',
        customer: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
      });
    }
  };

  return (
    <div className='row'>
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Create a service appointment</h1>
          <form onSubmit={handleSubmit} id='add-appointment-form'>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.vin}
                placeholder='Automobile VIN'
                required
                type='text'
                name='vin'
                id='vin'
                className='form-control'
              />
              <label htmlFor='vin'>Automobile VIN</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.customer}
                placeholder='Customer'
                required
                type='text'
                name='customer'
                id='customer'
                className='form-control'
              />
              <label htmlFor='customer'>Customer</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.date}
                placeholder='Date'
                required
                type='date'
                name='date'
                id='date'
                className='form-control'
              />
              <label htmlFor='date'>Date</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.time}
                placeholder='Time'
                required
                type='time'
                name='time'
                id='time'
                className='form-control'
              />
              <label htmlFor='time'>Time</label>
            </div>
            <div className='mb-3'>
              <select
                onChange={handleFormDataChange}
                value={formData.technician}
                placeholder='Technician'
                required
                name='technician'
                id='technician'
                className='form-select'
              >
                <option value=''>Choose a technician</option>
                {technicians.map((technician) => {
                  return (
                    <option key={technician.id} value={technician.id}>
                      {technician.first_name} {technician.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.reason}
                placeholder='Reason'
                required
                type='text'
                name='reason'
                id='reason'
                className='form-control'
              />
              <label htmlFor='reason'>Reason</label>
            </div>
            <button className='btn btn-primary'>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
