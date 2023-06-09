import React, {useState, useEffect} from "react";

function SalesForm() {
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [automobile, setAutomobile] = useState('');
    const [price, setPrice] = useState('');
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);

    const fetchData = async () => {
        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const customerUrl = 'http://localhost:8090/api/customers'

        const customerResponse = await fetch(customerUrl);
        const automobileResponse = await fetch(automobileUrl);
        const salespeopleResponse = await fetch(salespeopleUrl);

        if (automobileResponse.ok && salespeopleResponse.ok && customerResponse.ok) {
            const customerData = await customerResponse.json();
            const automobileData = await automobileResponse.json();
            const salespeopleData = await salespeopleResponse.json();

            setAutomobiles(automobileData.autos)
            setSalespeople(salespeopleData.salespeople)
            setCustomers(customerData.customers)

        }
    }

useEffect(() => {
    fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.automobile = automobile;
        data.customer_id = customer;
        data.salesperson_id = salesperson;
        data.price = price

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const saleUrl = `http://localhost:8100/api/automobiles/${automobile}/`;
        const automobileData = {vin:automobile, sold:true }
        const updateAutomobileOption = {
            method: 'put',
            body: JSON.stringify(automobileData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const createSaleResponse = await fetch(salesUrl, fetchOptions);
        if (createSaleResponse.ok) {
            setAutomobile('');
            setCustomer('');
            setSalesperson('');
            setPrice('');
          const updateSale = await fetch(saleUrl, updateAutomobileOption)
        }
    }

    const filterAutomobiles = automobiles.filter((automobile) => {
      return automobile.sold !== true
    })

    const handleChangeAutomobile = (event) => {
        const value = event.target.value;
        setAutomobile(value);
      }

      const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
      }

      const handleChangeSalesperson = (event) => {
        const value = event.target.value;
        setSalesperson(value);
      }
      const handleChangePrice = (event) => {
        const value = event.target.value;
        setPrice(value);
      }


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} id="create-sales-form">
              <div className="mb-3">
              <select onChange={handleChangeSalesperson} value={salesperson} required name="salesperson_id" id="salesperson_id" className="form-select">
                  <option value="">Choose a Salesperson</option>
                  {salespeople.map(salesperson => {
                      return (
                        <option key={salesperson.id} value={salesperson.id}>
                            {salesperson.last_name}
                        </option>
                      )
                    })}

              </select>
              </div>
              <div className="mb-3">
              <select onChange={handleChangeCustomer} value={customer} required name="customer_id" id="customer_id" className="form-select">
                  <option value="">Choose a Customer</option>
                  {customers.map(customer => {
                      return (
                        <option key={customer.id} value={customer.id}>
                            {customer.first_name}
                        </option>
                      )
                    })}

              </select>
              </div>
              <div className="mb-3">
                <select onChange={handleChangeAutomobile} value={automobile} required name="automobile" id="automobile" className="form-select">
                  <option value="">Choose an automobile</option>
                  {filterAutomobiles.map(automobile => {
                      return (
                        <option key={automobile.vin} value={automobile.vin}>
                            {automobile.vin}
                        </option>
                      )
                    })}

              </select>
              <div className="mb-3">
                      <input onChange={handleChangePrice} value={price} required placeholder="Price" type="text" id="price" name="price" className="form-control" />

                    </div>
              <button className="btn btn-primary">Create</button>
              </div>
            </form>
            </div>
          </div>
        </div>

    )
}

export default SalesForm
