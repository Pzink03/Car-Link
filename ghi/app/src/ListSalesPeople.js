import { useEffect, useState } from "react"

function SalesPeopleList () {

  const [salespeople, setSalespeople] = useState([])


  const getSalespeople = async () => {
    const salespeopleResponse = await fetch('http://localhost:8090/api/salespeople/')
    if (salespeopleResponse.ok) {
      const salespeople = await salespeopleResponse.json()
      setSalespeople(salespeople.salespeople)
    }
  }


    const DeleteSalespeople = async (id) => {
    const salespeopleResponse = await fetch(`http://localhost:8090/api/salespeople/${id}`, {
        method: "DELETE"
    });
    if (salespeopleResponse.ok){
      getSalespeople();

    }
    }

  useEffect(() => {
    getSalespeople();
  }, [])


    return (
      <>
      <h1 className="mt-4 mb-3">Sales Team</h1>
        <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salespeople.map(salesperson => {
            return (
              <tr key={ salesperson.id }>
                <td>{ salesperson.employee_id }</td>
                <td>{salesperson.first_name}</td>
                <td>{ salesperson.last_name }</td>

                <td>
                    <button className="btn btn-danger" onClick={() => DeleteSalespeople(salesperson.id)}>Delete</button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )

}

export default SalesPeopleList;
