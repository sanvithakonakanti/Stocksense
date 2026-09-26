import { useState } from "react";
import { ClipboardEdit, CheckCircle2 } from "lucide-react";

function Adjustments({
  products,
  setProducts,
  operations,
  setOperations,
}) {
  const [form, setForm] = useState({
    productId: "",
    countedQuantity: "",
    reason: "",
  });

  const selectedProduct = products.find(
    (product) =>
      product.id === Number(form.productId)
  );

  const currentStock = selectedProduct
    ? selectedProduct.stock
    : 0;

  const physicalStock =
    form.countedQuantity === ""
      ? ""
      : Number(form.countedQuantity);

  const difference =
    physicalStock === ""
      ? 0
      : physicalStock - currentStock;

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    if (
      form.countedQuantity === "" ||
      Number(form.countedQuantity) < 0
    ) {
      alert("Please enter a valid physical quantity.");
      return;
    }

    if (!form.reason.trim()) {
      alert("Please enter a reason for the adjustment.");
      return;
    }

    const newStock = Number(form.countedQuantity);

    /* Update actual product stock */

    const updatedProducts = products.map(
      (product) => {
        if (product.id !== selectedProduct.id) {
          return product;
        }

        return {
          ...product,
          stock: newStock,
        };
      }
    );

    setProducts(updatedProducts);

    /* Record adjustment in Stock Ledger */

    const adjustmentOperation = {
      id: Date.now(),

      type: "adjustment",

      productId: selectedProduct.id,

      productName: selectedProduct.name,

      sku: selectedProduct.sku,

      quantity: Math.abs(difference),

      unit: selectedProduct.unit,

      party: "Inventory Adjustment",

      reference: form.reason,

      date: new Date().toLocaleString(),

      status: "Validated",

      previousStock: currentStock,

      countedStock: newStock,

      difference: difference,
    };

    setOperations([
      adjustmentOperation,
      ...operations,
    ]);

    alert(
      `Stock adjusted from ${currentStock} to ${newStock} ${selectedProduct.unit}.`
    );

    setForm({
      productId: "",
      countedQuantity: "",
      reason: "",
    });
  }

  return (
    <div>
      {/* PAGE HEADER */}

      <div className="page-heading">
        <div>
          <h2>Inventory Adjustments</h2>

          <p>
            Reconcile system stock with the
            physical stock count.
          </p>
        </div>
      </div>

      <div className="operation-grid">

        {/* ADJUSTMENT FORM */}

        <div className="form-panel">
          <div className="panel-header">
            <div>
              <h3>New Stock Adjustment</h3>

              <p>
                Update inventory when the physical
                count differs from the system.
              </p>
            </div>

            <ClipboardEdit size={24} />
          </div>

          <form onSubmit={handleSubmit}>

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

                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name} —{" "}
                      {product.stock}{" "}
                      {product.unit}
                    </option>
                  ))}
                </select>
              </label>

              {/* PHYSICAL COUNT */}

              <label>
                Physical Count *

                <input
                  type="number"
                  min="0"
                  name="countedQuantity"
                  value={form.countedQuantity}
                  onChange={handleChange}
                  placeholder="Enter actual quantity"
                />
              </label>

              {/* REASON */}

              <label>
                Reason *

                <input
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="e.g. Damaged items"
                />
              </label>

            </div>

            {/* STOCK COMPARISON */}

            {selectedProduct &&
              form.countedQuantity !== "" && (
                <div className="adjustment-summary">

                  <div>
                    <span>System Stock</span>

                    <strong>
                      {currentStock}{" "}
                      {selectedProduct.unit}
                    </strong>
                  </div>

                  <div>
                    <span>Physical Count</span>

                    <strong>
                      {physicalStock}{" "}
                      {selectedProduct.unit}
                    </strong>
                  </div>

                  <div
                    className={
                      difference > 0
                        ? "adjustment-positive"
                        : difference < 0
                        ? "adjustment-negative"
                        : "adjustment-neutral"
                    }
                  >
                    <span>Difference</span>

                    <strong>
                      {difference > 0
                        ? "+"
                        : ""}
                      {difference}{" "}
                      {selectedProduct.unit}
                    </strong>
                  </div>

                </div>
              )}

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
              >
                <CheckCircle2 size={18} />

                Validate Adjustment
              </button>

            </div>

          </form>
        </div>

        {/* INFORMATION PANEL */}

        <div className="panel">

          <div className="panel-header">
            <div>
              <h3>How Adjustments Work</h3>

              <p>
                Stock reconciliation process
              </p>
            </div>

            <ClipboardEdit size={22} />
          </div>

          <div className="adjustment-steps">

            <div>
              <strong>1. Select Product</strong>
              <p>
                Choose the product being counted.
              </p>
            </div>

            <div>
              <strong>2. Enter Physical Count</strong>
              <p>
                Enter the actual quantity found
                in the warehouse.
              </p>
            </div>

            <div>
              <strong>3. Review Difference</strong>
              <p>
                Compare physical stock with
                system stock.
              </p>
            </div>

            <div>
              <strong>4. Validate</strong>
              <p>
                Stock is updated and the adjustment
                is recorded in the Stock Ledger.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* HISTORY */}

      <div className="panel">
        <div className="panel-header">

          <div>
            <h3>Adjustment History</h3>

            <p>
              Previously validated adjustments
            </p>
          </div>

        </div>

        <div className="table-wrapper">

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Previous Stock</th>
                <th>Physical Count</th>
                <th>Difference</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {operations
                .filter(
                  (operation) =>
                    operation.type ===
                    "adjustment"
                )
                .map((operation) => (
                  <tr key={operation.id}>

                    <td>
                      {operation.date}
                    </td>

                    <td>
                      <strong>
                        {operation.productName}
                      </strong>
                    </td>

                    <td>
                      {operation.previousStock}{" "}
                      {operation.unit}
                    </td>

                    <td>
                      {operation.countedStock}{" "}
                      {operation.unit}
                    </td>

                    <td>
                      {operation.difference > 0
                        ? "+"
                        : ""}
                      {operation.difference}{" "}
                      {operation.unit}
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
                ))}
            </tbody>
          </table>

          {operations.filter(
            (operation) =>
              operation.type === "adjustment"
          ).length === 0 && (
            <div className="empty-message">
              No inventory adjustments yet.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Adjustments;