import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { DARK, GOLD, WHITE } from "../constants";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const btnScale = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 200 } });
  const btnOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });

  const urlOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });
  const urlY = interpolate(frame, [35, 50], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Pulsing glow on button
  const pulse = interpolate(
    (frame - 30) % 60,
    [0, 30, 60],
    [1, 1.05, 1],
    { extrapolateRight: "clamp" }
  );

  const arrowOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });
  const arrowY = interpolate(
    (frame - 50) % 40,
    [0, 20, 40],
    [0, 12, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at center, #1a1a0a 0%, ${DARK} 70%)`,
        opacity: bgOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated ring */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `2px solid ${GOLD}18`,
          animation: "none",
          transform: `scale(${pulse})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          border: `2px solid ${GOLD}28`,
          transform: `scale(${pulse * 0.97})`,
        }}
      />

      {/* Content */}
      <div
        style={{
          textAlign: "center",
          padding: "0 60px",
          position: "relative",
        }}
      >
        {/* Tag */}
        <div
          style={{
            opacity: titleOpacity,
            display: "inline-block",
            background: `${GOLD}22`,
            border: `1px solid ${GOLD}55`,
            borderRadius: 100,
            padding: "10px 28px",
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            color: GOLD,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          LIMITED SPOTS AVAILABLE
        </div>

        {/* Main CTA text */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: 92,
              fontWeight: 900,
              color: WHITE,
              lineHeight: 0.95,
              letterSpacing: -3,
              textTransform: "uppercase",
            }}
          >
            START YOUR
          </div>
          <div
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: 112,
              fontWeight: 900,
              color: GOLD,
              lineHeight: 0.95,
              letterSpacing: -3,
              textTransform: "uppercase",
            }}
          >
            JOURNEY
          </div>
          <div
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: 92,
              fontWeight: 900,
              color: WHITE,
              lineHeight: 0.95,
              letterSpacing: -3,
              textTransform: "uppercase",
            }}
          >
            TODAY
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 48,
            opacity: btnOpacity,
            transform: `scale(${btnScale * pulse})`,
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, #c9a227 100%)`,
              color: DARK,
              borderRadius: 20,
              padding: "28px 60px",
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
              boxShadow: `0 0 60px ${GOLD}55, 0 20px 40px rgba(0,0,0,0.4)`,
              display: "inline-block",
            }}
          >
            APPLY NOW
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 36,
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 32,
              color: `${WHITE}80`,
              letterSpacing: 2,
            }}
          >
            antholiftz.com
          </div>
        </div>

        {/* Arrow pointing to link in bio */}
        <div
          style={{
            marginTop: 24,
            opacity: arrowOpacity,
            transform: `translateY(${arrowY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              color: GOLD,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            ↓ LINK IN BIO ↓
          </div>
        </div>
      </div>
    </div>
  );
};
