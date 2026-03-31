import { useEffect, useState } from "react";
import API from "../api";
import Leaderboard from "../components/Leaderboard";
import PaymentTable from "../components/PaymentTable";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState({
    totalAmount: 0,
    totalRecords: 0,
    leaderboard: [],
    payments: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments");
      setData(res.data);
    } catch (error) {
      console.error("Failed to load payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#faf7f7", fontFamily: "'Georgia', serif" }}
    >
      {/* ── Header ── */}
      <header
        style={{
          background: "linear-gradient(135deg, #7b1c1c 0%, #3d0000 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo + title */}
          <div className="flex items-center gap-4">
            {/* <div
              className="flex items-center justify-center text-white font-bold text-xl"
              style={{
                width: 48,
                height: 48,
                borderRadius: 13,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                fontFamily: "'Georgia', serif",
                flexShrink: 0,
              }}
            >
              ₨
            </div> */}
            <div>
              <h1
                className="text-2xl font-bold text-white"
                style={{
                  letterSpacing: "-0.3px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Money Tracker
              </h1>
              <p
                className="text-xs italic mt-0.5"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Financial overview
              </p>
            </div>
          </div>

          {/* Live badge + optional admin link */}
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffc0c0",
                padding: "5px 14px",
                borderRadius: 20,
                letterSpacing: 2,
              }}
            >
              Live
            </span>

            <Link
              to="/login"
              className="font-semibold text-sm text-center"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 12,
              }}
            >
              Admin Login
            </Link>
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
        {loading ? (
          <div
            className="text-center py-16 text-sm"
            style={{
              background: "#fff",
              border: "1px solid #e8d8d8",
              borderRadius: 22,
              color: "#9b6060",
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
          >
            Loading records…
          </div>
        ) : (
          <>
            {/* ── Stat cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Total Collected",
                  value: `Rs. ${Number(data.totalAmount).toLocaleString("en-LK")}`,
                  accent: "#7b1c1c",
                },
                {
                  label: "Total Records",
                  value: data.totalRecords,
                  accent: "#b22222",
                },
                {
                  label: "Total Users",
                  value: data.leaderboard.length,
                  accent: "#c0392b",
                },
              ].map(({ label, value, accent }) => (
                <div
                  key={label}
                  style={{
                    background: "#fff",
                    border: "1px solid #e8d8d8",
                    borderRadius: 20,
                    padding: "20px 22px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* top accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: accent,
                      borderRadius: "20px 20px 0 0",
                    }}
                  />
                  <p
                    className="uppercase text-xs font-semibold tracking-widest"
                    style={{
                      color: "#9b6060",
                      fontFamily: "'Helvetica Neue', sans-serif",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    className="mt-2 font-bold"
                    style={{
                      fontSize: 26,
                      color: "#7b1c1c",
                      fontFamily: "'Georgia', serif",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Leaderboard + Table ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-1">
                <Leaderboard leaderboard={data.leaderboard} isAdmin={false} />
              </div>
              <div className="xl:col-span-2">
                <PaymentTable payments={data.payments} isAdmin={false} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
