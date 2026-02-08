import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Super Bowl LX Prop Bets Challenge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0f1a 0%, #013369 50%, #0a0f1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#D50A0A",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#D50A0A",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Super Bowl LX */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            Super Bowl{" "}
            <span style={{ color: "#D50A0A", marginLeft: "20px" }}>LX</span>
          </div>

          {/* Matchup */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "4px solid #69BE28",
                  background: "#111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#69BE28",
                }}
              >
                SEA
              </div>
              <span
                style={{
                  color: "#69BE28",
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  display: "flex",
                }}
              >
                SEAHAWKS
              </span>
            </div>

            <span
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: "#3b4560",
                display: "flex",
              }}
            >
              VS
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "4px solid #C60C30",
                  background: "#111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#C60C30",
                }}
              >
                NE
              </div>
              <span
                style={{
                  color: "#C60C30",
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  display: "flex",
                }}
              >
                PATRIOTS
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#D50A0A",
              marginTop: "24px",
              display: "flex",
            }}
          >
            Prop Bets Challenge
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#3b4560",
              marginTop: "4px",
              display: "flex",
            }}
          >
            Make your picks and compete with friends
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
