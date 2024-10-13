/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const VideoPlayer = ({ src, provider }) => {
  return (
    <Plyr
      source={{
        type: "video",
        sources: [
          {
            src: src,
            provider: provider, // Hoặc 'vimeo' hoặc 'youtube'
          },
        ],
      }}
      options={{
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          // "captions",
          "settings",
          "pip",
          "fullscreen",
        ],
        speed: { selected: 1, options: [0.5, 1, 1.5, 2] }, // Tùy chọn tốc độ phát lại
        quality: { default: 720, options: [360, 720, 1080] }, // Tùy chọn chất lượng
      }}
    />
  );
};

export default VideoPlayer;
