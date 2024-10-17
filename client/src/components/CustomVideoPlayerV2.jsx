/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import '~/styles/components/CustomReactPlayer.css';

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
    PictureInPicture2,
} from 'lucide-react';

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
    const [buffered, setBuffered] = useState(0);

    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const volumeSliderRef = useRef(null);

    const handlePlayPause = () => setPlaying(!playing);

    const handleRewind = () => {
        const time = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(Math.max(time - 10, 0));
    };

    const handleForward = () => {
        const time = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(Math.min(time + 10, duration));
    };

    const handleProgress = (state) => {
        setProgress(state.played);
        setCurrentTime(state.playedSeconds);
        setBuffered(state.loaded);
    };

    const handleSeek = (e) => {
        const bounds = progressRef.current.getBoundingClientRect();
        const percent = (e.clientX - bounds.left) / bounds.width;
        playerRef.current.seekTo(percent);
    };

    const toggleMute = () => setMuted(!muted);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setMuted(newVolume === 0);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const toggleSettings = () => setShowSettings(!showSettings);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (volumeSliderRef.current && !volumeSliderRef.current.contains(event.target)) {
                setShowVolumeSlider(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const controlButtonsLeft = [
        // { icon: <ChevronsLeft size={20} />, onClick: () => alert('Nút chuyển tập trước'), label: 'Back' },
        { icon: <SkipBack size={20} />, onClick: handleRewind, label: 'Backward video' },
        { icon: playing ? <Pause size={20} /> : <Play size={20} />, onClick: handlePlayPause, label: 'Play/Pause' },
        { icon: <SkipForward size={20} />, onClick: handleForward, label: 'Forward' },
        // { icon: <ChevronsRight size={20} />, onClick: () => alert('Nút chuyển tập tiếp theo'), label: 'Next video' },
        {
            icon: muted ? <VolumeX size={20} /> : <Volume2 size={20} />,
            onClick: () => setShowVolumeSlider(!showVolumeSlider),
            label: 'Volume',
        },
    ];

    const controlButtonsRight = [
        { icon: <Settings size={20} />, onClick: toggleSettings, label: 'Settings' },
        { icon: fullscreen ? <Minimize size={20} /> : <Maximize size={20} />, onClick: toggleFullscreen, label: 'Fullscreen' },
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
                <div className="mb-2 flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        {controlButtonsLeft.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onClick}
                                className="text-white transition-colors hover:text-blue-500"
                                title={button.label}
                            >
                                {button.icon}
                            </button>
                        ))}
                        <span className="mr-[2px] text-xs text-white">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>
                    <div className="flex-1">
                        <div
                            ref={progressRef}
                            className="relative h-2 w-full cursor-pointer rounded-full bg-gray-800 shadow-md transition-transform duration-500 hover:shadow-xl"
                            onClick={handleSeek}
                        >
                            <div
                                className="absolute left-0 top-0 h-full rounded-full bg-gray-500 transition-all duration-500 ease-in-out"
                                style={{ width: `${buffered * 100}%` }}
                            />
                            <div
                                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 transition-all duration-500 ease-in-out"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-white">{playbackRate}x</span>
                        {controlButtonsRight.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onClick}
                                className="text-white transition-colors hover:text-blue-500"
                                title={button.label}
                            >
                                {button.icon}
                            </button>
                        ))}
                    </div>
                </div>
                {showVolumeSlider && (
                    <div className="absolute bottom-full left-[126px] -translate-x-1/2 transform rounded bg-transparent p-2">
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{
                                writingMode: 'vertical-lr',
                                direction: 'rtl',
                            }}
                        />
                    </div>
                )}
            </div>
            {showSettings && (
                <div className="absolute bottom-[55px] right-[10px] z-10 select-none bg-black bg-opacity-50 p-2.5 pr-5 transition-[bottom] duration-500">
                    <button onClick={toggleSettings} className="absolute right-2 top-2 cursor-pointer text-white">
                        <X size={25} />
                    </button>
                    <div className="mb-4 flex items-center">
                        <label className="pr-[50px] text-white">Máy chủ</label>
                        <span className="mr-1 cursor-pointer rounded border border-white px-4 py-1 text-sm text-white">SG</span>
                        <span className="mr-1 cursor-pointer rounded px-4 py-1 text-sm text-white">YOUTUBE</span>
                        <span className="mr-1 cursor-pointer rounded px-4 py-1 text-sm text-white">ADS</span>
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="pr-[50px] text-white">Chất lượng</label>
                        <div className="flex space-x-2">
                            <span className="mr-1 cursor-pointer rounded px-4 py-1 text-sm text-white">Auto</span>
                            <span className="mr-1 cursor-pointer rounded px-4 py-1 text-sm text-white">480p</span>
                            <span className="mr-1 cursor-pointer rounded px-4 py-1 text-sm text-white">
                                720p <sup className="text-red-500">HD</sup>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="pr-[50px] text-white">Tốc độ</label>
                        <div className="flex space-x-2">
                            {[0.25, 0.5, 1, 1.5, 2].map((speed) => (
                                <button
                                    key={speed}
                                    onClick={() => setPlaybackRate(speed)}
                                    className={`cursor-pointer rounded border px-2 py-1 ${
                                        playbackRate === speed ? 'border-red-600 text-red-600' : 'border-white text-white'
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
