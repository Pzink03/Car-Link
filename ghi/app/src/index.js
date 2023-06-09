import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadData() {
  const technicianResponse = await fetch(
    'http://localhost:8080/api/technicians/'
  );
  const automobileResponse = await fetch(
    'http://localhost:8100/api/automobiles/'
  );
  const appointmentResponse = await fetch(
    'http://localhost:8080/api/appointments/'
  );
  if (
    technicianResponse.ok &&
    automobileResponse.ok &&
    appointmentResponse.ok
  ) {
    const technicianData = await technicianResponse.json();
    const automobileData = await automobileResponse.json();
    const appointmentData = await appointmentResponse.json();
    root.render(
      <React.StrictMode>
        <App
          technicians={technicianData.technicians}
          automobiles={automobileData.automobiles}
          appointments={appointmentData.appointments}
        />
      </React.StrictMode>
    );
  } else {
    console.error(technicianResponse);
    console.error(automobileResponse);
    console.error(appointmentResponse);
  }
}
loadData();
