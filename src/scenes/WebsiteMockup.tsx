import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { DARK, GOLD, WHITE, DARK_CARD } from "../constants";

const MockSection: React.FC<{
  delay: number;
  title: string;
  subtitle: string;
  accent?: boolean;
  frame: number;
  fps: number;
}> = ({ delay, title, subtitle, accent, frame, fps }) => {
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [delay, delay + 20], [-40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        background: accent ? `linear-gradient(135deg, ${GOLD}18, ${GOLD}08)` : DARK_CARD,
        borderRadius: 16,
        padding: "24px 28px",
        borderLeft: accent ? `4px solid ${GOLD}` : `4px solid #ffffff18`,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontFamily: "'Arial Black', Impact, sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: accent ? GOLD : WHITE,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 20,
          color: `${WHITE}70`,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export const WebsiteMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const phoneY = interpolate(frame, [0, 20], [80, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scrollY = interpolate(frame, [30, 110], [0, -320], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(180deg, #0a0a0a 0%, #0d0d08 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <div
        style={{
          opacity: labelOpacity,
          position: "absolute",
          top: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 26,
            letterSpacing: 6,
            color: `${WHITE}60`,
            textTransform: "uppercase",
          }}
        >
          antholiftz.com
        </div>
      </div>

      {/* Phone frame */}
      <div
        style={{
          transform: `scale(${phoneScale}) translateY(${phoneY}px)`,
          width: 520,
          height: 1020,
          borderRadius: 48,
          background: "#1a1a1a",
          border: "8px solid #333",
          overflow: "hidden",
          boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 60px ${GOLD}22`,
          position: "relative",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            background: "#222",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid #333",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{ width: 12, height: 12, borderRadius: "50%", background: c }}
            />
          ))}
          <div
            style={{
              flex: 1,
              background: "#333",
              borderRadius: 8,
              padding: "6px 14px",
              fontFamily: "Arial, sans-serif",
              fontSize: 14,
              color: `${WHITE}80`,
            }}
          >
            antholiftz.com
          </div>
        </div>

        {/* Scrollable website content */}
        <div
          style={{
            transform: `translateY(${scrollY}px)`,
            padding: "24px 20px",
          }}
        >
          {/* Hero section */}
          <div
            style={{
              background: `linear-gradient(135deg, #111108, #1a1a08)`,
              borderRadius: 20,
              padding: "36px 24px",
              marginBottom: 16,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `${GOLD}15`,
              }}
            />
            <div
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontSize: 36,
                fontWeight: 900,
                color: WHITE,
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              YOUR BEST BODY STARTS HERE
            </div>
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                color: `${WHITE}70`,
                marginBottom: 20,
              }}
            >
              Personalized plans. Real results. Online.
            </div>
            <div
              style={{
                background: GOLD,
                color: DARK,
                borderRadius: 12,
                padding: "12px 28px",
                fontFamily: "'Arial Black', sans-serif",
                fontSize: 16,
                fontWeight: 900,
                display: "inline-block",
              }}
            >
              START NOW
            </div>
          </div>

          <MockSection
            frame={frame}
            fps={fps}
            delay={20}
            title="Custom Training Plans"
            subtitle="Built for your body & goals"
            accent
          />
          <MockSection
            frame={frame}
            fps={fps}
            delay={30}
            title="Nutrition Coaching"
            subtitle="Eat smarter, perform better"
          />
          <MockSection
            frame={frame}
            fps={fps}
            delay={40}
            title="1-on-1 Check-ins"
            subtitle="Weekly progress tracking"
            accent
          />
          <MockSection
            frame={frame}
            fps={fps}
            delay={50}
            title="Flexible & Online"
            subtitle="Train anywhere, anytime"
          />

          {/* Testimonial */}
          <div
            style={{
              background: DARK_CARD,
              borderRadius: 16,
              padding: "24px",
              marginTop: 8,
              borderTop: `2px solid ${GOLD}`,
            }}
          >
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 18,
                color: `${WHITE}90`,
                fontStyle: "italic",
                marginBottom: 12,
              }}
            >
              "Lost 30lbs in 4 months. Best investment I ever made."
            </div>
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                color: GOLD,
              }}
            >
              — Client Success Story ★★★★★
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
