import React from "react";
import { Composition } from "remotion";
import { PromoVideo } from "./Promo";
import { WIDTH, HEIGHT, FPS } from "./constants";
import { TOTAL_FRAMES } from "./Promo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
