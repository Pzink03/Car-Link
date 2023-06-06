import React, { useState, useEffect } from 'react';

function TechniciansList() {
  const [technicians, setTechnicians] = useState([]);

  const getTechnicians = async () => {
    const techResponse = await fetch('http://localhost:8080/api/technicians/');

    if (techResponse.ok) {
      const technicians = await techResponse.json();
      setTechnicians(technicians.technicians);
    }
  };

  const deleteTech = async (id) => {
    const techResponse = await fetch(
      `http://localhost:8080/api/technicians/${id}/`,
      {
        method: 'DELETE',
      }
    );
    if (techResponse.ok) {
      setTechnicians();
    }
  };

  useEffect(() => {
    getTechnicians();
  }, []);

  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Delete Technician</th>
        </tr>
      </thead>
      <tbody>
        {technicians.map((technician) => {
          return (
            <tr key={technician.id}>
              <td>{technician.employee_id}</td>
              <td>{technician.first_name}</td>
              <td>{technician.last_name}</td>
              <td>
                <button
                  onClick={() => {
                    deleteTech(technician.id);
                  }}
                  className='btn btn-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TechniciansList;
