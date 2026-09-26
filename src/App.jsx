import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  ClipboardEdit,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Trash2,
  AlertTriangle,
  Boxes,
} from "lucide-react";

import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Steel Rods",
    sku: "STL-001",
    category: "Raw Materials",
    unit: "KG",
    stock: 100,
    reorderLevel: 20,
  },
  {
    id: 2,
    name: "Office Chairs",
    sku: "CHR-001",
    category: "Furniture",
    unit: "Units",
    stock: 45,
    reorderLevel: 15,
  },
  {
    id: 3,
    name: "Bolts",
    sku: "BLT-001",
    category: "Hardware",
    unit: "Units",
    stock: 12,
    reorderLevel: 20,
  },
  {
    id: 4,
    name: "Steel Sheets",
    sku: "STL-002",
    category: "Raw Materials",
    unit: "Sheets",
    stock: 75,
    reorderLevel: 25,
  },
];

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("stocksense_products");

    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [operations, setOperations] = useState(() => {
    const saved = localStorage.getItem("stocksense_operations");

    return saved ? JSON.parse(saved) : [];
  });

  /* Save products */
  useEffect(() => {
    localStorage.setItem(
      "stocksense_products",
      JSON.stringify(products)
    );
  }, [products]);

  /* Save operations */
  useEffect(() => {
    localStorage.setItem(
      "stocksense_operations",
      JSON.stringify(operations)
    );
  }, [operations]);

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      icon: Package,
    },
    {
      name: "Receipts",
      icon: ArrowDownToLine,
    },
    {
      name: "Deliveries",
      icon: ArrowUpFromLine,
    },
    {
      name: "Transfers",
      icon: ArrowLeftRight,
    },
    {
      name: "Adjustments",
      icon: ClipboardEdit,
    },
    {
      name: "Stock Ledger",
      icon: History,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "open" : "closed"
        }`}
      >
        <div className="logo">
          <div className="logo-box">S</div>

          {sidebarOpen && (
            <span>StockSense</span>
          )}
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActivePage(item.name)
                }
              >
                <Icon size={20} />

                {sidebarOpen && (
                  <span>{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        <button className="logout">
          <LogOut size={20} />

          {sidebarOpen && (
            <span>Logout</span>
          )}
        </button>
      </aside>

      {/* MAIN */}

      <main className="main">

        {/* TOP BAR */}

        <header className="topbar">

          <button
            className="menu-button"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >
            {sidebarOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          <div>
            <h1>{activePage}</h1>

            <p>
              Inventory Management System
            </p>
          </div>

          <div className="profile">

            <div className="avatar">
              SK
            </div>

            <div>
              <strong>
                Sanvitha K
              </strong>

              <small>
                Inventory Manager
              </small>
            </div>

          </div>

        </header>

        {/* CONTENT */}

        <section className="content">

          {activePage === "Dashboard" && (
            <Dashboard
              products={products}
            />
          )}

          {activePage === "Products" && (
            <ProductsPage
              products={products}
              setProducts={setProducts}
            />
          )}

          {activePage === "Receipts" && (
            <OperationsPage
              type="receipt"
              products={products}
              setProducts={setProducts}
              operations={operations}
              setOperations={setOperations}
            />
          )}

          {activePage === "Deliveries" && (
            <OperationsPage
              type="delivery"
              products={products}
              setProducts={setProducts}
              operations={operations}
              setOperations={setOperations}
            />
          )}

          {activePage !== "Dashboard" &&
            activePage !== "Products" &&
            activePage !== "Receipts" &&
            activePage !== "Deliveries" && (

              <div className="placeholder">

                <Package size={48} />

                <h2>
                  {activePage}
                </h2>

                <p>
                  This module will be implemented next.
                </p>

              </div>
            )}

        </section>

      </main>

    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ products }) {

  const totalProducts =
    products.length;

  const lowStock =
    products.filter(
      (product) =>
        product.stock <=
        product.reorderLevel
    ).length;

  const outOfStock =
    products.filter(
      (product) =>
        product.stock === 0
    ).length;

  const totalUnits =
    products.reduce(
      (total, product) =>
        total +
        Number(product.stock),
      0
    );

  return (
    <>

      <div className="welcome">

        <div>

          <h2>
            Good morning, Sanvitha 👋
          </h2>

          <p>
            Here's what's happening with
            your inventory today.
          </p>

        </div>

        <button className="primary-button">

          <Plus size={18} />

          New Operation

        </button>

      </div>

      {/* STAT CARDS */}

      <div className="stats-grid">

        <div className="stat-card">

          <p>
            Total Products
          </p>

          <h3>
            {totalProducts}
          </h3>

          <span>
            {totalUnits} total units
          </span>

        </div>

        <div className="stat-card">

          <p>
            Low Stock
          </p>

          <h3>
            {lowStock}
          </h3>

          <span>
            {lowStock
              ? "Needs attention"
              : "All levels healthy"}
          </span>

        </div>

        <div className="stat-card">

          <p>
            Out of Stock
          </p>

          <h3>
            {outOfStock}
          </h3>

          <span>
            Products unavailable
          </span>

        </div>

        <div className="stat-card">

          <p>
            Pending Receipts
          </p>

          <h3>
            12
          </h3>

          <span>
            Incoming
          </span>

        </div>

      </div>

      {/* DASHBOARD TABLE */}

      <div className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">

            <h3>
              Inventory Overview
            </h3>

          </div>

          <table>

            <thead>

              <tr>

                <th>
                  Product
                </th>

                <th>
                  SKU
                </th>

                <th>
                  Stock
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {products
                .slice(0, 5)
                .map((product) => {

                  const low =
                    product.stock <=
                    product.reorderLevel;

                  return (
                    <tr key={product.id}>

                      <td>
                        {product.name}
                      </td>

                      <td>
                        {product.sku}
                      </td>

                      <td>
                        {product.stock}{" "}
                        {product.unit}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            low
                              ? "waiting"
                              : "done"
                          }`}
                        >
                          {low
                            ? "Low Stock"
                            : "In Stock"}
                        </span>

                      </td>

                    </tr>
                  );
                })}

            </tbody>

          </table>

        </div>

        {/* LOW STOCK */}

        <div className="panel">

          <div className="panel-header">

            <h3>
              Low Stock Alerts
            </h3>

          </div>

          {products.filter(
            (product) =>
              product.stock <=
              product.reorderLevel
          ).length === 0 ? (

            <p className="empty-message">
              No low-stock products.
            </p>

          ) : (

            products
              .filter(
                (product) =>
                  product.stock <=
                  product.reorderLevel
              )
              .map((product) => (

                <div
                  className="alert-item"
                  key={product.id}
                >

                  <div>

                    <strong>
                      {product.name}
                    </strong>

                    <p>
                      {product.stock}{" "}
                      {product.unit}
                      {" "}remaining
                    </p>

                  </div>

                  <span className="warning">
                    Low
                  </span>

                </div>

              ))

          )}

        </div>

      </div>

    </>
  );
}

