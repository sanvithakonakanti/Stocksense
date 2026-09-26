import { useState } from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
} from "lucide-react";

function Transfers({
  products,
  operations,
  setOperations,
}) {
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    fromLocation: "Main Store",
    toLocation: "Production Rack",
    reference: "",
  });

  const selectedProduct = products.find(
    (product) =>
      product.id === Number(form.productId)
  );

  const transferHistory = operations.filter(
    (operation) =>
      operation.type === "transfer"
  );

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    const quantity = Number(form.quantity);

    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (form.fromLocation === form.toLocation) {
      alert(
        "From and To locations must be different."
      );
      return;
    }

    if (quantity > selectedProduct.stock) {
      alert(
        `Insufficient stock. Available stock: ${selectedProduct.stock} ${selectedProduct.unit}`
      );
      return;
    }

    const transferOperation = {
      id: Date.now(),

      type: "transfer",

      productId: selectedProduct.id,

      productName: selectedProduct.name,

      sku: selectedProduct.sku,

      quantity,

      unit: selectedProduct.unit,

      party: `${form.fromLocation} → ${form.toLocation}`,

      reference:
        form.reference || "N/A",

      date: new Date().toLocaleString(),

      status: "Validated",

      fromLocation:
        form.fromLocation,

      toLocation:
        form.toLocation,
    };

    setOperations([
      transferOperation,
      ...operations,
    ]);

    alert(
      `${quantity} ${selectedProduct.unit} of ${selectedProduct.name} transferred successfully.`
    );

    setForm({
      productId: "",
      quantity: "",
      fromLocation: "Main Store",
      toLocation: "Production Rack",
      reference: "",
    });
  }

  return (
    <div>

      {/* PAGE HEADER */}

      <div className="page-heading">

        <div>

          <h2>
            Internal Transfers
          </h2>

          <p>
            Move stock between internal
            warehouse locations.
          </p>

        </div>

      </div>

      <div className="operation-grid">

        {/* TRANSFER FORM */}

        <div className="form-panel">

          <div className="panel-header">

            <div>

              <h3>
                New Internal Transfer
              </h3>

              <p>
                Transfer inventory from one
                location to another.
              </p>

            </div>

            <ArrowLeftRight size={24} />

          </div>

          <form
            onSubmit={handleSubmit}
          >

            <div className="form-grid">

              {/* PRODUCT */}

              <label>

                Product *

                <select
                  name="productId"
                  value={form.productId}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Product
                  </option>

                  {products.map(
                    (product) => (

                      <option
                        key={product.id}
                        value={product.id}
                      >

                        {product.name}
                        {" — "}
                        {product.stock}
                        {" "}
                        {product.unit}
                        {" available"}

                      </option>

                    )
                  )}

                </select>

              </label>

              {/* QUANTITY */}

              <label>

                Quantity *

                <input
                  type="number"
                  min="1"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                />

              </label>

              {/* FROM */}

              <label>

                From Location *

                <select
                  name="fromLocation"
                  value={
                    form.fromLocation
                  }
                  onChange={handleChange}
                >

                  <option>
                    Main Store
                  </option>

                  <option>
                    Production Rack
                  </option>

                  <option>
                    Warehouse A
                  </option>

                  <option>
                    Warehouse B
                  </option>

                </select>

              </label>

              {/* TO */}

              <label>

                To Location *

                <select
                  name="toLocation"
                  value={
                    form.toLocation
                  }
                  onChange={handleChange}
                >

                  <option>
                    Production Rack
                  </option>

                  <option>
                    Main Store
                  </option>

                  <option>
                    Warehouse A
                  </option>

                  <option>
                    Warehouse B
                  </option>

                </select>

              </label>

              {/* REFERENCE */}

              <label>

                Reference

                <input
                  name="reference"
                  value={
                    form.reference
                  }
                  onChange={handleChange}
                  placeholder="TRF-001"
                />

              </label>

            </div>

            {/* AVAILABLE STOCK */}

            {selectedProduct && (

              <div className="operation-summary">

                <strong>
                  Available Stock
                </strong>

                <span>
                  {selectedProduct.stock}{" "}
                  {selectedProduct.unit}
                </span>

              </div>

            )}

            {/* TRANSFER PREVIEW */}

            {selectedProduct &&
              form.quantity && (

              <div className="transfer-preview">

                <div>

                  <span>
                    From
                  </span>

                  <strong>
                    {form.fromLocation}
                  </strong>

                </div>

                <ArrowLeftRight
                  size={22}
                />

                <div>

                  <span>
                    To
                  </span>

                  <strong>
                    {form.toLocation}
                  </strong>

                </div>

              </div>

            )}

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
              >

                <CheckCircle2
                  size={18}
                />

                Validate Transfer

              </button>

            </div>

          </form>

        </div>

        {/* INFORMATION PANEL */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Transfer Information
              </h3>

              <p>
                Internal stock movement
              </p>

            </div>

            <ArrowLeftRight
              size={22}
            />

          </div>

          <div className="transfer-info">

            <div>
              <strong>
                Total stock remains unchanged
              </strong>

              <p>
                An internal transfer only
                changes the stock location.
              </p>
            </div>

            <div>
              <strong>
                Example
              </strong>

              <p>
                Move 30 KG of Steel Rods
                from Main Store to
                Production Rack.
              </p>
            </div>

            <div>
              <strong>
                Ledger
              </strong>

              <p>
                Every validated transfer is
                recorded in the Stock Ledger.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* TRANSFER HISTORY */}

      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              Transfer History
            </h3>

            <p>
              Previously validated
              internal transfers.
            </p>

          </div>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Date
                </th>

                <th>
                  Product
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  From
                </th>

                <th>
                  To
                </th>

                <th>
                  Reference
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {transferHistory.map(
                (operation) => (

                  <tr
                    key={operation.id}
                  >

                    <td>
                      {operation.date}
                    </td>

                    <td>
                      <strong>
                        {operation.productName}
                      </strong>
                    </td>

                    <td>
                      {operation.quantity}{" "}
                      {operation.unit}
                    </td>

                    <td>
                      {operation.fromLocation}
                    </td>

                    <td>
                      {operation.toLocation}
                    </td>

                    <td>
                      {operation.reference}
                    </td>

                    <td>

                      <span className="badge done">
                        {operation.status}
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

          {transferHistory.length ===
            0 && (

            <div className="empty-message">
              No internal transfers yet.
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Transfers;