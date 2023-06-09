import { useEffect, useState } from "react"

function SalesList () {

  const [sales, setSales] = useState([])

  const getSales = async () => {
    const salesResponse = await fetch('http://localhost:8090/api/sales/')
    if (salesResponse.ok) {
      const salesData = await salesResponse.json()
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
}, [])

    return (
      <>
        <h1 className="mt-4 mb-3">Sales</h1>
        <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => {
            return (
              <tr key={ sale.href }>
                <td>{ sale.salesperson.employee_id }</td>
                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                <td>{sale.customer.first_name} { sale.customer.last_name}</td>
                <td>{ sale.automobile.vin }</td>
                <td>{ sale.price}</td>
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

export default SalesList;
