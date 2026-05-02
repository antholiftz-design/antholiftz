import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { Hook } from "./scenes/Hook";
import { BrandReveal } from "./scenes/BrandReveal";
import { WebsiteMockup } from "./scenes/WebsiteMockup";
import { Benefits } from "./scenes/Benefits";
import { CTA } from "./scenes/CTA";

// Scene timing (frames @ 30fps)
// Hook:         0  – 70   (2.3s) — punchy hook
// BrandReveal:  60 – 150  (3s)   — brand identity
// WebsiteMockup:140 – 270  (4.3s) — website scroll
// Benefits:     260 – 370  (3.7s) — 3 key benefits
// CTA:          360 – 450  (3s)   — call to action

const SCENES = [
  { from: 0,   duration: 70,  Component: Hook },
  { from: 60,  duration: 100, Component: BrandReveal },
  { from: 140, duration: 130, Component: WebsiteMockup },
  { from: 260, duration: 110, Component: Benefits },
  { from: 360, duration: 90,  Component: CTA },
] as const;

const CrossFade: React.FC<{
  frame: number;
  start: number;
  end: number;
  children: React.ReactNode;
}> = ({ frame, start, end, children }) => {
  const opacity = interpolate(frame, [start, start + 8, end - 8, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
};

export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      {SCENES.map(({ from, duration, Component }) => (
        <Sequence key={from} from={from} durationInFrames={duration}>
          <CrossFade frame={frame - from} start={0} end={duration}>
            <AbsoluteFill>
              <Component />
            </AbsoluteFill>
          </CrossFade>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
