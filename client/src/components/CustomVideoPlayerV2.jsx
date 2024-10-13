/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import "~/styles/components/CustomReactPlayer.css";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  ChevronsRight,
  ChevronsLeft,
  X,
  Captions,
  PictureInPicture2,
} from "lucide-react";

const CustomVideoPlayerV2 = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isPipEnabled, setIsPipEnabled] = useState(false);

  const playerRef = useRef(null); // Tham chiếu tới video player
  const containerRef = useRef(null);
  const progressRef = useRef(null); // Tham chiếu tới thanh tiến trình
  const volumeSliderRef = useRef(null);

  const [buffered, setBuffered] = useState(0); // Thêm state cho phần buffered

  // Tạm dừng
  const handlePlayPause = () => setPlaying(!playing);
  // Tua video 10s
  const handleRewind = () => {
    const time = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.max(time - 10, 0));
  };
  // Chuyển tiếp 10s
  const handleForward = () => {
    const time = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.min(time + 10, duration));
  };
  // Tiến trình video
  const handleProgress = (state) => {
    setProgress(state.played);
    setCurrentTime(state.playedSeconds);
    setBuffered(state.loaded); // Cập nhật phần buffered từ state.loaded
  };

  /**
   * Tua video dựa vào vị trí chuột click vào thanh tiến trình
   * @param {MouseEvent} e - Sự kiện click vào thanh tiến trình
   */
  const handleSeek = (e) => {
    const bounds = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    playerRef.current.seekTo(percent);
  };
  // Tắt âm
  const toggleMute = () => setMuted(!muted);
  // Tăng giảm âm lượng
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };
  // Phóng to màn hình
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  // Bật cài đặt
  const toggleSettings = () => setShowSettings(!showSettings);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        volumeSliderRef.current &&
        !volumeSliderRef.current.contains(event.target)
      ) {
        setShowVolumeSlider(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  /**
   * Chuyển đổi giây sang phút và giây ( từ từ sửa sau sang dạng có hh:mm:ss)
   * @param {number} timeInSeconds - Số giây
   * @returns {string} Chuỗi có dạng "mm:ss"
   */
  //
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  // Cập nhật hàm togglePip
  const togglePip = () => {
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer();
      if (internalPlayer && document.pictureInPictureEnabled) {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        } else {
          internalPlayer.requestPictureInPicture();
        }
      } else {
        console.log("Picture-in-Picture is not supported");
      }
    }
  };

  // Cập nhật effect để kiểm tra hỗ trợ PiP một cách an toàn
  useEffect(() => {
    const checkPipSupport = () => {
      if (playerRef.current) {
        const internalPlayer = playerRef.current.getInternalPlayer();
        if (internalPlayer && document.pictureInPictureEnabled) {
          setIsPipEnabled(true);
        } else {
          setIsPipEnabled(false);
        }
      }
    };

    // Kiểm tra sau khi component đã mount
    checkPipSupport();

    // Thêm event listener cho sự kiện 'loadedmetadata'
    const videoElement = playerRef.current?.getInternalPlayer();
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", checkPipSupport);
    }

    // Cleanup function
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", checkPipSupport);
      }
    };
  }, []);

  // Các nút control bên trái
  const controlButtonsLeft = [
    {
      icon: <ChevronsLeft size={20} />,
      onClick: () => alert("Nút chuyển tập trước"),
      label: "Back",
    },
    {
      icon: <SkipBack size={20} />,
      onClick: handleRewind,
      label: "Backward video",
    },
    {
      icon: playing ? <Pause size={20} /> : <Play size={20} />,
      onClick: handlePlayPause,
      label: "Play/Pause",
    },
    {
      icon: <SkipForward size={20} />,
      onClick: handleForward,
      label: "Forward",
    },
    {
      icon: <ChevronsRight size={20} />,
      onClick: () => alert("Nút chuyển tập tiếp theo"),
      label: "Next video",
    },
    {
      icon: muted ? <VolumeX size={20} /> : <Volume2 size={20} />,
      onClick: () => setShowVolumeSlider(!showVolumeSlider),
      label: "Volume",
    },
  ];
  // Các nút control bên phải
  const controlButtonsRight = [
    {
      icon: <PictureInPicture2 size={20} />,
      onClick: () => togglePip(),
      label: "Picture-in-Picture",
    },
    {
      icon: <Settings size={20} />,
      onClick: toggleSettings,
      label: "Settings",
    },
    {
      icon: fullscreen ? <Minimize size={20} /> : <Maximize size={20} />,
      onClick: toggleFullscreen,
      label: "Fullscreen",
    },
  ];
  return (
    <div ref={containerRef} className="relative aspect-video bg-black">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={setDuration}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
        <div className="flex justify-between items-center mb-2 space-x-4">
          {/* Control Buttons Left + Time */}
          <div className="flex items-center space-x-4">
            {controlButtonsLeft.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className="text-white hover:text-blue-500 transition-colors"
                title={button.label}
              >
                {button.icon}
              </button>
            ))}
            {/* Time */}
            <span className="text-white text-xs mr-[2px]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          {/* Thanh tiến trình */}
          <div className="flex-1">
            <div
              ref={progressRef}
              className="relative bg-gray-800 h-2 w-full rounded-full cursor-pointer shadow-md transition-transform duration-500 hover:shadow-xl"
              onClick={handleSeek}
            >
              {/* Phần video đã load */}
              <div
                className="absolute top-0 left-0 h-full bg-gray-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${buffered * 100}%` }}
              />
              {/* Phần tiến trình video */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress * 100}%` }}
              />
              {/* Nút hiển thị vị trí hiện tại */}
              {/* <div
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-teal-400 to-indigo-600 rounded-full shadow-lg hover:scale-125 transition-transform duration-300 ease-in-out"
                style={{ left: `calc(${progress * 100}% - 8px)` }}
              /> */}
            </div>
          </div>

          {/* Control Buttons Right */}
          <div className="flex space-x-4 items-center">
            <span className="text-white text-sm">{playbackRate}x</span>
            {controlButtonsRight.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className="text-white hover:text-blue-500 transition-colors"
                title={button.label}
              >
                {button.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Volume Slider */}
        {showVolumeSlider && (
          <div className="absolute bottom-full left-[126px] transform -translate-x-1/2 bg-transparent p-2 rounded">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              style={{
                writingMode: "vertical-lr",
                direction: "rtl",
              }}
            />
          </div>
        )}
      </div>

      {showSettings && (
        <div className="absolute bottom-[55px] right-[10px] z-10 p-2.5 pr-5 bg-black bg-opacity-50 select-none transition-[bottom] duration-500">
          <button
            onClick={toggleSettings}
            className="absolute top-2 right-2 text-white cursor-pointer"
          >
            <X size={25} />
          </button>
          {/* Chọn máy chủ */}
          <div className="flex items-center mb-4">
            <label className="text-white pr-[50px]">Máy chủ</label>
            <span className="border border-white text-sm text-white px-4 py-1 rounded mr-1 cursor-pointer">
              SG
            </span>
            <span className="text-sm text-white px-4 py-1 rounded mr-1 cursor-pointer">
              YOUTUBE
            </span>
            <span className="text-sm text-white px-4 py-1 rounded mr-1 cursor-pointer">
              ADS
            </span>
          </div>

          {/* Chọn chất lượng video */}
          <div className="flex items-center mb-4">
            <label className="text-white pr-[50px]">Chất lượng</label>
            <div className="flex space-x-2">
              <span className="text-sm text-white px-4 py-1 rounded mr-1 cursor-pointer">
                Auto
              </span>
              <span className="text-sm text-white px-4 py-1 rounded mr-1 cursor-pointer">
                480p
              </span>
              <span className="text-sm text-white px-4 py-1 rounded mr-1 cursor-pointer">
                720p <sup className="text-red-500">HD</sup>
              </span>
            </div>
          </div>

          {/* Tốc độ phát */}
          <div className="flex items-center">
            <label className="text-white pr-[50px]">Tốc độ</label>
            <div className="flex space-x-2">
              {[0.25, 0.5, 1, 1.5, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackRate(speed)}
                  className={`border px-2 py-1 rounded cursor-pointer ${
                    playbackRate === speed
                      ? "border-red-600 text-red-600"
                      : "border-white text-white"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayerV2;