/* =========================================================
   PRODUCTS PAGE
========================================================= */

function ProductsPage({
  products,
  setProducts,
}) {

  const [showForm, setShowForm] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [form, setForm] =
    useState({
      name: "",
      sku: "",
      category: "Raw Materials",
      unit: "Units",
      stock: "",
      reorderLevel: "",
    });

  const categories =
    useMemo(() => {

      return [
        "All",
        ...new Set(
          products.map(
            (product) =>
              product.category
          )
        ),
      ];

    }, [products]);

  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        product.sku
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category ===
          category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  function handleChange(event) {

    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });

  }

  function addProduct(event) {

    event.preventDefault();

    if (
      !form.name ||
      !form.sku ||
      form.stock === "" ||
      form.reorderLevel === ""
    ) {

      alert(
        "Please fill all required fields."
      );

      return;
    }

    const duplicateSku =
      products.some(
        (product) =>
          product.sku.toLowerCase() ===
          form.sku.toLowerCase()
      );

    if (duplicateSku) {

      alert(
        "SKU already exists."
      );

      return;
    }

    const newProduct = {

      id: Date.now(),

      name: form.name,

      sku: form.sku,

      category: form.category,

      unit: form.unit,

      stock:
        Number(form.stock),

      reorderLevel:
        Number(form.reorderLevel),
    };

    setProducts([
      ...products,
      newProduct,
    ]);

    setForm({
      name: "",
      sku: "",
      category:
        "Raw Materials",
      unit: "Units",
      stock: "",
      reorderLevel: "",
    });

    setShowForm(false);
  }

  function deleteProduct(id) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (confirmed) {

      setProducts(
        products.filter(
          (product) =>
            product.id !== id
        )
      );

    }
  }

  return (
    <div>

      {/* PAGE HEADER */}

      <div className="page-heading">

        <div>

          <h2>
            Products
          </h2>

          <p>
            Manage products and monitor
            stock availability.
          </p>

        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowForm(true)
          }
        >

          <Plus size={18} />

          Add Product

        </button>

      </div>

      {/* ADD PRODUCT FORM */}

      {showForm && (

        <div className="form-panel">

          <div className="panel-header">

            <div>

              <h3>
                Add New Product
              </h3>

              <p>
                Create a product and
                define its stock level.
              </p>

            </div>

            <button
              className="close-button"
              onClick={() =>
                setShowForm(false)
              }
            >

              <X size={20} />

            </button>

          </div>

          <form
            onSubmit={addProduct}
          >

            <div className="form-grid">

              <label>

                Product Name *

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Steel Rods"
                />

              </label>

              <label>

                SKU / Code *

                <input
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  placeholder="e.g. STL-003"
                />

              </label>

              <label>

                Category

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >

                  <option>
                    Raw Materials
                  </option>

                  <option>
                    Furniture
                  </option>

                  <option>
                    Hardware
                  </option>

                  <option>
                    Finished Goods
                  </option>

                  <option>
                    Electronics
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </label>

              <label>

                Unit of Measure

                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                >

                  <option>
                    Units
                  </option>

                  <option>
                    KG
                  </option>

                  <option>
                    Litres
                  </option>

                  <option>
                    Boxes
                  </option>

                  <option>
                    Sheets
                  </option>

                  <option>
                    Metres
                  </option>

                </select>

              </label>

              <label>

                Initial Stock *

                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                />

              </label>

              <label>

                Reorder Level *

                <input
                  type="number"
                  min="0"
                  name="reorderLevel"
                  value={form.reorderLevel}
                  onChange={handleChange}
                  placeholder="20"
                />

              </label>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Save Product
              </button>

            </div>

          </form>

        </div>

      )}

      {/* SEARCH */}

      <div className="product-toolbar">

        <div className="search-box">

          <Search size={18} />

          <input
            placeholder="Search by product or SKU..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>

        <select
          className="filter-select"
          value={category}
          onChange={(event) =>
            setCategory(
              event.target.value
            )
          }
        >

          {categories.map(
            (item) => (
              <option key={item}>
                {item}
              </option>
            )
          )}

        </select>

      </div>

      {/* PRODUCT TABLE */}

      <div className="panel product-table-panel">

        <div className="panel-header">

          <div>

            <h3>
              Product Inventory
            </h3>

            <p>
              {filteredProducts.length}
              {" "}products found
            </p>

          </div>

          <div className="product-count">

            <Boxes size={18} />

            {products.length}
            {" "}Total

          </div>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Product
                </th>

                <th>
                  SKU
                </th>

                <th>
                  Category
                </th>

                <th>
                  Unit
                </th>

                <th>
                  Stock
                </th>

                <th>
                  Reorder Level
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map(
                (product) => {

                  const low =
                    product.stock <=
                    product.reorderLevel;

                  const out =
                    product.stock ===
                    0;

                  return (

                    <tr
                      key={product.id}
                    >

                      <td>
                        <strong>
                          {product.name}
                        </strong>
                      </td>

                      <td>
                        {product.sku}
                      </td>

                      <td>
                        {product.category}
                      </td>

                      <td>
                        {product.unit}
                      </td>

                      <td>
                        <strong>
                          {product.stock}
                        </strong>
                      </td>

                      <td>
                        {product.reorderLevel}
                      </td>

                      <td>

                        {out ? (

                          <span className="badge danger">
                            Out of Stock
                          </span>

                        ) : low ? (

                          <span className="badge warning">

                            <AlertTriangle
                              size={12}
                            />

                            Low Stock

                          </span>

                        ) : (

                          <span className="badge done">
                            In Stock
                          </span>

                        )}

                      </td>

                      <td>

                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteProduct(
                              product.id
                            )
                          }
                          title="Delete product"
                        >

                          <Trash2
                            size={17}
                          />

                        </button>

                      </td>

                    </tr>

                  );
                }
              )}

            </tbody>

          </table>

          {filteredProducts.length ===
            0 && (

            <div className="empty-message">
              No products found.
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   RECEIPTS + DELIVERIES
========================================================= */

function OperationsPage({
  type,
  products,
  setProducts,
  operations,
  setOperations,
}) {

  const isReceipt =
    type === "receipt";

  const [form, setForm] =
    useState({
      productId: "",
      quantity: "",
      party: "",
      reference: "",
    });

  const operationList =
    operations.filter(
      (operation) =>
        operation.type === type
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

    if (
      !form.productId ||
      !form.quantity ||
      !form.party
    ) {

      alert(
        "Please fill all required fields."
      );

      return;
    }

    const quantity =
      Number(form.quantity);

    if (quantity <= 0) {

      alert(
        "Quantity must be greater than 0."
      );

      return;
    }

    const product =
      products.find(
        (item) =>
          item.id ===
          Number(form.productId)
      );

    if (!product) {

      alert(
        "Please select a product."
      );

      return;
    }

    /* Prevent negative stock */

    if (
      !isReceipt &&
      quantity > product.stock
    ) {

      alert(
        `Insufficient stock. Available stock: ${product.stock} ${product.unit}`
      );

      return;
    }

    /* Update product stock */

    const updatedProducts =
      products.map((item) => {

        if (
          item.id !==
          product.id
        ) {
          return item;
        }

        return {
          ...item,

          stock: isReceipt
            ? item.stock + quantity
            : item.stock - quantity,
        };

      });

    setProducts(
      updatedProducts
    );

    /* Create operation */

    const newOperation = {

      id: Date.now(),

      type,

      productId:
        product.id,

      productName:
        product.name,

      sku:
        product.sku,

      quantity,

      unit:
        product.unit,

      party:
        form.party,

      reference:
        form.reference ||
        "N/A",

      date:
        new Date().toLocaleString(),

      status:
        "Validated",
    };

    setOperations([
      newOperation,
      ...operations,
    ]);

    /* Clear form */

    setForm({
      productId: "",
      quantity: "",
      party: "",
      reference: "",
    });

    alert(
      isReceipt
        ? `Receipt validated. ${quantity} ${product.unit} added to ${product.name}.`
        : `Delivery validated. ${quantity} ${product.unit} removed from ${product.name}.`
    );
  }

  return (

    <div>

      {/* PAGE HEADER */}

      <div className="page-heading">

        <div>

          <h2>
            {isReceipt
              ? "Receipts"
              : "Deliveries"}
          </h2>

          <p>

            {isReceipt
              ? "Receive incoming goods and increase available stock."
              : "Process outgoing goods and reduce available stock."}

          </p>

        </div>

      </div>

      <div className="operation-grid">

        {/* FORM */}

        <div className="form-panel">

          <div className="panel-header">

            <div>

              <h3>

                {isReceipt
                  ? "New Receipt"
                  : "New Delivery"}

              </h3>

              <p>

                {isReceipt
                  ? "Record goods received from a supplier."
                  : "Record goods delivered to a customer."}

              </p>

            </div>

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
                  onChange={
                    handleChange
                  }
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
                  onChange={
                    handleChange
                  }
                  placeholder="Enter quantity"
                />

              </label>

              {/* SUPPLIER / CUSTOMER */}

              <label>

                {isReceipt
                  ? "Supplier *"
                  : "Customer *"}

                <input
                  name="party"
                  value={form.party}
                  onChange={
                    handleChange
                  }
                  placeholder={
                    isReceipt
                      ? "Supplier name"
                      : "Customer name"
                  }
                />

              </label>

              {/* REFERENCE */}

              <label>

                Reference

                <input
                  name="reference"
                  value={
                    form.reference
                  }
                  onChange={
                    handleChange
                  }
                  placeholder={
                    isReceipt
                      ? "PO-001"
                      : "SO-001"
                  }
                />

              </label>

            </div>

            <div className="operation-summary">

              <strong>

                Stock will be{" "}
                {isReceipt
                  ? "increased"
                  : "decreased"}

              </strong>

              <span>

                {isReceipt
                  ? "Validated receipt adds quantity to inventory."
                  : "Validated delivery removes quantity from inventory."}

              </span>

            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
              >

                {isReceipt
                  ? "Validate Receipt"
                  : "Validate Delivery"}

              </button>

            </div>

          </form>

        </div>

        {/* HISTORY */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>

                {isReceipt
                  ? "Receipt History"
                  : "Delivery History"}

              </h3>

              <p>

                {operationList.length}
                {" "}validated operations

              </p>

            </div>

          </div>

          {operationList.length ===
          0 ? (

            <div className="empty-message">

              No{" "}
              {isReceipt
                ? "receipts"
                : "deliveries"}{" "}
              yet.

            </div>

          ) : (

            <div>

              {operationList
                .slice(0, 8)
                .map(
                  (operation) => (

                    <div
                      className="operation-history"
                      key={operation.id}
                    >

                      <div>

                        <strong>
                          {operation.productName}
                        </strong>

                        <p>

                          {operation.party}
                          {" • "}
                          {operation.date}

                        </p>

                      </div>

                      <div className="operation-quantity">

                        <strong
                          className={
                            isReceipt
                              ? "positive"
                              : "negative"
                          }
                        >

                          {isReceipt
                            ? "+"
                            : "-"}

                          {operation.quantity}
                          {" "}
                          {operation.unit}

                        </strong>

                        <span className="badge done">
                          Validated
                        </span>

                      </div>

                    </div>

                  )
                )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   EXPORT
========================================================= */

export default App;