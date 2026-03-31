import { useState } from "react";

const fmt = (n) => Number(n).toLocaleString("en-LK");

const PaymentTable = ({ payments, isAdmin = false }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e8d8d8",
        borderRadius: 22,
        padding: "24px 22px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <p
        style={{
          margin: 0,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#c0392b",
        }}
      >
        Transactions
      </p>
      <h2
        style={{
          margin: "5px 0 0",
          fontSize: 17,
          fontWeight: 700,
          color: "#1c0a0a",
          fontFamily: "'Georgia', serif",
          letterSpacing: "-0.3px",
        }}
      >
        {isAdmin ? "Payment Records" : "Public Payment Details"}
      </h2>

      {/* Empty state */}
      {payments.length === 0 ? (
        <div
          style={{
            marginTop: 24,
            padding: "32px 0",
            textAlign: "center",
            color: "#9b6060",
            fontSize: 14,
            borderRadius: 13,
            background: "#f9efef",
            border: "1px solid #e8d8d8",
          }}
        >
          No payments found.
        </div>
      ) : (
        <div style={{ overflowX: "auto", marginTop: 18 }}>
          <table
            style={{ width: "100%", minWidth: 620, borderCollapse: "collapse" }}
          >
            {/* Head */}
            <thead>
              <tr>
                {[
                  "Amount",
                  "Who Paid",
                  "Note",
                  "Date",
                  ...(isAdmin ? ["Added By"] : []),
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 12px",
                      textAlign: "left",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      color: "#9b6060",
                      borderBottom: "2px solid #e8d8d8",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  onMouseEnter={() => setHovered(payment._id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background:
                      hovered === payment._id ? "#f9efef" : "transparent",
                    transition: "background 0.13s",
                    cursor: "default",
                  }}
                >
                  {/* Amount */}
                  <td
                    style={{
                      padding: "12px 12px",
                      borderBottom: "1px solid #f3e8e8",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        background: "#f9efef",
                        border: "1px solid #e8c8c8",
                        borderRadius: 8,
                        padding: "3px 10px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#7b1c1c",
                        filter: isAdmin ? "none" : "blur(5px)",
                        userSelect: isAdmin ? "auto" : "none",
                      }}
                    >
                      Rs. {fmt(payment.amount)}
                    </span>
                  </td>

                  {/* Who Paid */}
                  <td
                    style={{
                      padding: "12px 12px",
                      borderBottom: "1px solid #f3e8e8",
                    }}
                  >
                    {isAdmin ? (
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1c0a0a",
                        }}
                      >
                        {payment.paidBy}
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          background: "#f3e8e8",
                          border: "1px solid #e8d8d8",
                          borderRadius: 8,
                          padding: "3px 10px",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#1c0a0a",
                        }}
                      >
                        {payment.paidBy}
                      </span>
                    )}
                  </td>

                  {/* Note */}
                  <td
                    style={{
                      padding: "12px 12px",
                      borderBottom: "1px solid #f3e8e8",
                      fontSize: 13,
                      color: "#7a4040",
                    }}
                  >
                    {isAdmin ? payment.note || "—" : "—"}
                  </td>

                  {/* Date */}
                  <td
                    style={{
                      padding: "12px 12px",
                      borderBottom: "1px solid #f3e8e8",
                      fontSize: 12,
                      color: "#9b6060",
                    }}
                  >
                    {new Date(payment.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Added By (admin only) */}
                  {isAdmin && (
                    <td
                      style={{
                        padding: "12px 12px",
                        borderBottom: "1px solid #f3e8e8",
                        fontSize: 13,
                        color: "#9b6060",
                      }}
                    >
                      {payment.createdBy?.name || "—"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
