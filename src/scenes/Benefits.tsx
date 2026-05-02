import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { DARK, GREEN, WHITE } from "../constants";

const BenefitCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ icon, title, desc, delay, frame, fps }) => {
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        background: "linear-gradient(135deg, #1a1a0e, #141410)",
        border: `1px solid ${GREEN}33`,
        borderRadius: 24,
        padding: "44px 36px",
        textAlign: "center",
        marginBottom: 24,
        boxShadow: `0 8px 40px rgba(0,0,0,0.4)`,
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 16 }}>{icon}</div>
      <div
        style={{
          fontFamily: "'Arial Black', Impact, sans-serif",
          fontSize: 36,
          fontWeight: 900,
          color: WHITE,
          marginBottom: 10,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 24,
          color: `${WHITE}70`,
          lineHeight: 1.4,
        }}
      >
        {desc}
      </div>
    </div>
  );
};

export const Benefits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

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
        padding: "60px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i % 3) * 33}%`,
            top: `${Math.floor(i / 3) * 50}%`,
            width: "33%",
            height: "50%",
            border: `1px solid ${WHITE}05`,
          }}
        />
      ))}

      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            letterSpacing: 8,
            color: GREEN,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          WHY ANTHOLIFTZ
        </div>
        <div
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: 72,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1,
            letterSpacing: -2,
          }}
        >
          THE RESULTS SPEAK
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <BenefitCard
          frame={frame}
          fps={fps}
          delay={15}
          icon="🏋️"
          title="Custom Programs"
          desc="Tailored training built around YOUR body & schedule"
        />
        <BenefitCard
          frame={frame}
          fps={fps}
          delay={30}
          icon="🥗"
          title="Nutrition Plans"
          desc="Science-backed macros that actually work"
        />
        <BenefitCard
          frame={frame}
          fps={fps}
          delay={45}
          icon="📱"
          title="24/7 Support"
          desc="Direct access to your coach, always"
        />
      </div>
    </div>
  );
};
