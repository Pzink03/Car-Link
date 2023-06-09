import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-success'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          CarCar
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                aria-current='page'
                to='/technicians'
                end
              >
                Technicians
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                aria-current='page'
                to='/technicians/new'
              >
                Add Technician
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                aria-current='page'
                to='/automobiles'
                end
              >
                Automobiles
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                aria-current='page'
                to='/automobiles/new'
              >
                Add Automobile
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                aria-current='page'
                to='/appointments'
                end
              >
                Service Appointments
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                aria-current='page'
                to='/appointments/new'
              >
                Create a Service Appointment
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                aria-current='page'
                to='/appointments/history'
              >
                Service History
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/customers' end>
                Customers
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/salespeople' end>
                Salespeople
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/sales' end>
                Sales
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/sales/new'>
                Add Sales
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/salespeople/new'>
                Add Salesperson
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/customers/new'>
                Add Customer
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/manufacturers' end>
                Manufacturers
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/manufacturers/new'>
                Add Manufacturer
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/models' end>
                Models
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/models/new'>
                Add Models
              </NavLink>
            </li>
            <li className='nav_item'>
              <NavLink className='nav-link' to='/saleshistory'>
                Sales History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
