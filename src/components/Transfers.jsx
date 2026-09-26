import { useState } from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";

function Transfers({
  products,
  setProducts,
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
    const {
      name,
      value,
    } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  /*
   * Get location stock.
   *
   * Older products may not have a locations
   * object, so their existing stock is treated
   * as being in Main Store.
   */
  function getLocationStock(
    product,
    location
  ) {
    if (product.locations) {
      return Number(
        product.locations[location] || 0
      );
    }

    if (location === "Main Store") {
      return Number(product.stock || 0);
    }

    return 0;
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

    if (
      form.fromLocation ===
      form.toLocation
    ) {
      alert(
        "From and To locations must be different."
      );
      return;
    }

    const availableStock =
      getLocationStock(
        selectedProduct,
        form.fromLocation
      );

    if (quantity > availableStock) {
      alert(
        `Insufficient stock at ${form.fromLocation}. Available: ${availableStock} ${selectedProduct.unit}`
      );
      return;
    }

    /*
     * Create/update location quantities.
     */
    const oldLocations =
      selectedProduct.locations || {
        "Main Store":
          selectedProduct.stock || 0,
        "Production Rack": 0,
      };

    const newLocations = {
      ...oldLocations,
    };

    newLocations[form.fromLocation] =
      availableStock - quantity;

    newLocations[form.toLocation] =
      getLocationStock(
        selectedProduct,
        form.toLocation
      ) + quantity;

    /*
     * Update product.
     *
     * IMPORTANT:
     * Total stock remains unchanged.
     * Only its location distribution changes.
     */
    setProducts(
      products.map((product) =>
        product.id ===
        selectedProduct.id
          ? {
              ...product,
              locations: newLocations,
            }
          : product
      )
    );

    /*
     * Record transfer in Stock Ledger.
     */
    const transferOperation = {
      id: Date.now(),
      type: "transfer",

      productId:
        selectedProduct.id,

      productName:
        selectedProduct.name,

      sku:
        selectedProduct.sku,

      quantity,

      unit:
        selectedProduct.unit,

      party:
        `${form.fromLocation} → ${form.toLocation}`,

      reference:
        form.reference || "N/A",

      date:
        new Date().toLocaleString(),

      status: "Validated",

      fromLocation:
        form.fromLocation,

      toLocation:
        form.toLocation,

      fromStockBefore:
        availableStock,

      fromStockAfter:
        availableStock - quantity,

      toStockBefore:
        getLocationStock(
          selectedProduct,
          form.toLocation
        ),

      toStockAfter:
        getLocationStock(
          selectedProduct,
          form.toLocation
        ) + quantity,
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
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header">
        <div>
          <h2>
            Internal Transfers
          </h2>

          <p>
            Move stock between warehouses
            and storage locations.
          </p>
        </div>

        <div className="transfer-header-icon">
          <ArrowLeftRight size={24} />
        </div>
      </div>


      {/* =================================================
          NEW TRANSFER
      ================================================= */}

      <div className="form-panel">

        <div className="panel-header">

          <div>
            <h3>
              New Internal Transfer
            </h3>

            <p>
              Move inventory from one
              location to another.
            </p>
          </div>

          <ArrowLeftRight
            size={24}
          />

        </div>

        <form
          className="form-grid"
          onSubmit={handleSubmit}
        >

          {/* PRODUCT */}

          <div className="form-group">

            <label>
              Product *
            </label>

            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
            >
              <option value="">
                Select product
              </option>

              {products.map(
                (product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name} (
                    {product.sku})
                  </option>
                )
              )}
            </select>

          </div>


          {/* QUANTITY */}

          <div className="form-group">

            <label>
              Quantity *
            </label>

            <input
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />

            {selectedProduct && (
              <small>
                Available at{" "}
                {form.fromLocation}:{" "}
                <strong>
                  {
                    getLocationStock(
                      selectedProduct,
                      form.fromLocation
                    )
                  }{" "}
                  {
                    selectedProduct.unit
                  }
                </strong>
              </small>
            )}

          </div>


          {/* FROM LOCATION */}

          <div className="form-group">

            <label>
              From Location *
            </label>

            <select
              name="fromLocation"
              value={
                form.fromLocation
              }
              onChange={handleChange}
            >
              <option value="Main Store">
                Main Store
              </option>

              <option value="Production Rack">
                Production Rack
              </option>

              <option value="Main Warehouse">
                Main Warehouse
              </option>

              <option value="Production Warehouse">
                Production Warehouse
              </option>

              <option value="Warehouse A">
                Warehouse A
              </option>
            </select>

          </div>


          {/* TO LOCATION */}

          <div className="form-group">

            <label>
              To Location *
            </label>

            <select
              name="toLocation"
              value={
                form.toLocation
              }
              onChange={handleChange}
            >
              <option value="Main Store">
                Main Store
              </option>

              <option value="Production Rack">
                Production Rack
              </option>

              <option value="Main Warehouse">
                Main Warehouse
              </option>

              <option value="Production Warehouse">
                Production Warehouse
              </option>

              <option value="Warehouse A">
                Warehouse A
              </option>
            </select>

          </div>


          {/* REFERENCE */}

          <div className="form-group">

            <label>
              Reference
            </label>

            <input
              type="text"
              name="reference"
              value={form.reference}
              onChange={handleChange}
              placeholder="TRF-001"
            />

          </div>


          {/* SUBMIT */}

          <div className="form-actions">

            <button
              type="submit"
              className="primary-button"
            >
              <ArrowLeftRight
                size={18}
              />

              Validate Transfer
            </button>

          </div>

        </form>
      </div>


      {/* =================================================
          LOCATION PREVIEW
      ================================================= */}

      {selectedProduct && (
        <div className="location-preview">

          <div className="location-preview-header">
            <div>
              <h3>
                Current Location Stock
              </h3>

              <p>
                {
                  selectedProduct.name
                }
              </p>
            </div>

            <MapPin size={20} />
          </div>

          <div className="location-cards">

            {[
              "Main Store",
              "Production Rack",
              "Main Warehouse",
              "Production Warehouse",
              "Warehouse A",
            ].map((location) => {

              const quantity =
                getLocationStock(
                  selectedProduct,
                  location
                );

              return (
                <div
                  className="location-card"
                  key={location}
                >
                  <span>
                    {location}
                  </span>

                  <strong>
                    {quantity}{" "}
                    {
                      selectedProduct.unit
                    }
                  </strong>
                </div>
              );
            })}

          </div>
        </div>
      )}


      {/* =================================================
          TRANSFER HISTORY
      ================================================= */}

      <div className="panel">

        <div className="panel-header">

          <div>
            <h3>
              Transfer History
            </h3>

            <p>
              {transferHistory.length}{" "}
              transfers recorded
            </p>
          </div>

        </div>

        {transferHistory.length ===
        0 ? (
          <div className="empty-state">

            <ArrowLeftRight
              size={48}
            />

            <h3>
              No transfers yet
            </h3>

            <p>
              Create your first internal
              stock transfer.
            </p>

          </div>
        ) : (
          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
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
                    Date
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
                      key={
                        operation.id
                      }
                    >

                      <td>
                        <strong>
                          {
                            operation.productName
                          }
                        </strong>

                        <small>
                          {" "}
                          {
                            operation.sku
                          }
                        </small>
                      </td>

                      <td>
                        {
                          operation.quantity
                        }{" "}
                        {
                          operation.unit
                        }
                      </td>

                      <td>
                        {
                          operation.fromLocation
                        }
                      </td>

                      <td>
                        {
                          operation.toLocation
                        }
                      </td>

                      <td>
                        {
                          operation.reference
                        }
                      </td>

                      <td>
                        {
                          operation.date
                        }
                      </td>

                      <td>
                        <span className="badge done">
                          <CheckCircle2
                            size={13}
                          />

                          {
                            operation.status
                          }
                        </span>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </>
  );
}

export default Transfers;