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

import WarehouseSettings from "./components/WarehouseSettings";
import "./App.css";
import StockLedger from "./components/StockLedger";
import Adjustments from "./components/Adjustments";
import Transfers from "./components/Transfers";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("stocksense_authenticated") === "true";
  });

  const [authMode, setAuthMode] = useState("login");

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("stocksense_user");
    return saved ? JSON.parse(saved) : null;
  });

  function handleLogin(user) {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("stocksense_authenticated", "true");
    localStorage.setItem("stocksense_user", JSON.stringify(user));
  }

  function handleSignup(user) {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("stocksense_authenticated", "true");
    localStorage.setItem("stocksense_user", JSON.stringify(user));
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthMode("login");
    localStorage.removeItem("stocksense_authenticated");
    localStorage.removeItem("stocksense_user");
  }

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

  useEffect(() => {
    localStorage.setItem(
      "stocksense_products",
      JSON.stringify(products)
    );
  }, [products]);

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

  if (!isAuthenticated) {
    return authMode === "login" ? (
      <Login
        onLogin={handleLogin}
        onShowSignup={() => setAuthMode("signup")}
      />
    ) : (
      <Signup
        onSignup={handleSignup}
        onShowLogin={() => setAuthMode("login")}
      />
    );
  }

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

        <button
          className="logout"
          onClick={handleLogout}
        >
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
              operations={operations}
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

          {activePage === "Stock Ledger" && (
            <StockLedger
              operations={operations}
            />
          )}

          {activePage === "Adjustments" && (
            <Adjustments
              products={products}
              setProducts={setProducts}
              operations={operations}
              setOperations={setOperations}
            />
          )}

          {activePage === "Transfers" && (
            <Transfers
              products={products}
              operations={operations}
              setOperations={setOperations}
            />
          )}

          {activePage === "Settings" && (
            <WarehouseSettings />
          )}

          {activePage !== "Dashboard" &&
            activePage !== "Products" &&
            activePage !== "Receipts" &&
            activePage !== "Deliveries" &&
            activePage !== "Stock Ledger" &&
            activePage !== "Adjustments" &&
            activePage !== "Transfers" && (
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

function Dashboard({ products ,operations,}) {
    const [documentFilter, setDocumentFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [warehouseFilter, setWarehouseFilter] =
    useState("All");

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const warehouses = [
    "All",
    "Main Store",
    "Production Rack",
    "Main Warehouse",
    "Production Warehouse",
  ];
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
          {/* DASHBOARD FILTERS */}

      <div className="dashboard-filters">

        <div className="dashboard-filter">
          <label>
            Document Type
          </label>

          <select
            value={documentFilter}
            onChange={(event) =>
              setDocumentFilter(
                event.target.value
              )
            }
          >
            <option value="All">
              All Documents
            </option>

            <option value="receipt">
              Receipts
            </option>

            <option value="delivery">
              Deliveries
            </option>

            <option value="transfer">
              Internal Transfers
            </option>

            <option value="adjustment">
              Adjustments
            </option>
          </select>
        </div>


        <div className="dashboard-filter">
          <label>
            Status
          </label>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Draft">
              Draft
            </option>

            <option value="Waiting">
              Waiting
            </option>

            <option value="Ready">
              Ready
            </option>

            <option value="Validated">
              Done
            </option>

            <option value="Canceled">
              Canceled
            </option>
          </select>
        </div>


        <div className="dashboard-filter">
          <label>
            Category
          </label>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >
            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>
        </div>


        <div className="dashboard-filter">
          <label>
            Warehouse / Location
          </label>

          <select
            value={warehouseFilter}
            onChange={(event) =>
              setWarehouseFilter(
                event.target.value
              )
            }
          >
            {warehouses.map(
              (warehouse) => (
                <option
                  key={warehouse}
                  value={warehouse}
                >
                  {warehouse}
                </option>
              )
            )}
          </select>
        </div>

      </div>
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
  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    unit: "Units",
    stock: "",
    reorderLevel: "",
  });

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts =
    products.filter((product) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchText) ||
        product.sku
          .toLowerCase()
          .includes(searchText) ||
        product.category
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category ===
          categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

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

  function resetForm() {
    setForm({
      name: "",
      sku: "",
      category: "",
      unit: "Units",
      stock: "",
      reorderLevel: "",
    });

    setEditingProduct(null);
    setShowForm(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name ||
      !form.sku ||
      !form.category
    ) {
      alert(
        "Please complete all required fields."
      );
      return;
    }

    if (
      form.stock === "" ||
      Number(form.stock) < 0
    ) {
      alert(
        "Please enter a valid stock quantity."
      );
      return;
    }

    if (
      form.reorderLevel === "" ||
      Number(form.reorderLevel) < 0
    ) {
      alert(
        "Please enter a valid reorder level."
      );
      return;
    }

    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id ===
          editingProduct.id
            ? {
                ...product,
                name: form.name,
                sku: form.sku,
                category:
                  form.category,
                unit: form.unit,
                stock: Number(
                  form.stock
                ),
                reorderLevel:
                  Number(
                    form.reorderLevel
                  ),
              }
            : product
        )
      );

      alert(
        "Product updated successfully."
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name,
        sku: form.sku,
        category:
          form.category,
        unit: form.unit,
        stock: Number(
          form.stock
        ),
        reorderLevel:
          Number(
            form.reorderLevel
          ),
      };

      setProducts([
        newProduct,
        ...products,
      ]);

      alert(
        "Product added successfully."
      );
    }

    resetForm();
  }

  function handleEdit(product) {
    setEditingProduct(product);

    setForm({
      name: product.name,
      sku: product.sku,
      category:
        product.category,
      unit: product.unit,
      stock: String(
        product.stock
      ),
      reorderLevel: String(
        product.reorderLevel
      ),
    });

    setShowForm(true);
  }

  function handleDelete(productId) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) {
      return;
    }

    setProducts(
      products.filter(
        (product) =>
          product.id !== productId
      )
    );
  }

  return (
    <>
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h2>
            Products
          </h2>

          <p>
            Manage your inventory
            products and stock levels.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div className="form-panel">
          <div className="panel-header">
            <h3>
              {editingProduct
                ? "Edit Product"
                : "Add New Product"}
            </h3>

            <button
              className="icon-button"
              onClick={resetForm}
            >
              <X size={20} />
            </button>
          </div>

          <form
            className="form-grid"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label>
                Product Name *
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label>
                SKU / Code *
              </label>

              <input
                type="text"
                name="sku"
                value={form.sku}
                onChange={
                  handleChange
                }
                placeholder="e.g. STL-001"
              />
            </div>

            <div className="form-group">
              <label>
                Category *
              </label>

              <input
                type="text"
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Raw Materials"
              />
            </div>

            <div className="form-group">
              <label>
                Unit of Measure
              </label>

              <select
                name="unit"
                value={form.unit}
                onChange={
                  handleChange
                }
              >
                <option value="Units">
                  Units
                </option>

                <option value="KG">
                  KG
                </option>

                <option value="Litres">
                  Litres
                </option>

                <option value="Meters">
                  Meters
                </option>

                <option value="Boxes">
                  Boxes
                </option>

                <option value="Pieces">
                  Pieces
                </option>

                <option value="Sheets">
                  Sheets
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Initial Stock
              </label>

              <input
                type="number"
                name="stock"
                min="0"
                value={form.stock}
                onChange={
                  handleChange
                }
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>
                Reorder Level
              </label>

              <input
                type="number"
                name="reorderLevel"
                min="0"
                value={
                  form.reorderLevel
                }
                onChange={
                  handleChange
                }
                placeholder="20"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={
                  resetForm
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                {editingProduct
                  ? "Update Product"
                  : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FILTERS */}

      <div className="filters">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products, SKU or category..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(
              event.target.value
            )
          }
        >
          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>
      </div>

      {/* PRODUCT TABLE */}

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>
              Product List
            </h3>

            <p>
              {filteredProducts.length}{" "}
              products found
            </p>
          </div>
        </div>

        {filteredProducts.length ===
        0 ? (
          <div className="empty-state">
            <Package size={48} />

            <h3>
              No products found
            </h3>

            <p>
              Try changing your
              search or add a new
              product.
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
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(
                  (product) => {
                    const isOut =
                      product.stock ===
                      0;

                    const isLow =
                      product.stock <=
                      product.reorderLevel;

                    return (
                      <tr
                        key={
                          product.id
                        }
                      >
                        <td>
                          <strong>
                            {
                              product.name
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            product.sku
                          }
                        </td>

                        <td>
                          {
                            product.category
                          }
                        </td>

                        <td>
                          {
                            product.unit
                          }
                        </td>

                        <td>
                          {
                            product.stock
                          }
                        </td>

                        <td>
                          {
                            product.reorderLevel
                          }
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              isOut
                                ? "canceled"
                                : isLow
                                ? "waiting"
                                : "done"
                            }`}
                          >
                            {isOut
                              ? "Out of Stock"
                              : isLow
                              ? "Low Stock"
                              : "In Stock"}
                          </span>
                        </td>

                        <td>
                          <div className="table-actions">
                            <button
                              className="small-button"
                              onClick={() =>
                                handleEdit(
                                  product
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-button"
                              onClick={() =>
                                handleDelete(
                                  product.id
                                )
                              }
                            >
                              <Trash2
                                size={16}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/* =========================================================
   OPERATIONS PAGE
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

  const title = isReceipt
    ? "Receipts"
    : "Delivery Orders";

  const description = isReceipt
    ? "Receive products from suppliers and increase stock."
    : "Deliver products to customers and reduce stock.";

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    party: "",
    reference: "",
  });

  const filteredOperations =
    operations.filter(
      (operation) =>
        operation.type === type
    );

  const selectedProduct =
    products.find(
      (product) =>
        product.id ===
        Number(form.productId)
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

  function resetForm() {
    setForm({
      productId: "",
      quantity: "",
      party: "",
      reference: "",
    });

    setShowForm(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedProduct) {
      alert(
        "Please select a product."
      );
      return;
    }

    const quantity =
      Number(form.quantity);

    if (!quantity || quantity <= 0) {
      alert(
        "Please enter a valid quantity."
      );
      return;
    }

    if (!form.party) {
      alert(
        isReceipt
          ? "Please enter supplier name."
          : "Please enter customer name."
      );
      return;
    }

    if (
      !isReceipt &&
      quantity >
        selectedProduct.stock
    ) {
      alert(
        `Insufficient stock. Available stock: ${selectedProduct.stock} ${selectedProduct.unit}`
      );
      return;
    }

    const updatedStock =
      isReceipt
        ? selectedProduct.stock +
          quantity
        : selectedProduct.stock -
          quantity;

    setProducts(
      products.map((product) =>
        product.id ===
        selectedProduct.id
          ? {
              ...product,
              stock: updatedStock,
            }
          : product
      )
    );

    const operation = {
      id: Date.now(),
      type,
      productId:
        selectedProduct.id,
      productName:
        selectedProduct.name,
      sku:
        selectedProduct.sku,
      quantity,
      unit:
        selectedProduct.unit,
      party: form.party,
      reference:
        form.reference ||
        "N/A",
      date:
        new Date().toLocaleString(),
      status: "Validated",
    };

    setOperations([
      operation,
      ...operations,
    ]);

    alert(
      isReceipt
        ? `${quantity} ${selectedProduct.unit} of ${selectedProduct.name} received successfully.`
        : `${quantity} ${selectedProduct.unit} of ${selectedProduct.name} delivered successfully.`
    );

    resetForm();
  }

  return (
    <>
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h2>
            {title}
          </h2>

          <p>
            {description}
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowForm(true)
          }
        >
          <Plus size={18} />

          {isReceipt
            ? "New Receipt"
            : "New Delivery"}
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div className="form-panel">
          <div className="panel-header">
            <h3>
              {isReceipt
                ? "Create Receipt"
                : "Create Delivery Order"}
            </h3>

            <button
              className="icon-button"
              onClick={
                resetForm
              }
            >
              <X size={20} />
            </button>
          </div>

          <form
            className="form-grid"
            onSubmit={
              handleSubmit
            }
          >
            <div className="form-group">
              <label>
                Product *
              </label>

              <select
                name="productId"
                value={
                  form.productId
                }
                onChange={
                  handleChange
                }
              >
                <option value="">
                  Select product
                </option>

                {products.map(
                  (product) => (
                    <option
                      key={
                        product.id
                      }
                      value={
                        product.id
                      }
                    >
                      {product.name} (
                      {product.sku})
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-group">
              <label>
                Quantity *
              </label>

              <input
                type="number"
                name="quantity"
                min="1"
                value={
                  form.quantity
                }
                onChange={
                  handleChange
                }
                placeholder="Enter quantity"
              />

              {selectedProduct && (
                <small>
                  Available stock:{" "}
                  {
                    selectedProduct.stock
                  }{" "}
                  {
                    selectedProduct.unit
                  }
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                {isReceipt
                  ? "Supplier *"
                  : "Customer *"}
              </label>

              <input
                type="text"
                name="party"
                value={
                  form.party
                }
                onChange={
                  handleChange
                }
                placeholder={
                  isReceipt
                    ? "Supplier name"
                    : "Customer name"
                }
              />
            </div>

            <div className="form-group">
              <label>
                Reference
              </label>

              <input
                type="text"
                name="reference"
                value={
                  form.reference
                }
                onChange={
                  handleChange
                }
                placeholder="PO-001 / SO-001"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={
                  resetForm
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Validate{" "}
                {isReceipt
                  ? "Receipt"
                  : "Delivery"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* OPERATION HISTORY */}

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>
              {isReceipt
                ? "Receipt History"
                : "Delivery History"}
            </h3>

            <p>
              {filteredOperations.length}{" "}
              records
            </p>
          </div>
        </div>

        {filteredOperations.length ===
        0 ? (
          <div className="empty-state">
            {isReceipt ? (
              <ArrowDownToLine
                size={48}
              />
            ) : (
              <ArrowUpFromLine
                size={48}
              />
            )}

            <h3>
              No records yet
            </h3>

            <p>
              Create your first{" "}
              {isReceipt
                ? "receipt"
                : "delivery order"}.
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
                    SKU
                  </th>

                  <th>
                    Quantity
                  </th>

                  <th>
                    {isReceipt
                      ? "Supplier"
                      : "Customer"}
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
                {filteredOperations.map(
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
                      </td>

                      <td>
                        {
                          operation.sku
                        }
                      </td>

                      <td>
                        {operation.quantity}{" "}
                        {
                          operation.unit
                        }
                      </td>

                      <td>
                        {
                          operation.party
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
/* =========================================================
   END OF OPERATIONS PAGE
========================================================= */


/* =========================================================
   HELPER COMPONENTS
========================================================= */

function EmptyState({
  icon: Icon = Package,
  title,
  message,
}) {
  return (
    <div className="empty-state">
      <Icon size={48} />

      <h3>
        {title}
      </h3>

      <p>
        {message}
      </p>
    </div>
  );
}


/* =========================================================
   SEARCH + FILTER COMPONENT
========================================================= */

function SearchFilter({
  search,
  setSearch,
  placeholder = "Search...",
  children,
}) {
  return (
    <div className="filters">
      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder={placeholder}
        />
      </div>

      {children}
    </div>
  );
}


/* =========================================================
   EXPORT
========================================================= */

export default App;



