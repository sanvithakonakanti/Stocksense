import { useState } from "react";
import {
  Warehouse,
  Plus,
  MapPin,
  CheckCircle2,
} from "lucide-react";

function WarehouseSettings() {
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: "Main Warehouse",
      location: "Hyderabad",
      status: "Active",
    },
    {
      id: 2,
      name: "Production Warehouse",
      location: "Hyderabad",
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    location: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.location.trim()) {
      alert("Please enter warehouse name and location.");
      return;
    }

    const newWarehouse = {
      id: Date.now(),
      name: form.name,
      location: form.location,
      status: "Active",
    };

    setWarehouses([
      ...warehouses,
      newWarehouse,
    ]);

    setForm({
      name: "",
      location: "",
    });
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Warehouse Settings</h2>
          <p>Manage warehouses and internal storage locations.</p>
        </div>
      </div>

      <div className="operation-grid">
        <div className="form-panel">
          <div className="panel-header">
            <div>
              <h3>Add Warehouse</h3>
              <p>Create a new warehouse location.</p>
            </div>
            <Warehouse size={24} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Warehouse Name *
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Example: Warehouse A"
                />
              </label>

              <label>
                Location *
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Example: Hyderabad"
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
              >
                <Plus size={18} />
                Add Warehouse
              </button>
            </div>
          </form>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Warehouse Information</h3>
              <p>Active inventory storage locations.</p>
            </div>
            <MapPin size={22} />
          </div>

          <div className="transfer-info">
            <div>
              <strong>Multi-warehouse support</strong>
              <p>
                Maintain multiple warehouse locations for
                inventory operations.
              </p>
            </div>

            <div>
              <strong>Internal locations</strong>
              <p>
                Use warehouse locations when creating
                internal stock transfers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Warehouses</h3>
            <p>Currently configured warehouses.</p>
          </div>
          <Warehouse size={22} />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Warehouse</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td>
                    <strong>{warehouse.name}</strong>
                  </td>
                  <td>{warehouse.location}</td>
                  <td>
                    <span className="badge done">
                      <CheckCircle2 size={13} />
                      {warehouse.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WarehouseSettings;