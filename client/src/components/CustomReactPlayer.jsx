/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
} from "lucide-react";

const CustomVideoPlayer = ({ url }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:06");
  const [duration, setDuration] = useState("23:50");
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [subtitles, setSubtitles] = useState(false);
  const [quality, setQuality] = useState("auto");
  const [speed, setSpeed] = useState(1);
  const [server, setServer] = useState(null);

  const handleTogglePlayPause = () => setPlaying(!playing);
  const handleProgress = (state) => {
    setProgress(state.played * 100);
    setCurrentTime(formatTime(state.playedSeconds));
  };
  const handleDuration = (duration) => setDuration(formatTime(duration));
  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    playerRef.current.seekTo(newProgress / 100);
  };
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };
  const handleToggleMute = () => setMuted(!muted);
  const handleSkipBack = () =>
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  const handleSkipForward = () =>
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  const handleToggleFullScreen = () => {
    const element = document.getElementById("player-wrapper");
    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  const handleToggleSettings = () => setShowSettings(!showSettings);

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div
      id="player-wrapper"
      className="relative w-full max-w-[960px] mx-auto bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg"
    >
      <div className="aspect-video bg-black">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        {showSettings && (
          <div className="absolute bottom-11 right-4 bg-gray-900 bg-opacity-90 text-white rounded-lg overflow-hidden shadow-lg p-4 z-10">
            <h2 className="text-lg font-bold mb-2">Settings</h2>
            <div className="flex items-center space-x-4 mb-2">
              <label>Subtitles:</label>
              <input
                type="checkbox"
                checked={subtitles}
                onChange={() => setSubtitles(!subtitles)}
              />
            </div>
            <div className="flex items-center space-x-4 mb-2">
              <label>Quality:</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-gray-700 rounded"
              >
                <option value="auto">Auto</option>
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
                <option value="360p">360p</option>
              </select>
            </div>
            <div className="flex items-center space-x-4 mb-2">
              <label>Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="bg-gray-700 rounded"
              >
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
            <div className="flex items-center space-x-4 mb-2">
              <label>Server:</label>
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="bg-gray-700 rounded"
              >
                <option value="">Select a server</option>
                {/* Add more server options here */}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSkipBack}
                className="text-white hover:text-gray-300"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={handleTogglePlayPause}
                className="text-white hover:text-gray-300"
              >
                {playing ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={handleSkipForward}
                className="text-white hover:text-gray-300"
              >
                <SkipForward size={20} />
              </button>
              <button
                onClick={handleToggleMute}
                className="text-white hover:text-gray-300"
              >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <span className="text-sm w-[120px]">
                {currentTime} / {duration}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 mx-4 bg-gray-600 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex items-center space-x-4">
              <button
                onClick={handleToggleSettings}
                className="text-white hover:text-gray-300"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={handleToggleFullScreen}
                className="text-white hover:text-gray-300"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
