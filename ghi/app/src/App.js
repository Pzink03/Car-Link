import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechniciansList from './TechniciansList';

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
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
