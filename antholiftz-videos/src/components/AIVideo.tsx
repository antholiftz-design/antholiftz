import { loadFont } from "@remotion/google-fonts/Oswald";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import { FPS, INTRO_DURATION } from "../lib/constants";
import { TimelineSchema } from "../lib/types";
import { calculateFrameTiming, getAudioPath } from "../lib/utils";
import { Background } from "./Background";
import Subtitle from "./Subtitle";

export const aiVideoSchema = z.object({
  timeline: TimelineSchema.nullable(),
});

const { fontFamily } = loadFont();

export const AIVideo: React.FC<z.infer<typeof aiVideoSchema>> = ({
  timeline,
}) => {
  if (!timeline) {
    throw new Error("Expected timeline to be fetched");
  }

  const { id } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <Sequence durationInFrames={INTRO_DURATION}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            zIndex: 10,
            background:
              "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 60%, #0a0a0a 100%)",
          }}
        >
          <div
            style={{
              fontSize: 72,
              letterSpacing: 12,
              color: "#f97316",
              fontFamily,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            ANTHOLIFTZ
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: "100px",
              width: "87%",
              color: "#ffffff",
              fontFamily,
              fontWeight: 700,
              textTransform: "uppercase",
              borderTop: "4px solid #f97316",
              borderBottom: "4px solid #f97316",
              paddingTop: 24,
              paddingBottom: 24,
            }}
          >
            {timeline.shortTitle}
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#9ca3af",
              fontFamily,
              textTransform: "uppercase",
              letterSpacing: 6,
            }}
          >
            ONLINE FITNESS COACHING
          </div>
        </AbsoluteFill>
      </Sequence>

      {timeline.elements.map((element, index) => {
        const { startFrame, duration } = calculateFrameTiming(
          element.startMs,
          element.endMs,
          { includeIntro: index === 0 },
        );

        return (
          <Sequence
            key={`element-${index}`}
            from={startFrame}
            durationInFrames={duration}
            premountFor={3 * FPS}
          >
            <Background project={id} item={element} />
          </Sequence>
        );
      })}

      {timeline.text.map((element, index) => {
        const { startFrame, duration } = calculateFrameTiming(
          element.startMs,
          element.endMs,
          { addIntroOffset: true },
        );

        return (
          <Sequence
            key={`element-${index}`}
            from={startFrame}
            durationInFrames={duration}
          >
            <Subtitle key={index} text={element.text} />
          </Sequence>
        );
      })}

      {timeline.audio.map((element, index) => {
        const { startFrame, duration } = calculateFrameTiming(
          element.startMs,
          element.endMs,
          { addIntroOffset: true },
        );

        return (
          <Sequence
            key={`element-${index}`}
            from={startFrame}
            durationInFrames={duration}
            premountFor={3 * FPS}
          >
            <Audio src={staticFile(getAudioPath(id, element.audioUrl))} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
