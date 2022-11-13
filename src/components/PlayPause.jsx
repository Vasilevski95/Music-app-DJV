import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  //Based on this props, we can have a ternary operator
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle 
    size={35}
    className="text-gray-300"
    onClick={handlePause}
    />
  ) : (
    <FaPlayCircle 
    size={35}
    className="text-gray-300"
    onClick={handlePlay}
    />
  );
  // If we are playing and active song title is equal to current list song title, that means we are currently plaing it and we want to show pause icon, else show play icon

export default PlayPause;
