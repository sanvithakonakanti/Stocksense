import { useState } from "react";
import {
  Package,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Boxes,
  CheckCircle2,
} from "lucide-react";

function Signup({ onSignup, onShowLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please complete all fields.");
      return;
    }

    if (form.password.length < 6) {
      alert(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    onSignup({
      name: form.name,
      email: form.email,
    });
  }

  return (
    <div className="auth-page">

      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="auth-visual">

        <div className="auth-brand">
          <div className="auth-logo">
            <Package size={25} />
          </div>

          <span>StockSense</span>
        </div>

        <div className="visual-content">

          <div className="visual-badge">
            <Boxes size={16} />
            Built for smarter inventory
          </div>

          <h1>
            Start managing
            <br />
            <span>your inventory.</span>
          </h1>

          <p>
            Create your StockSense account and bring
            products, stock movements and warehouse
            operations together in one place.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <div className="feature-icon">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <strong>
                  Centralized inventory
                </strong>

                <span>
                  Manage products and stock from one place.
                </span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <strong>
                  Track every movement
                </strong>

                <span>
                  Receipts, deliveries, transfers and adjustments.
                </span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <strong>
                  Stay in control
                </strong>

                <span>
                  Identify low-stock items before they become a problem.
                </span>
              </div>
            </div>

          </div>
        </div>

        <div className="auth-footer">
          © 2026 StockSense · Inventory Management System
        </div>

      </div>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="auth-form-side">

        <div className="auth-card">

          {/* MOBILE LOGO */}

          <div className="mobile-logo">

            <div className="auth-logo">
              <Package size={23} />
            </div>

            <span>
              StockSense
            </span>

          </div>


          {/* HEADING */}

          <div className="auth-heading">

            <h2>
              Create your account
            </h2>

            <p>
              Set up your account to start managing
              your inventory.
            </p>

          </div>


          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="auth-field">

              <label htmlFor="name">
                Full name
              </label>

              <div className="input-wrapper">

                <User size={18} />

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="auth-field">

              <label htmlFor="signup-email">
                Email address
              </label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="auth-field">

              <label htmlFor="signup-password">
                Password
              </label>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  id="signup-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              <div className="password-hint">
                Use at least 6 characters
              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="auth-field">

              <label htmlFor="confirm-password">
                Confirm password
              </label>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* TERMS */}

            <label className="terms-row">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the StockSense terms
                and privacy policy.
              </span>

            </label>


            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="auth-submit"
            >

              <span>
                Create account
              </span>

              <ArrowRight size={19} />

            </button>

          </form>


          {/* LOGIN */}

          <div className="signup-prompt">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={onShowLogin}
            >
              Sign in
            </button>

          </div>


          {/* SECURITY */}

          <div className="security-note">

            <ShieldCheck size={15} />

            <span>
              Your account information is protected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;