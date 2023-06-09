import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

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
  const customerResponse = await fetch('http://localhost:8090/api/customers/');
  const salespeopleResponse = await fetch(
    'http://localhost:8090/api/salespeople/'
  );
  const salesResponse = await fetch('http://localhost:8090/api/sales/');
  const manufacturersResponse = await fetch(
    'http://localhost:8100/api/manufacturers/'
  );
  const vehicleModelsListResponse = await fetch(
    'http://localhost:8100/api/models/'
  );
  if (
    technicianResponse.ok &&
    automobileResponse.ok &&
    appointmentResponse.ok &&
    customerResponse.ok &&
    salespeopleResponse.ok &&
    salesResponse.ok &&
    manufacturersResponse.ok &&
    vehicleModelsListResponse.ok
  ) {
    const technicianData = await technicianResponse.json();
    const automobileData = await automobileResponse.json();
    const appointmentData = await appointmentResponse.json();
    const customerData = await customerResponse.json();
    const salespeopleData = await salespeopleResponse.json();
    const salesData = await salesResponse.json();
    const manufacturersData = await manufacturersResponse.json();
    const vehicleModelsData = await vehicleModelsListResponse.json();
    root.render(
      <React.StrictMode>
        <App
          technicians={technicianData.technicians}
          automobiles={automobileData.autos}
          appointments={appointmentData.appointments}
          customers={customerData.customers}
          salespeople={salespeopleData.salespeople}
          sales={salesData.sales}
          manufacturers={manufacturersData.manufacturers}
          models={vehicleModelsData.models}
        />
      </React.StrictMode>
    );
  } else {
    console.error(technicianResponse);
    console.error(automobileResponse);
    console.error(appointmentResponse);
    console.error(customerResponse);
    console.error(salespeopleResponse);
    console.error(salesResponse);
    console.error(manufacturersResponse);
    console.error(vehicleModelsListResponse);
  }
}
loadData();
