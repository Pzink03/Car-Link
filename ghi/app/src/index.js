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
  const techResponse = await fetch('http://localhost:8080/api/technicians/');
  if (techResponse.ok) {
    const techData = await techResponse.json();
    root.render(
      <React.StrictMode>
        <App techs={techData.techs} />
      </React.StrictMode>
    );
  } else {
    console.error(techResponse);
  }
}
loadData();
