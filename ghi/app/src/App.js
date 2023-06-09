import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechniciansList from './TechniciansList';
import TechnicianForm from './TechnicianForm';
import AutomobileForm from './AutomobileForm';
import AutomobilesList from './AutomobilesList';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import ServiceHistory from './ServiceHistory';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className='container'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='technicians'>
            <Route
              index
              element={<TechniciansList technicians={props.technicians} />}
            />
            <Route path='new' element={<TechnicianForm />} />
          </Route>
          <Route path='automobiles'>
            <Route
              index
              element={<AutomobilesList automobiles={props.automobiles} />}
            />
            <Route path='new' element={<AutomobileForm />} />
          </Route>
          <Route path='appointments'>
            <Route
              index
              element={<AppointmentsList appointments={props.appointments} />}
            />
            <Route path='new' element={<AppointmentForm />} />
            <Route path='history' element={<ServiceHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
