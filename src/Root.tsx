import React from "react";
import { Composition } from "remotion";
import { PromoVideo } from "./Promo";
import { WIDTH, HEIGHT, FPS, DURATION_FRAMES } from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
