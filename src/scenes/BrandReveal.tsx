import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { DARK, GREEN, WHITE, GRAY } from "../constants";

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const logoOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const taglineY = interpolate(frame, [15, 35], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const taglineOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });

  const statsOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const statsY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineWidth = interpolate(frame, [5, 40], [0, 800], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(160deg, #0f0f0f 0%, ${DARK} 60%, #111108 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: 4,
          width: lineWidth,
          background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
        }}
      />

      {/* Logo mark */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${GREEN} 0%, #c9a227 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 60px ${GREEN}44`,
          }}
        >
          <span
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: 64,
              fontWeight: 900,
              color: DARK,
              lineHeight: 1,
            }}
          >
            A
          </span>
        </div>
      </div>

      {/* Brand name */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: 80,
            fontWeight: 900,
            color: WHITE,
            letterSpacing: -2,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          antho
          <span style={{ color: GREEN }}>liftz</span>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 20,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 28,
            fontWeight: 300,
            color: GRAY,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          ONLINE FITNESS COACHING
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          opacity: statsOpacity,
          transform: `translateY(${statsY}px)`,
          display: "flex",
          justifyContent: "space-around",
          padding: "0 60px",
        }}
      >
        {[
          { num: "500+", label: "Clients" },
          { num: "5★", label: "Rating" },
          { num: "100%", label: "Online" },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontSize: 56,
                fontWeight: 900,
                color: GREEN,
                lineHeight: 1,
              }}
            >
              {num}
            </div>
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 22,
                color: `${WHITE}80`,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginTop: 6,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: 4,
          width: lineWidth,
          background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
        }}
      />
    </div>
  );
};
