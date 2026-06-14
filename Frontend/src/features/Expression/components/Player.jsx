import React, { useRef, useState, useEffect } from 'react';
import { useSong } from '../hooks/useSong';

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (!audioRef.current || !song?.url) {
      return;
    }

    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);

    const playPromise = audioRef.current.play();
    setIsPlaying(true);

    if (playPromise?.catch) {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }
  }, [song?.url]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      setIsPlaying(true);

      if (playPromise?.catch) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const forward5 = () => {
    const newTime = Math.min(currentTime + 5, duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const backward5 = () => {
    const newTime = Math.max(currentTime - 5, 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player w-full max-w-full bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img src={song.posterUrl} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{song.title}</p>
            <p className="text-xs text-gray-400">{song.mood}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button
            onClick={backward5}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors text-sm"
          >
            ⏪ 5s
          </button>
          <button
            onClick={togglePlay}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button
            onClick={forward5}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors text-sm"
          >
            5s ⏩
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-gray-400 w-10 text-center">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-[11px] text-gray-400 w-10 text-center">{formatTime(duration)}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-gray-400">Playback speed</div>
        <select
          value={speed}
          onChange={handleSpeedChange}
          className="bg-gray-700 text-white text-sm p-2 rounded-lg"
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
      <audio
        ref={audioRef}
        src={song.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Player;
