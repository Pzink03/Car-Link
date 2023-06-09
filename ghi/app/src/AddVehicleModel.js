import React, {useState, useEffect} from 'react';
function VehicleModelForm () {

    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

    const fetchData = async () => {

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const manufacturerResponse = await fetch(manufacturerUrl);
        if (manufacturerResponse.ok) {
            const manufacturerData = await manufacturerResponse.json();
            setManufacturers(manufacturerData.manufacturers)
        }
    }

useEffect(() => {
    fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;

        const vehicleModelUrl = 'http://localhost:8100/api/models/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const vehicleModelResponse = await fetch(vehicleModelUrl, fetchOptions);
        if (vehicleModelResponse.ok) {
            setName('');
            setPictureUrl('');
            setManufacturer('');
        }
    }

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
      }

      const handleChangePictureUrl = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
      }

      const handleChangeManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
      }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Vehicle Model</h1>
            <form onSubmit={handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input onChange={handleChangeName} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChangePictureUrl} value={pictureUrl} placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                <label htmlFor="picture_url">Add a Picture</label>
              </div>
              <div className="mb-3">
                <select onChange={handleChangeManufacturer} value={manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {manufacturers.map(manufacturer => {
                    return (
                    <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                    </option>
                    );
                })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default VehicleModelForm;
