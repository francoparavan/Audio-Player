import React, { useState, useRef, useEffect } from "react";

const MediaPlayer = () => {
  const baseUrl = "https://playground.4geeks.com";
  const [tracks] = useState([
    { id: 1, name: "Mario Castle", url: "/sound/files/mario/songs/castle.mp3" },
    { id: 2, name: "Mario Star", url: "/sound/files/mario/songs/hurry-starman.mp3" },
    { id: 3, name: "Mario Overworld", url: "/sound/files/mario/songs/overworld.mp3" },
    { id: 4, name: "Mario Stage 1", url: "/sound/files/mario/songs/stage1.mp3" },
    { id: 5, name: "Mario Stage 2", url: "/sound/files/mario/songs/stage2.mp3" },
    { id: 6, name: "Mario Star", url: "/sound/files/mario/songs/starman.mp3" },
    { id: 7, name: "Mario Underworld", url: "/sound/files/mario/songs/underworld.mp3" },
    { id: 8, name: "Mario Underwater", url: "/sound/files/mario/songs/underwater.mp3" },
    { id: 9, name: "Zelda Castle", url: "/sound/files/videogame/songs/zelda_castle.mp3" },
    { id: 10, name: "Zelda Outworld", url: "/sound/files/videogame/songs/zelda_outworld.mp3" },
    { id: 11, name: "Zelda Titles", url: "/sound/files/videogame/songs/zelda_title.mp3" },
    { id: 12, name: "Sonic Brain Zone", url: "/sound/files/videogame/songs/sonic_brain-zone.mp3" },
    { id: 13, name: "Zelda Link To Past", url: "/sound/files/videogame/songs/zelda_link-to-past.mp3" },
    { id: 14, name: "Flintstones", url: "/sound/files/cartoons/songs/flintstones.mp3" },
    { id: 15, name: "power-rangers", url: "/sound/files/cartoons/songs/power-rangers.mp3" },
    { id: 16, name: "simpsons", url: "/sound/files/cartoons/songs/simpsons.mp3" },
    { id: 17, name: "south-park", url: "/sound/files/cartoons/songs/south-park.mp3" },
    { id: 18, name: "thundercats", url: "/sound/files/cartoons/songs/thundercats.mp3" },
    { id: 19, name: "x-men", url: "/sound/files/cartoons/songs/x-men.mp3" }
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durations, setDurations] = useState([]);
  const audioElement = useRef(null);

  useEffect(() => {
    const fetchDurations = async () => {
      const durationPromises = tracks.map((track) => {
        return new Promise((resolve) => {
          const audio = new Audio(`${baseUrl}${track.url}`);
          audio.onloadedmetadata = () => {
            resolve(audio.duration);
          };
        });
      });

      const durations = await Promise.all(durationPromises);
      setDurations(durations);
    };

    fetchDurations();
  }, [tracks]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioElement.current.pause();
    } else {
      audioElement.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setTimeout(() => {
      audioElement.current.play();
      setIsPlaying(true);
    }, 0);
  };

  const handlePrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    setTimeout(() => {
      audioElement.current.play();
      setIsPlaying(true);
    }, 0);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player-container">
      <ul className="track-list">
        {tracks.map((track, index) => (
          <li
            key={track.id}
            className={index === currentTrackIndex ? "current" : ""}
            onClick={() => {
              setCurrentTrackIndex(index);
              audioElement.current.play();
              setIsPlaying(true);
            }}
            onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          >
            {index + 1}. {track.name}{" "}
            <span className="duration">
              {durations[index] ? formatDuration(durations[index]) : "Loading..."}
            </span>
          </li>
        ))}
      </ul>
      <div className="controls">
        <button onClick={handlePrevious}>&#9664;</button>
        <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleNext}>&#9654;</button>
      </div>
      <audio
        ref={audioElement}
        src={`${baseUrl}${tracks[currentTrackIndex].url}`}
        onEnded={handleNext}
      ></audio>
    </div>
  );
};

export default MediaPlayer;