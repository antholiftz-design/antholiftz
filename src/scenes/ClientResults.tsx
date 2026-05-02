import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { DARK, GREEN, WHITE } from "../constants";

// Drop your before/after photos into public/ and update these paths.
// Example: if you add public/esteban-before.jpg and public/esteban-after.jpg,
// set beforeSrc: "esteban-before.jpg", afterSrc: "esteban-after.jpg"
const CLIENTS = [
  {
    name: "Esteban",
    result: "-35 lbs in 12 weeks",
    beforeSrc: "esteban-before.jpg",
    afterSrc: "esteban-after.jpg",
  },
  {
    name: "Lorenzo",
    result: "+40 lbs bulked in 26 weeks",
    beforeSrc: "lorenzo-before.jpg",
    afterSrc: "lorenzo-after.jpg",
  },
  {
    name: "Star",
    result: "+10 lbs lean muscle in 12 weeks",
    beforeSrc: "star-before.jpg",
    afterSrc: "star-after.jpg",
  },
];

const ClientCard: React.FC<{
  client: (typeof CLIENTS)[0];
  delay: number;
  frame: number;
  fps: number;
}> = ({ client, delay, frame, fps }) => {
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center bottom",
        background: "#111",
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid #ffffff15`,
        flex: 1,
      }}
    >
      {/* Before / After split */}
      <div style={{ display: "flex", height: 340, position: "relative" }}>
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Img
            src={staticFile(client.beforeSrc)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 8,
              background: "#000000cc",
              color: WHITE,
              fontFamily: "Arial, sans-serif",
              fontSize: 18,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 6,
              letterSpacing: 2,
            }}
          >
            BEFORE
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 3, background: GREEN, flexShrink: 0 }} />

        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Img
            src={staticFile(client.afterSrc)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              background: GREEN,
              color: DARK,
              fontFamily: "Arial, sans-serif",
              fontSize: 18,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 6,
              letterSpacing: 2,
            }}
          >
            AFTER
          </div>
        </div>
      </div>

      {/* Name + result */}
      <div style={{ padding: "16px 18px" }}>
        <div
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: 26,
            fontWeight: 900,
            color: WHITE,
            marginBottom: 4,
          }}
        >
          {client.name}
        </div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            color: GREEN,
            fontWeight: 600,
          }}
        >
          {client.result}
        </div>
      </div>
    </div>
  );
};

export const ClientResults: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, 18], [-40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const taglineOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const taglineScale = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: DARK,
        display: "flex",
        flexDirection: "column",
        padding: "60px 40px 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        <div
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: 68,
            fontWeight: 900,
            color: WHITE,
            letterSpacing: -2,
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          CLIENT{" "}
          <span style={{ color: GREEN }}>RESULTS</span>
        </div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 24,
            color: `${WHITE}60`,
            marginTop: 10,
          }}
        >
          Real transformations from real people.
        </div>
      </div>

      {/* Cards row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flex: 1,
        }}
      >
        {CLIENTS.map((client, i) => (
          <ClientCard
            key={client.name}
            client={client}
            delay={i * 15 + 10}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `scale(${taglineScale})`,
          transformOrigin: "center",
          textAlign: "center",
          marginTop: 40,
        }}
      >
        <div
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: 52,
            fontWeight: 900,
            color: WHITE,
            letterSpacing: -1,
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          FROM OVERWEIGHT TO{" "}
          <span style={{ color: GREEN }}>RELENTLESS</span>
        </div>
      </div>
    </div>
  );
};
