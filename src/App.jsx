import { useState } from "react";
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
} from "lucide-react";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Products", icon: Package },
    { name: "Receipts", icon: ArrowDownToLine },
    { name: "Deliveries", icon: ArrowUpFromLine },
    { name: "Transfers", icon: ArrowLeftRight },
    { name: "Adjustments", icon: ClipboardEdit },
    { name: "Stock Ledger", icon: History },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="logo">
          <div className="logo-box">S</div>
          {sidebarOpen && <span>StockSense</span>}
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        <button className="logout">
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div>
            <h1>{activePage}</h1>
            <p>Inventory Management System</p>
          </div>

          <div className="profile">
            <div className="avatar">SK</div>
            <div>
              <strong>Sanvitha K</strong>
              <small>Inventory Manager</small>
            </div>
          </div>
        </header>

        <section className="content">
          {activePage === "Dashboard" ? (
            <Dashboard />
          ) : (
            <div className="placeholder">
              <Package size={48} />
              <h2>{activePage}</h2>
              <p>This module will be implemented next.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Dashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "1,248",
      change: "+12 this week",
    },
    {
      title: "Low Stock",
      value: "18",
      change: "Needs attention",
    },
    {
      title: "Pending Receipts",
      value: "12",
      change: "Incoming",
    },
    {
      title: "Pending Deliveries",
      value: "8",
      change: "Outgoing",
    },
  ];

  return (
    <>
      <div className="welcome">
        <div>
          <h2>Good morning, Sanvitha 👋</h2>
          <p>Here's what's happening with your inventory today.</p>
        </div>

        <button className="primary-button">
          + New Operation
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <p>{stat.title}</p>
            <h3>{stat.value}</h3>
            <span>{stat.change}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Recent Stock Movements</h3>
            <button>View all</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Operation</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Steel Rods</td>
                <td>Receipt</td>
                <td className="positive">+100</td>
                <td><span className="badge done">Done</span></td>
              </tr>

              <tr>
                <td>Office Chairs</td>
                <td>Delivery</td>
                <td className="negative">-20</td>
                <td><span className="badge done">Done</span></td>
              </tr>

              <tr>
                <td>Steel Sheets</td>
                <td>Transfer</td>
                <td>50</td>
                <td><span className="badge waiting">Waiting</span></td>
              </tr>

              <tr>
                <td>Bolts</td>
                <td>Adjustment</td>
                <td className="negative">-5</td>
                <td><span className="badge done">Done</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Low Stock Alerts</h3>
          </div>

          <div className="alert-item">
            <div>
              <strong>Steel Rods</strong>
              <p>Only 8 kg remaining</p>
            </div>
            <span className="danger">Critical</span>
          </div>

          <div className="alert-item">
            <div>
              <strong>Bolts</strong>
              <p>Only 15 units remaining</p>
            </div>
            <span className="warning">Low</span>
          </div>

          <div className="alert-item">
            <div>
              <strong>Office Chairs</strong>
              <p>Only 10 units remaining</p>
            </div>
            <span className="warning">Low</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;