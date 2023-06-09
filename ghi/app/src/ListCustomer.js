import { useEffect, useState } from "react"

function CustomerList () {

  const [customers, setCustomers] = useState([])

  const getCustomers = async () => {
    const customersResponse = await fetch('http://localhost:8090/api/customers/')
    if (customersResponse.ok) {
      const customers = await customersResponse.json()
      setCustomers(customers.customers)
    }
  }

    const DeleteCustomer = async (id) => {
    const customerResponse = await fetch(`http://localhost:8090/api/customers/${id}`, {
        method: "DELETE"
    });
    if (customerResponse.ok){
      getCustomers();
    }
    }

    const FormatPhoneNumber = (phone_number) => {
      const phoneNumber = phone_number.toString();
      const areaCode = phoneNumber.slice(0, 3);
      const firstPart = phoneNumber.slice(3, 6);
      const secondPart = phoneNumber.slice(6, 10);
      return `(${areaCode}) ${firstPart}-${secondPart}`;
  }



  useEffect(() => {
    getCustomers();
  }, [])

    return (
      <>
        <h1 className="mt-4 mb-3">Customers</h1>
        <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => {
            return (
              <tr key={ customer.href }>
                <td>{ customer.first_name }</td>
                <td>{ customer.last_name }</td>
                <td>{FormatPhoneNumber(customer.phone_number)}</td>
                <td>{customer.address}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => DeleteCustomer(customer.id)}>Delete</button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )

}

export default CustomerList;
