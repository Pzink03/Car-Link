import { useEffect, useState } from "react"

function VehicleModelsList () {
  const [models, setModels] = useState([])


  const getModels = async () => {
    const modelsResponse = await fetch('http://localhost:8100/api/models/')
    if (modelsResponse.ok) {
      const models = await modelsResponse.json()
      setModels(models.models)
    }
  }


    const DeleteModel = async (id) => {
    const modelResponse = await fetch(`http://localhost:8100/api/models/${id}`, {
        method: "DELETE"
    });
    if (modelResponse.ok){
      getModels();

    }
    }

  useEffect(() => {
    getModels();
  }, [])

    return (
      <>
      <h1 className="mt-4 mb-3">Vehicle Models</h1>

        <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>

          </tr>
        </thead>
        <tbody>
          {models.map(model => {
            return (
              <tr key={ model.id }>

                <td>{ model.name }</td>
                <td>{ model.manufacturer.name }</td>
                <td>
                  <img src={ model.picture_url } className="Image"
                  alt=""
                  width="100"
                  />
                  </td>

                <td>
                    <button className="btn btn-danger" onClick={() => DeleteModel(model.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )

        }

export default VehicleModelsList;
