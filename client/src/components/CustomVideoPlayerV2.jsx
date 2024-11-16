/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize, Settings, X } from 'lucide-react';

const PLAYBACK_SPEEDS = [0.25, 0.5, 1, 1.5, 2];
const SEEK_SECONDS = 10;
const VOLUME_STEP = 0.01;
const CONTROLS_HIDE_DELAY = 2000; // 2 seconds delay before hiding controls

const CustomVideoPlayerV2 = ({ url, subtitleUrl }) => {
    // Player state management
    const [playerState, setPlayerState] = useState({
        playing: false,
        progress: 0,
        volume: 1,
        muted: false,
        fullscreen: false,
        showSettings: false,
        playbackRate: 1,
        duration: 0,
        currentTime: 0,
        buffered: 0,
    });

    // UI state management
    const [showControls, setShowControls] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Refs
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const volumeSliderTimeoutRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    // Controls visibility management
    const resetControlsTimeout = useCallback(() => {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }

        setShowControls(true);

        // Always set timeout to hide controls
        controlsTimeoutRef.current = setTimeout(() => {
            // Only hide if not in settings menu
            if (!playerState.showSettings) {
                setShowControls(false);
                setShowVolumeSlider(false);
            }
        }, CONTROLS_HIDE_DELAY);
    }, [playerState.showSettings]);

    const handleMouseMove = useCallback(() => {
        resetControlsTimeout();
    }, [resetControlsTimeout]);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
        setShowControls(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        // Always hide controls when mouse leaves
        if (!playerState.showSettings) {
            setShowControls(false);
            setShowVolumeSlider(false);
        }
    }, [playerState.showSettings]);

    // Player control handlers
    const handlePlayPause = useCallback(() => {
        setPlayerState((prev) => ({ ...prev, playing: !prev.playing }));
        resetControlsTimeout();
    }, [resetControlsTimeout]);

    const handleTimeSeek = useCallback(
        (direction) => {
            if (!playerRef.current) return;

            const currentTime = playerRef.current.getCurrentTime();
            const newTime =
                direction === 'backward'
                    ? Math.max(currentTime - SEEK_SECONDS, 0)
                    : Math.min(currentTime + SEEK_SECONDS, playerState.duration);

            playerRef.current.seekTo(newTime);
            resetControlsTimeout();
        },
        [playerState.duration, resetControlsTimeout],
    );

    const handleProgress = useCallback((state) => {
        setPlayerState((prev) => ({
            ...prev,
            progress: state.played,
            currentTime: state.playedSeconds,
            buffered: state.loaded,
        }));
    }, []);

    const handleSeek = useCallback(
        (e) => {
            if (!progressRef.current || !playerRef.current) return;

            const bounds = progressRef.current.getBoundingClientRect();
            const percent = (e.clientX - bounds.left) / bounds.width;
            playerRef.current.seekTo(percent);
            resetControlsTimeout();
        },
        [resetControlsTimeout],
    );

    const handleVolumeChange = useCallback(
        (e) => {
            const newVolume = parseFloat(e.target.value);
            setPlayerState((prev) => ({
                ...prev,
                volume: newVolume,
                muted: newVolume === 0,
            }));
            resetControlsTimeout();
        },
        [resetControlsTimeout],
    );

    const toggleMute = useCallback(() => {
        setPlayerState((prev) => ({ ...prev, muted: !prev.muted }));
        resetControlsTimeout();
    }, [resetControlsTimeout]);

    // Fullscreen management
    const handleFullscreenChange = useCallback(() => {
        setPlayerState((prev) => ({
            ...prev,
            fullscreen: !!document.fullscreenElement,
        }));
    }, []);

    const toggleFullscreen = useCallback(async () => {
        try {
            if (!document.fullscreenElement && containerRef.current) {
                await containerRef.current.requestFullscreen();
            } else if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error('Fullscreen error:', error);
        }
        resetControlsTimeout();
    }, [resetControlsTimeout]);

    // Cleanup effects
    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
            if (volumeSliderTimeoutRef.current) {
                clearTimeout(volumeSliderTimeoutRef.current);
            }
        };
    }, [handleFullscreenChange]);

    // Time formatting helper
    const formatTime = useCallback((timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, []);

    // Control buttons configuration
    const controlButtonsLeft = [
        {
            icon: <SkipBack size={20} />,
            onClick: () => handleTimeSeek('backward'),
            label: 'Tua lại 10 giây',
        },
        {
            icon: playerState.playing ? <Pause size={20} /> : <Play size={20} />,
            onClick: handlePlayPause,
            label: playerState.playing ? 'Tạm dừng' : 'Phát',
        },
        {
            icon: <SkipForward size={20} />,
            onClick: () => handleTimeSeek('forward'),
            label: 'Tua đi 10 giây',
        },
        {
            icon: playerState.muted ? <VolumeX size={20} /> : <Volume2 size={20} />,
            onClick: () => {
                toggleMute();
                setShowVolumeSlider((prev) => !prev);
            },
            label: playerState.muted ? 'Bật âm thanh' : 'Tắt âm thanh',
        },
    ];

    const controlButtonsRight = [
        {
            icon: <Settings size={20} />,
            onClick: () => {
                setPlayerState((prev) => ({ ...prev, showSettings: !prev.showSettings }));
                resetControlsTimeout();
            },
            label: 'Cài đặt',
        },
        {
            icon: playerState.fullscreen ? <Minimize size={20} /> : <Maximize size={20} />,
            onClick: toggleFullscreen,
            label: playerState.fullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình',
        },
    ];

    return (
        <div
            ref={containerRef}
            className="relative aspect-video bg-black"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <ReactPlayer
                ref={playerRef}
                url={url}
                width="100%"
                height="100%"
                playing={playerState.playing}
                volume={playerState.volume}
                muted={playerState.muted}
                playbackRate={playerState.playbackRate}
                onProgress={handleProgress}
                onDuration={(duration) => setPlayerState((prev) => ({ ...prev, duration }))}
                onError={(error) => console.error('Player error:', error)}
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload',
                            onContextMenu: (e) => e.preventDefault(),
                        },
                        tracks: [
                            {
                                kind: 'subtitles',
                                src: subtitleUrl, // Đường dẫn phụ đề
                                srcLang: 'vi', // Ngôn ngữ phụ đề (ở đây là tiếng Việt)
                                default: true, // Đặt phụ đề này làm mặc định
                            },
                        ],
                    },
                }}
            />

            {/* Controls overlay */}
            <div
                className={`absolute bottom-0 left-0 right-0 transition-opacity duration-200 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                } ${!showControls && 'pointer-events-none'}`}
            >
                <div className="bg-gradient-to-t from-black/90 to-transparent p-2">
                    {/* Progress bar */}
                    <div className="mb-2 flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            {controlButtonsLeft.map((button, index) => (
                                <button
                                    key={index}
                                    onClick={button.onClick}
                                    className="text-white transition-colors hover:text-blue-500"
                                    title={button.label}
                                    aria-label={button.label}
                                >
                                    {button.icon}
                                </button>
                            ))}
                            <span className="mr-[2px] text-xs text-white">
                                {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="flex-1">
                            <div
                                ref={progressRef}
                                className="relative h-2 w-full cursor-pointer rounded-full bg-gray-800"
                                onClick={handleSeek}
                                role="slider"
                                aria-label="Video progress"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={playerState.progress * 100}
                            >
                                <div
                                    className="absolute left-0 top-0 h-full rounded-full bg-gray-500 transition-all"
                                    style={{ width: `${playerState.buffered * 100}%` }}
                                />
                                <div
                                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                                    style={{ width: `${playerState.progress * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Right controls */}
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-white">{playerState.playbackRate}x</span>
                            {controlButtonsRight.map((button, index) => (
                                <button
                                    key={index}
                                    onClick={button.onClick}
                                    className="text-white transition-colors hover:text-blue-500"
                                    title={button.label}
                                    aria-label={button.label}
                                >
                                    {button.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Volume slider */}
                    {showVolumeSlider && (
                        <div
                            className="absolute bottom-full left-[126px] -translate-x-1/2 transform rounded bg-black/50 p-2"
                            onMouseEnter={() => {
                                setShowControls(true);
                                if (controlsTimeoutRef.current) {
                                    clearTimeout(controlsTimeoutRef.current);
                                }
                            }}
                            onMouseLeave={() => {
                                setShowVolumeSlider(false);
                                resetControlsTimeout();
                            }}
                        >
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={VOLUME_STEP}
                                value={playerState.volume}
                                onChange={handleVolumeChange}
                                className="h-24"
                                style={{
                                    writingMode: 'vertical-lr',
                                    direction: 'rtl',
                                }}
                                aria-label="Volume control"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Settings panel */}
            {playerState.showSettings && (
                <div
                    className="absolute bottom-[55px] right-[10px] z-10 rounded-lg bg-black/90 p-4"
                    onMouseEnter={() => {
                        setShowControls(true);
                        if (controlsTimeoutRef.current) {
                            clearTimeout(controlsTimeoutRef.current);
                        }
                    }}
                    onMouseLeave={() => {
                        setPlayerState((prev) => ({ ...prev, showSettings: false }));
                        resetControlsTimeout();
                    }}
                >
                    <button
                        onClick={() => setPlayerState((prev) => ({ ...prev, showSettings: false }))}
                        className="absolute right-2 top-2 text-white hover:text-blue-500"
                        aria-label="Đóng cài đặt"
                    >
                        <X size={20} />
                    </button>

                    {/* Playback speed selection */}
                    <div className="mb-4">
                        <label className="mb-2 block text-white">Tốc độ phát</label>
                        <div className="flex flex-wrap gap-2">
                            {PLAYBACK_SPEEDS.map((speed) => (
                                <button
                                    key={speed}
                                    onClick={() => {
                                        setPlayerState((prev) => ({ ...prev, playbackRate: speed }));
                                        resetControlsTimeout();
                                    }}
                                    className={`rounded border px-3 py-1 text-sm transition-colors ${
                                        playerState.playbackRate === speed
                                            ? 'border-blue-500 text-blue-500'
                                            : 'border-white text-white hover:border-blue-500 hover:text-blue-500'
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
