import { useState } from "react";
import API from "../api";

const AddPaymentForm = ({ onAdded }) => {
  const [form, setForm] = useState({
    userName: "",
    amount: "",
    paidBy: "",
    note: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      await API.post("/payments", { ...form, amount: Number(form.amount) });
      setMessage("Payment added successfully");
      setForm({ userName: "", amount: "", paidBy: "", note: "" });
      onAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add payment");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderRadius: 12,
    border: "1px solid #e8d8d8",
    background: "#faf7f7",
    padding: "11px 14px",
    fontSize: 14,
    color: "#1c0a0a",
    fontFamily: "'Helvetica Neue', sans-serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border 0.15s, background 0.15s",
  };

  const fields = [
    {
      name: "userName",
      placeholder: "User name",
      type: "text",
      required: true,
    },
    { name: "amount", placeholder: "Amount", type: "number", required: true },
    { name: "paidBy", placeholder: "Paid by", type: "text", required: true },
    { name: "note", placeholder: "Note", type: "text", required: false },
  ];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e8d8d8",
        borderRadius: 22,
        padding: "24px 22px",
        fontFamily: "'Helvetica Neue', sans-serif",
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
        New Entry
      </p>
      <h2
        style={{
          margin: "5px 0 18px",
          fontSize: 17,
          fontWeight: 700,
          color: "#1c0a0a",
          fontFamily: "'Georgia', serif",
          letterSpacing: "-0.3px",
        }}
      >
        Add Payment
      </h2>

      {/* Form row */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 10,
          alignItems: "end",
        }}
      >
        {fields.map(({ name, placeholder, type, required }) => (
          <input
            key={name}
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.border = "1px solid #a52a2a";
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid #e8d8d8";
              e.target.style.background = "#faf7f7";
            }}
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{
            borderRadius: 12,
            background: loading
              ? "#d4b8b8"
              : "linear-gradient(135deg, #a52a2a 0%, #7b1c1c 100%)",
            border: "none",
            padding: "11px 14px",
            color: loading ? "#fff8f8" : "#fff",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'Helvetica Neue', sans-serif",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.15s, transform 0.1s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseDown={(e) => {
            if (!loading) e.currentTarget.style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {loading ? "Adding…" : "+ Add Record"}
        </button>
      </form>

      {/* Success */}
      {message && (
        <div
          style={{
            marginTop: 14,
            background: "#f0faf4",
            border: "1px solid #a8d5b5",
            borderRadius: 11,
            padding: "10px 14px",
            fontSize: 13,
            color: "#1e6b3c",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          ✓ {message}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: 14,
            background: "#f9efef",
            border: "1px solid #e8c0c0",
            borderRadius: 11,
            padding: "10px 14px",
            fontSize: 13,
            color: "#7b1c1c",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          ✕ {error}
        </div>
      )}
    </div>
  );
};

export default AddPaymentForm;
