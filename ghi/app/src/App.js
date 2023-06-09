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
import SalesPeopleList from './ListSalesPeople';
import CustomerList from './ListCustomer';
import SalesList from './ListSales';
import SalespersonForm from './AddSalesPerson';
import CustomerForm from './AddCustomer';
import SalesForm from './AddSale';
import ManufacturersList from './ListManufacturers';
import ManufacturerForm from './CreateManufacturer';
import VehicleModelsList from './ListVehicleModels';
import VehicleModelForm from './AddVehicleModel';
import SalesHistoryList from './SalesHistory';

function App(props) {
  if (
    props.customers === undefined ||
    props.salespeople === undefined ||
    props.sales === undefined ||
    props.manufacturers === undefined ||
    props.models === undefined ||
    props.technicians === undefined ||
    props.automobiles === undefined ||
    props.appointments === undefined
  ) {
    return null;
  }
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
          <Route
            path='/customers'
            element={<CustomerList customers={props.customers} />}
          ></Route>
          <Route path='/customers'>
            <Route path='new' element={<CustomerForm />}></Route>
          </Route>
          <Route
            path='/salespeople'
            element={<SalesPeopleList salespeople={props.salespeople} />}
          ></Route>
          <Route path='/salespeople'>
            <Route path='new' element={<SalespersonForm />}></Route>
          </Route>
          <Route
            path='/sales'
            element={<SalesList sales={props.sales} />}
          ></Route>
          <Route path='/sales'>
            <Route path='new' element={<SalesForm />}></Route>
          </Route>
          <Route
            path='/manufacturers'
            element={<ManufacturersList manufacturers={props.manufacturers} />}
          ></Route>
          <Route path='/manufacturers'>
            <Route path='new' element={<ManufacturerForm />}></Route>
          </Route>
          <Route
            path='/models'
            element={<VehicleModelsList models={props.models} />}
          ></Route>
          <Route path='/models'>
            <Route path='new' element={<VehicleModelForm />}></Route>
          </Route>
          <Route
            path='/salesHistory'
            element={<SalesHistoryList sales={props.sales} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
