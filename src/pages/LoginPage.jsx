import { useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const payload = isRegister
        ? { ...form, role: "admin" }
        : { email: form.email, password: form.password };
      const { data } = await API.post(endpoint, payload);
      login(data);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    borderRadius: 12,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,200,180,0.2)",
    padding: "11px 16px",
    color: "#fff",
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.15s",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "rgba(255,200,180,0.7)",
    marginBottom: 7,
    fontFamily: "'Helvetica Neue', sans-serif",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #3d0000 0%, #7b1c1c 50%, #2a0a0a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(192,57,43,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(123,28,28,0.2) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,200,180,0.15)",
          borderRadius: 24,
          padding: "36px 32px 32px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 32,
            right: 32,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #c0392b, transparent)",
            borderRadius: "0 0 4px 4px",
          }}
        />

        {/* Logo + heading */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 15,
              background: "rgba(192,57,43,0.25)",
              border: "1px solid rgba(255,200,180,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffccc0",
              margin: "0 auto 18px",
            }}
          >
            ₨
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            Money Tracker
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13,
              color: "rgba(255,200,180,0.6)",
              fontFamily: "'Helvetica Neue', sans-serif",
              fontStyle: "italic",
            }}
          >
            {isRegister
              ? "Create admin account"
              : isAdminLogin
                ? "Admin Login"
                : "Login to continue"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {isRegister && (
            <div>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter admin name"
                style={inputStyle}
                required
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(192,57,43,0.7)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,200,180,0.2)")
                }
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={inputStyle}
              required
              onFocus={(e) =>
                (e.target.style.border = "1px solid rgba(192,57,43,0.7)")
              }
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255,200,180,0.2)")
              }
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={inputStyle}
              required
              onFocus={(e) =>
                (e.target.style.border = "1px solid rgba(192,57,43,0.7)")
              }
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255,200,180,0.2)")
              }
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(192,57,43,0.2)",
                border: "1px solid rgba(255,150,130,0.3)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: "#ffb0a0",
                fontFamily: "'Helvetica Neue', sans-serif",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              borderRadius: 12,
              background: loading
                ? "rgba(123,28,28,0.5)"
                : "linear-gradient(135deg, #a52a2a 0%, #7b1c1c 100%)",
              border: "1px solid rgba(255,200,180,0.2)",
              padding: "12px 0",
              color: loading ? "rgba(255,200,180,0.5)" : "#fff",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Helvetica Neue', sans-serif",
              letterSpacing: 0.5,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.15s, transform 0.1s",
              marginTop: 4,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseDown={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {loading
              ? "Please wait…"
              : isRegister
                ? "Create Admin Account"
                : "Admin Login"}
          </button>
        </form>

        {/* Footer links */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            fontSize: 13,
            color: "rgba(255,200,180,0.6)",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          <div>
            {isRegister
              ? "Already have an admin account?"
              : "Need an admin account?"}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setIsAdminLogin(true);
              }}
              style={{
                marginLeft: 8,
                background: "none",
                border: "none",
                color: "#ffb0a0",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Helvetica Neue', sans-serif",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ffb0a0")}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </div>

          {!isRegister && (
            <button
              type="button"
              onClick={() => setIsAdminLogin(!isAdminLogin)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,200,180,0.45)",
                fontSize: 12,
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                fontFamily: "'Helvetica Neue', sans-serif",
                padding: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,200,180,0.9)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,200,180,0.45)")
              }
            >
              {/* {isAdminLogin ? "Hide Admin Mode" : "Admin Login"} */}
            </button>
          )}

          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(255,200,180,0.1)",
              margin: "4px 0",
            }}
          />

          <Link
            to="/"
            style={{
              color: "rgba(255,200,180,0.5)",
              fontSize: 12,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,200,180,0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,200,180,0.5)")
            }
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
