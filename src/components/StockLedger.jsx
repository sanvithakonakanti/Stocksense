import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  ClipboardEdit,
  BookOpen,
  Search,
} from "lucide-react";

function StockLedger({ operations }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredOperations = useMemo(() => {
    return operations.filter((operation) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        operation.productName
          ?.toLowerCase()
          .includes(searchText) ||
        operation.sku
          ?.toLowerCase()
          .includes(searchText) ||
        operation.party
          ?.toLowerCase()
          .includes(searchText) ||
        operation.reference
          ?.toLowerCase()
          .includes(searchText);

      const matchesType =
        typeFilter === "All" ||
        operation.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [operations, search, typeFilter]);

  const receiptCount = operations.filter(
    (operation) => operation.type === "receipt"
  ).length;

  const deliveryCount = operations.filter(
    (operation) => operation.type === "delivery"
  ).length;

  const adjustmentCount = operations.filter(
    (operation) => operation.type === "adjustment"
  ).length;
  const transferCount = operations.filter(
  (operation) => operation.type === "transfer"
).length;

  function getMovementName(type) {
    if (type === "receipt") return "Receipt";
    if (type === "delivery") return "Delivery";
    if (type === "adjustment") return "Adjustment";
    if (type === "transfer") return "Transfer";

    return type;
  }

  return (
    <div>
      {/* PAGE HEADER */}

      <div className="page-heading">
        <div>
          <h2>Stock Ledger</h2>

          <p>
            Track all validated inventory movements
            in one place.
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Movements</p>

          <h3>{operations.length}</h3>

          <span>
            All inventory transactions
          </span>
        </div>

        <div className="stat-card">
          <p>Receipts</p>

          <h3>{receiptCount}</h3>

          <span>
            Incoming stock movements
          </span>
        </div>

        <div className="stat-card">
          <p>Deliveries</p>

          <h3>{deliveryCount}</h3>

          <span>
            Outgoing stock movements
          </span>
        </div>

        <div className="stat-card">
          <p>Adjustments</p>

          <h3>{adjustmentCount}</h3>

          <span>
            Stock corrections
          </span>
        </div>
      </div>

      {/* LEDGER PANEL */}

      <div className="panel product-table-panel">
        <div className="panel-header">
          <div>
            <h3>Inventory Movement History</h3>

            <p>
              Receipts, deliveries and stock
              adjustments.
            </p>
          </div>

          <BookOpen size={22} />
        </div>

        {/* FILTERS */}

        <div className="product-toolbar">
          <div className="search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search product, SKU, party, reference..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            className="filter-select"
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
          >
            <option value="All">
              All Movements
            </option>

            <option value="receipt">
              Receipts
            </option>

            <option value="delivery">
              Deliveries
            </option>

            <option value="adjustment">
              Adjustments
            </option>
            <option value="transfer">
                Transfers
            </option>
          </select>
        </div>

        {/* TABLE */}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>

                <th>Movement</th>

                <th>Product</th>

                <th>SKU</th>

                <th>Quantity</th>

                <th>Details</th>

                <th>Reference</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOperations.map(
                (operation) => {
                  const isReceipt =
                    operation.type === "receipt";

                  const isDelivery =
                    operation.type === "delivery";

                  const isAdjustment =
                    operation.type ===
                    "adjustment";
                    const isTransfer = 
                    operation.type === 
                    "transfer";

                  let quantityText = "";

                  if (isReceipt) {
                    quantityText =
                      `+${operation.quantity}`;
                  } else if (isDelivery) {
                    quantityText =
                      `-${operation.quantity}`;
                  } else if (isAdjustment) {
                    const difference =
                      operation.difference ?? 0;

                    quantityText =
                      difference > 0
                        ? `+${difference}`
                        : `${difference}`;
                  }
                  else if (isTransfer) quantityText = `${operation.quantity}`;

                  return (
                    <tr key={operation.id}>
                      {/* DATE */}

                      <td>
                        {operation.date}
                      </td>

                      {/* MOVEMENT */}

                      <td>
                        <span
                          className={`ledger-movement ${
                            isReceipt
                              ? "ledger-receipt"
                              : isDelivery
                              ? "ledger-delivery"
                              : isTransfer
                              ? "ledger-transfer"
                              : "ledger-adjustment"
                          }`}
                        >
                          {isReceipt && (
                            <ArrowDownToLine
                              size={14}
                            />
                          )}

                          {isDelivery && (
                            <ArrowUpFromLine
                              size={14}
                            />
                          )}

                          {isAdjustment && (
                            <ClipboardEdit
                              size={14}
                            />
                          )}
                          {isTransfer && (
                         <ArrowLeftRight 
                         size={14} />
                      )}

                          {getMovementName(
                            operation.type
                          )}
                        </span>
                      </td>

                      {/* PRODUCT */}

                      <td>
                        <strong>
                          {operation.productName}
                        </strong>
                      </td>

                      {/* SKU */}

                      <td>
                        {operation.sku}
                      </td>

                      {/* QUANTITY */}

                      <td>
                        <strong
                          className={
                            isReceipt
                              ? "ledger-positive"
                              : isDelivery
                              ? "ledger-negative"
                              : operation.difference >
                                0
                              ? "ledger-positive"
                              : operation.difference <
                                0
                              ? "ledger-negative"
                              : ""
                          }
                        >
                          {quantityText}{" "}
                          {operation.unit}
                        </strong>
                      </td>

                      {/* DETAILS */}

                      <td>
                        {isAdjustment
                          ? operation.party
                          : operation.party}
                      </td>

                      {/* REFERENCE */}

                      <td>
                        {operation.reference}
                      </td>

                      {/* STATUS */}

                      <td>
                        <span className="badge done">
                          {operation.status}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>

          {/* EMPTY STATE */}

          {filteredOperations.length ===
            0 && (
            <div className="empty-message">
              {operations.length === 0
                ? "No stock movements recorded yet."
                : "No movements match your search or filter."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StockLedger;