import React, {useState, useEffect} from "react";

function SalesHistoryList () {

    const [sales, setSales] = useState([])
    const [filterValue, setFilterValue] = useState('')

    const getSales = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/'
        const salesResponse = await fetch(salesUrl);
        if (salesResponse.ok) {
            const salesData = await salesResponse.json();
            setSales(salesData.sales)
        }
    }

    const DeleteSale = async (id) => {
      const saleResponse = await fetch(`http://localhost:8090/api/sales/${id}`, {
          method: "DELETE"
      });
      if (saleResponse.ok){
        getSales();

      }
      }

    useEffect(() => {
        getSales();
        }, []);

        const handleChange = (event) => {
        setFilterValue(event.target.value)
        }

        const filteredPerson = () => {
        return sales.filter((sale) =>
            sale.salesperson.last_name.toLowerCase().includes(filterValue))
        }

    return (
      <>
      <h1>List of Sales</h1>
      <div className="mb-3">
        <input onChange={handleChange} placeholder= "Search name" />
      </div>

        <table className="table table-hover table-striped">
        <thead>

          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>

          </tr>
        </thead>
        <tbody>
          {filteredPerson().map((sale) => {
            return (
              <tr key={ sale.id }>
                <td>{ sale.salesperson.last_name } {sale.salesperson.first_name}</td>
                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => DeleteSale(sale.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )

}

export default SalesHistoryList;
