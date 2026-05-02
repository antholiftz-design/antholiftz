import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { Hook } from "./scenes/Hook";
import { BrandReveal } from "./scenes/BrandReveal";
import { ClientResults } from "./scenes/ClientResults";
import { Benefits } from "./scenes/Benefits";
import { CTA } from "./scenes/CTA";

// Scene timing (frames @ 30fps)
// Hook:          0  – 75   (2.5s)  — "REAL PEOPLE. REAL RESULTS. NO SHORTCUTS."
// BrandReveal:   65 – 155  (3s)    — antholiftz brand identity
// ClientResults: 145 – 295 (5s)    — before/after photos
// Benefits:      285 – 385 (3.3s)  — 3 benefits
// CTA:           375 – 480 (3.5s)  — call to action

export const TOTAL_FRAMES = 480;

const SCENES = [
  { from: 0,   duration: 75,  Component: Hook },
  { from: 65,  duration: 100, Component: BrandReveal },
  { from: 145, duration: 150, Component: ClientResults },
  { from: 285, duration: 100, Component: Benefits },
  { from: 375, duration: 105, Component: CTA },
] as const;

const CrossFade: React.FC<{
  frame: number;
  duration: number;
  children: React.ReactNode;
}> = ({ frame, duration, children }) => {
  const opacity = interpolate(frame, [0, 8, duration - 8, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      {SCENES.map(({ from, duration, Component }) => (
        <Sequence key={from} from={from} durationInFrames={duration}>
          <CrossFade frame={frame - from} duration={duration}>
            <AbsoluteFill>
              <Component />
            </AbsoluteFill>
          </CrossFade>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
