import React, { useState, useEffect } from 'react';

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [autos, setAutos] = useState([]);

  const getAppointments = async () => {
    const appointmentResponse = await fetch(
      'http://localhost:8080/api/appointments/'
    );

    if (appointmentResponse.ok) {
      const appointments = await appointmentResponse.json();
      setAppointments(appointments.appointments);
    }
  };

  const getAutos = async () => {
    const autosResponse = await fetch('http://localhost:8100/api/automobiles/');

    if (autosResponse.ok) {
      const autos = await autosResponse.json();
      setAutos(autos.autos);
    }
  };

  const cancelAppt = async (id) => {
    const apptResponse = await fetch(
      `http://localhost:8080/api/appointments/${id}/cancel/`,
      {
        method: 'put',
      }
    );
    if (apptResponse.ok) {
      getAppointments();
    }
  };

  const finishAppt = async (id) => {
    const apptResponse = await fetch(
      `http://localhost:8080/api/appointments/${id}/finish/`,
      {
        method: 'put',
      }
    );
    if (apptResponse.ok) {
      getAppointments();
    }
  };

  useEffect(() => {
    getAppointments();
    getAutos();
  }, []);

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

  const inProgressAppointments = appointments.filter((appointment) => {
    return appointment.status === 'Created';
  });

  const isSold = autos.filter((auto) => {
    return auto.sold === true;
  });

  const inventoryVins = autos.map((auto) => {
    return auto.vin;
  });

  appointments.map((appointment) => {
    appointment.vip = 'No';
    if (inventoryVins.includes(appointment.vin) && isSold) {
      appointment.vip = 'Yes';
    }
  });

  return (
    <>
      <h1 className='mt-4 mb-3'>Service Appointments</h1>
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
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {inProgressAppointments.map((appointment) => {
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
                <td>
                  <button
                    onClick={() => {
                      cancelAppt(appointment.id);
                    }}
                    className='btn btn-danger'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      finishAppt(appointment.id);
                    }}
                    className='btn btn-success'
                  >
                    Finish
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AppointmentsList;
