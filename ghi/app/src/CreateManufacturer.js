import React, {useState} from 'react';
function ManufacturerForm () {

    const[name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;

        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchOptions = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const manufacturersResponse = await fetch(manufacturersUrl, fetchOptions);
        if (manufacturersResponse.ok) {
          setName('');
        }
      }

      const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value)
    }



    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Manufacturer Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default ManufacturerForm;
