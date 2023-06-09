import React, { useMemo, useState, useEffect } from 'react';

function ServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [query, setQuery] = useState('');
  const [autos, setAutos] = useState([]);

  const getAutos = async () => {
    const autosResponse = await fetch('http://localhost:8100/api/automobiles/');

    if (autosResponse.ok) {
      const autos = await autosResponse.json();
      setAutos(autos.autos);
    }
  };

  const getAppointments = async () => {
    const appointmentResponse = await fetch(
      'http://localhost:8080/api/appointments/'
    );

    if (appointmentResponse.ok) {
      const appointments = await appointmentResponse.json();
      setAppointments(appointments.appointments);
    }
  };

  useEffect(() => {
    getAppointments();
    getAutos();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const formatDate = (date) => {
    const rawDate = new Date(date);

    const month = rawDate?.getMonth() + 1;
    const day = rawDate?.getDate();
    const year = rawDate?.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const formatTime = (date) => {
    const rawData = new Date(date);

    let hours = rawData.getHours();
    let minutes = rawData.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = ('0' + minutes).slice(-2);
    const fTime = `${hours}:${minutes} ${ampm}`;
    return fTime;
  };

  const updatedAppointments = appointments.filter((appointment) => {
    return (
      appointment.status.includes('Finished') ||
      appointment.status.includes('Canceled')
    );
  });

  const filteredAppointments = updatedAppointments.filter((appointment) => {
    return appointment.vin.includes(query.toUpperCase());
  });

  const inventoryVins = autos.map((auto) => {
    return auto.vin;
  });

  appointments.map((appointment) => {
    appointment.vip = 'No';
    if (inventoryVins.includes(appointment.vin)) {
      appointment.vip = 'Yes';
    }
  });

  return (
    <>
      <h1 className='mt-4 mb-3'>Service History</h1>
      <input
        className='search-bar'
        value={query}
        onChange={handleChange}
        type='search'
      />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.vip}</td>
                <td>{appointment.customer}</td>
                <td>{formatDate(appointment.date_time)}</td>
                <td>{formatTime(appointment.date_time)}</td>
                <td>
                  {appointment.technician.first_name}{' '}
                  {appointment.technician.last_name}
                </td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ServiceHistory;
