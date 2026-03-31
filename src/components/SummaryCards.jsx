const fmt = (n) => Number(n).toLocaleString("en-LK");

const SummaryCards = ({ totalAmount, totalRecords, totalUsers }) => {
  const cards = [
    {
      title: "Total Collected",
      value: `Rs. ${fmt(totalAmount)}`,
      accent: "#7b1c1c",
      icon: "₨",
    },
    {
      title: "Total Records",
      value: totalRecords,
      accent: "#a52a2a",
      icon: "📋",
    },
    {
      title: "Total Users",
      value: totalUsers,
      accent: "#c0392b",
      icon: "👥",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 14,
      }}
    >
      {cards.map(({ title, value, accent, icon }) => (
        <div
          key={title}
          style={{
            background: "#fff",
            border: "1px solid #e8d8d8",
            borderRadius: 20,
            padding: "20px 22px",
            position: "relative",
            overflow: "hidden",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          {/* Top accent bar */}
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

          {/* Icon watermark */}
          <div
            style={{
              position: "absolute",
              bottom: -8,
              right: 12,
              fontSize: 52,
              opacity: 0.06,
              pointerEvents: "none",
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            {icon}
          </div>

          {/* Label */}
          <p
            style={{
              margin: 0,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#9b6060",
            }}
          >
            {title}
          </p>

          {/* Value */}
          <p
            style={{
              margin: "10px 0 0",
              fontSize: 26,
              fontWeight: 700,
              color: accent,
              fontFamily: "'Georgia', serif",
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
            }}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
