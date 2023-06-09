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
  const customerResponse = await fetch('http://localhost:8090/api/customers');
  const salespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
  const salesResponse = await fetch('http://localhost:8090/api/sales/');
  const manufacturersResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const vehicleModelsListResponse = await fetch('http://localhost:8100/api/models/')
  if (customerResponse.ok && salespeopleResponse.ok && salesResponse.ok && manufacturersResponse.ok && vehicleModelsListResponse.ok) {
    const customerData = await customerResponse.json();
    const salespeopleData= await salespeopleResponse.json();
    const salesData = await salesResponse.json();
    const manufacturersData = await manufacturersResponse.json();
    const vehicleModelsData = await vehicleModelsListResponse.json();

    root.render(
      <React.StrictMode>
        <App customers={customerData.customers}
            salespeople={salespeopleData.salespeople}
            sales={salesData.sales}
            manufacturers={manufacturersData.manufacturers}
            models={vehicleModelsData.models}
        />
      </React.StrictMode>
    );
  } else {
    console.error(customerResponse);
    console.error(salespeopleResponse);
    console.error(salesResponse);
    console.error(manufacturersResponse);
    console.error(vehicleModelsListResponse);
  }
}
loadData();
