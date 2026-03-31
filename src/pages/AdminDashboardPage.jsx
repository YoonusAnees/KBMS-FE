import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import AddPaymentForm from "../components/AddPaymentForm";
import SummaryCards from "../components/SummaryCards";
import Leaderboard from "../components/Leaderboard";
import PaymentTable from "../components/PaymentTable";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    totalAmount: 0,
    totalRecords: 0,
    totalUsers: 0,
    leaderboard: [],
    payments: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments");
      setData(res.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf7f7",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* ── Header ── */}
      <header
        style={{
          background: "linear-gradient(135deg, #7b1c1c 0%, #3d0000 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: logo + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 13,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Georgia', serif",
                flexShrink: 0,
              }}
            >
              ₨
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "-0.3px",
                }}
              >
                Admin Dashboard
              </h1>
              <p
                style={{
                  margin: "3px 0 0",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontStyle: "italic",
                }}
              >
                Welcome back,{" "}
                <span
                  style={{
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                    fontStyle: "normal",
                  }}
                >
                  {admin?.name}
                </span>
              </p>
            </div>
          </div>

          {/* Right: actions */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "9px 18px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
              }
            >
              Public View
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "9px 18px",
                borderRadius: 12,
                background: "rgba(192,57,43,0.5)",
                border: "1px solid rgba(255,150,130,0.35)",
                color: "#ffd0cc",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(192,57,43,0.75)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(192,57,43,0.5)")
              }
            >
              Logout
            </button>
          </div>
        </div>

        {/* accent rule */}
        <div
          style={{
            height: 3,
            background: "linear-gradient(90deg, #c0392b 0%, transparent 60%)",
          }}
        />
      </header>

      {/* ── Body ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Add Payment Form */}
        <AddPaymentForm onAdded={fetchPayments} />

        {/* Loading */}
        {loading ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid #e8d8d8",
              borderRadius: 22,
              padding: "56px 0",
              textAlign: "center",
              color: "#9b6060",
              fontSize: 14,
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
          >
            Loading data…
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <SummaryCards
              totalAmount={data.totalAmount}
              totalRecords={data.totalRecords}
              totalUsers={data.leaderboard.length}
            />

            {/* Leaderboard + Table */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-1">
                <Leaderboard leaderboard={data.leaderboard} isAdmin={true} />
              </div>
              <div className="xl:col-span-2">
                <PaymentTable payments={data.payments} isAdmin={true} />
              </div>
            </div>
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: 10,
          padding: "8px 0 32px",
          fontSize: 11,
          color: "#9b6060",
          fontFamily: "'Helvetica Neue', sans-serif",
        }}
      >
        <span>Money Tracker © {new Date().getFullYear()}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.5 }}>Admin Panel</span>
      </footer>
    </div>
  );
};

export default AdminDashboardPage;
