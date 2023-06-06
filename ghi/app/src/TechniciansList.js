import React, { useState, useEffect } from 'react';

function TechList() {
  const [techList, setTechList] = useState([]);

  const getTechs = async () => {
    const techResponse = await fetch('http://localhost:8080/api/technicians/');

    if (techResponse.ok) {
      const techData = await techData.json();
      setTechList(techData);
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
      getTechs();
    }
  };

  useEffect(() => {
    getTechs();
  }, []);
}
