const MEDALS = ["🥇", "🥈", "🥉"];
const fmt = (n) => Number(n).toLocaleString("en-LK");

const RANK_COLORS = ["#7b1c1c", "#a52a2a", "#c0392b"];

function Leaderboard({ leaderboard, isAdmin }) {
  const max = leaderboard[0]?.total || 1;

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
        Rankings
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
        Top Users
      </h2>

      {/* List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 9,
          marginTop: 18,
        }}
      >
        {leaderboard.map((item, i) => {
          const pct = Math.round((item.total / max) * 100);
          const isTop = i === 0;
          const accentColor = RANK_COLORS[i] ?? "#d4b8b8";

          return (
            <div
              key={item.userName}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "11px 13px",
                borderRadius: 13,
                background: isTop ? "#f9efef" : "#f3e8e8",
                border: `1px solid ${isTop ? "#e8c0c0" : "#e8d8d8"}`,
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateX(3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateX(0)")
              }
            >
              {/* Left: badge + name + bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                {/* Rank badge */}
                {/* <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: i < 3 ? accentColor : "#d4b8b8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: i < 3 ? 16 : 12,
                    fontWeight: 700,
                    color: i < 3 ? "#fff" : "#5a2020",
                    flexShrink: 0,
                  }}
                >
                  {i < 3 ? MEDALS[i] : i + 1}
                </div> */}

                {/* Name + progress bar */}
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1c0a0a",
                    }}
                  >
                    {item.userName}
                  </p>
                  <div
                    style={{
                      width: 100,
                      height: 3,
                      background: "#e8d8d8",
                      borderRadius: 3,
                      overflow: "hidden",
                      marginTop: 5,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        borderRadius: 3,
                        background: accentColor,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: amount chip */}
              <div
                style={{
                  background: "#f9efef",
                  border: "1px solid #e0c0c0",
                  borderRadius: 9,
                  padding: "3px 10px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#7b1c1c",
                    filter: isAdmin ? "none" : "blur(5px)",
                    userSelect: isAdmin ? "auto" : "none",
                    display: "inline-block",
                  }}
                >
                  Rs. {fmt(item.total)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Leaderboard;
