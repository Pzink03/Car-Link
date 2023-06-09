import React, { useState, useEffect } from 'react';

function AutomobilesList() {
  const [autos, setAutos] = useState([]);

  const getAutos = async () => {
    const autosResponse = await fetch('http://localhost:8100/api/automobiles/');

    if (autosResponse.ok) {
      const autos = await autosResponse.json();
      setAutos(autos.autos);
    }
  };

  useEffect(() => {
    getAutos();
  }, []);

  function boolToString(bool) {
    if (bool === true) return 'Yes';
    return 'No';
  }

  return (
    <>
      <h1 className='mt-4 mb-3'>Automobiles</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => {
            return (
              <tr key={auto.id}>
                <td>{auto.vin}</td>
                <td>{auto.color}</td>
                <td>{auto.year}</td>
                <td>{auto.model.name}</td>
                <td>{auto.model.manufacturer.name}</td>
                <td>{boolToString(auto.sold)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AutomobilesList;
