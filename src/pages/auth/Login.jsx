import { useState } from "react";
import {
  Package,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

function Login({ onLogin, onShowSignup }) {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [resetEmail, setResetEmail] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleLogin(event) {
    event.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter your email and password.");
      return;
    }

    onLogin({
      name: form.email.split("@")[0],
      email: form.email,
    });
  }

  function handleReset(event) {
    event.preventDefault();

    if (!resetEmail) {
      alert("Please enter your email address.");
      return;
    }

    alert(
      `A password reset OTP has been sent to ${resetEmail}.`
    );

    setMode("login");
  }

  /* =====================================================
     FORGOT PASSWORD
  ===================================================== */

  if (mode === "forgot") {
    return (
      <div className="auth-page">

        <div className="auth-visual">
          <div className="auth-brand">
            <div className="auth-logo">
              <Package size={25} />
            </div>

            <span>
              StockSense
            </span>
          </div>

          <div className="visual-content">

            <div className="visual-badge">
              <ShieldCheck size={16} />
              Secure Account Recovery
            </div>

            <h1>
              Get back to
              <br />
              <span>your inventory.</span>
            </h1>

            <p>
              Reset your password securely and
              continue managing your inventory
              without losing your workflow.
            </p>

            <div className="feature-list">

              <div className="feature-item">
                <div className="feature-icon">
                  <KeyRound size={20} />
                </div>

                <div>
                  <strong>
                    Secure verification
                  </strong>

                  <span>
                    Verify your account using OTP.
                  </span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <strong>
                    Protected account
                  </strong>

                  <span>
                    Your inventory access stays secure.
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="auth-footer">
            © 2026 StockSense · Inventory Management System
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-card">

            <div className="mobile-logo">
              <div className="auth-logo">
                <Package size={23} />
              </div>

              <span>
                StockSense
              </span>
            </div>

            <button
              type="button"
              className="back-button"
              onClick={() =>
                setMode("login")
              }
            >
              <ArrowLeft size={17} />
              Back to login
            </button>

            <div className="auth-heading">
              <div className="reset-icon">
                <KeyRound size={24} />
              </div>

              <h2>
                Forgot your password?
              </h2>

              <p>
                Enter the email address associated
                with your StockSense account and
                we'll send you an OTP to reset it.
              </p>
            </div>

            <form onSubmit={handleReset}>

              <div className="auth-field">
                <label htmlFor="reset-email">
                  Email address
                </label>

                <div className="input-wrapper">
                  <Mail size={18} />

                  <input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(event) =>
                      setResetEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit"
              >
                <span>
                  Send OTP
                </span>

                <ArrowRight size={19} />
              </button>

            </form>

            <div className="security-note">
              <ShieldCheck size={15} />

              <span>
                Secure password recovery
              </span>
            </div>

          </div>
        </div>

      </div>
    );
  }

  /* =====================================================
     NORMAL LOGIN
  ===================================================== */

  return (
    <div className="auth-page">

      <div className="auth-visual">

        <div className="auth-brand">
          <div className="auth-logo">
            <Package size={25} />
          </div>

          <span>
            StockSense
          </span>
        </div>

        <div className="visual-content">

          <div className="visual-badge">
            <ShieldCheck size={16} />
            Smart Inventory Management
          </div>

          <h1>
            Manage your inventory.
            <br />
            <span>Simply & Smarter.</span>
          </h1>

          <p>
            Keep track of products, receipts,
            deliveries, transfers and stock
            levels from one centralized
            inventory platform.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <div className="feature-icon">
                <Package size={20} />
              </div>

              <div>
                <strong>
                  Real-time inventory
                </strong>

                <span>
                  Know exactly what is available.
                </span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <strong>
                  Secure access
                </strong>

                <span>
                  Keep your inventory data protected.
                </span>
              </div>
            </div>

          </div>

        </div>

        <div className="auth-footer">
          © 2026 StockSense · Inventory Management System
        </div>

      </div>

      <div className="auth-form-side">

        <div className="auth-card">

          <div className="mobile-logo">

            <div className="auth-logo">
              <Package size={23} />
            </div>

            <span>
              StockSense
            </span>

          </div>

          <div className="auth-heading">

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to continue to your
              inventory dashboard.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="auth-field">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />

              </div>

            </div>

            <div className="auth-field">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    setMode("forgot")
                  }
                >
                  Forgot password?
                </button>

              </div>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <label className="remember-row">

              <input
                type="checkbox"
                defaultChecked
              />

              <span>
                Keep me signed in
              </span>

            </label>

            <button
              type="submit"
              className="auth-submit"
            >
              <span>
                Sign in
              </span>

              <ArrowRight size={19} />
            </button>

          </form>

          <div className="signup-prompt">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={onShowSignup}
            >
              Create an account
            </button>

          </div>

          <div className="security-note">

            <ShieldCheck size={15} />

            <span>
              Your inventory data is protected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;