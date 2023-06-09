import React, { useEffect, useState } from 'react';

function AutomobileForm() {
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    vin: '',
    color: '',
    year: '',
    model: '',
  });

  const getModels = async () => {
    const modelResponse = await fetch('http://localhost:8100/api/models/');

    if (modelResponse.ok) {
      const models = await modelResponse.json();
      setModels(models.models);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  const handleFormDataChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.vin = formData.vin;
    data.color = formData.color;
    data.year = formData.year;
    data.model_id = formData.model;

    const automobileUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(automobileUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        vin: '',
        color: '',
        year: '',
        model: '',
      });
    }
  };

  return (
    <div className='row'>
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id='add-automobile-form'>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.vin}
                placeholder='VIN'
                required
                type='text'
                name='vin'
                id='vin'
                className='form-control'
              />
              <label htmlFor='vin'>VIN</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.color}
                placeholder='Color'
                required
                type='text'
                name='color'
                id='color'
                className='form-control'
              />
              <label htmlFor='color'>Color</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormDataChange}
                value={formData.year}
                placeholder='Year'
                required
                type='text'
                name='year'
                id='year'
                className='form-control'
              />
              <label htmlFor='year'>Year</label>
            </div>
            <div className='mb-3'>
              <select
                onChange={handleFormDataChange}
                value={formData.model}
                placeholder='Model'
                required
                name='model'
                id='model'
                className='form-select'
              >
                <option value=''>Choose a model</option>
                {models.map((model) => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className='btn btn-primary'>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
