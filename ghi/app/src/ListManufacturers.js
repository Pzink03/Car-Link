import { useEffect, useState } from "react"

function ManufacturersList () {
  const [manufacturers, setManufacturers] = useState([])


  const getManufacturers = async () => {
    const manufacturersResponse = await fetch('http://localhost:8100/api/manufacturers/')
    if (manufacturersResponse.ok) {
      const manufacturers = await manufacturersResponse.json()
      setManufacturers(manufacturers.manufacturers)
    }
  }


    const DeleteManufacturer = async (id) => {
    const manufacturerResponse = await fetch(`http://localhost:8100/api/manufacturers/${id}`, {
        method: "DELETE"
    });
    if (manufacturerResponse.ok){
      getManufacturers();

    }
    }

  useEffect(() => {
    getManufacturers();
  }, [])

    return (
      <>
        <h1 className="mt-4 mb-3">Manufacturers</h1>
        <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Manufacturer Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(manufacturer => {
            return (
              <tr key={ manufacturer.id }>

                <td>{ manufacturer.name }</td>
                <td>
                    <button className="btn btn-danger" onClick={() => DeleteManufacturer(manufacturer.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )

}

export default ManufacturersList;
