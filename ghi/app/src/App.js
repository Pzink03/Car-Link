import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
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
  if (props.customers === undefined || props.salespeople === undefined || props.sales === undefined || props.manufacturers === undefined || props.models === undefined) {
    return null;

  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/customers" element={<CustomerList customers={props.customers} />}></Route>
          <Route path="/customers">
            <Route path="new" element={<CustomerForm />}></Route>
          </Route>
          <Route path="/salespeople" element={<SalesPeopleList salespeople={props.salespeople} />}></Route>
          <Route path="/salespeople">
            <Route path="new" element={<SalespersonForm />}></Route>
          </Route>
          <Route path="/sales" element={<SalesList sales={props.sales} />}></Route>
          <Route path="/sales">
            <Route path="new" element={<SalesForm />}></Route>
          </Route>
          <Route path="/manufacturers" element={<ManufacturersList manufacturers={props.manufacturers} />}></Route>
          <Route path="/manufacturers">
            <Route path="new" element={<ManufacturerForm />}></Route>
          </Route>
          <Route path="/models" element={<VehicleModelsList models={props.models} />}></Route>
          <Route path="/models">
            <Route path="new" element={<VehicleModelForm />}></Route>
          </Route>
          <Route path="/salesHistory" element={<SalesHistoryList sales={props.sales}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
