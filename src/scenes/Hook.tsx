import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { DARK, GREEN, WHITE } from "../constants";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineScale = spring({ frame, fps, config: { damping: 12, stiffness: 180 } });
  const line2Scale = spring({ frame: frame - 8, fps, config: { damping: 12, stiffness: 180 } });
  const line3Scale = spring({ frame: frame - 16, fps, config: { damping: 12, stiffness: 180 } });

  const accentWidth = interpolate(frame, [20, 45], [0, 260], { extrapolateRight: "clamp" });

  const glowOpacity = interpolate(
    frame,
    [0, 15, 30, 45, 60],
    [0, 0.6, 1, 0.8, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: DARK,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GREEN}22 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Grid lines */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${i * 10}%`,
            height: 1,
            background: `${WHITE}08`,
          }}
        />
      ))}

      <div style={{ position: "relative", textAlign: "center", padding: "0 60px" }}>
        <div
          style={{
            transform: `scale(${lineScale})`,
            transformOrigin: "center",
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            fontSize: 96,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1,
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          REAL PEOPLE.
        </div>

        <div
          style={{
            transform: `scale(${line2Scale})`,
            transformOrigin: "center",
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            fontSize: 96,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1,
            letterSpacing: -2,
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          REAL RESULTS.
        </div>

        {/* Accent bar */}
        <div
          style={{
            height: 6,
            width: accentWidth,
            background: GREEN,
            margin: "24px auto",
            borderRadius: 3,
          }}
        />

        <div
          style={{
            transform: `scale(${line3Scale})`,
            transformOrigin: "center",
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: 80,
            fontWeight: 900,
            color: GREEN,
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          NO SHORTCUTS.
        </div>
      </div>
    </div>
  );
};
