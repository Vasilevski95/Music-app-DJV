import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {

const dispatch = useDispatch()




const handlePauseClick = () => {
  dispatch(playPause(false))
  //The only we want to do if we wanna handle pause is set playPause to false
}

const handlePlayClick = () => {
  dispatch(setActiveSong({ song, data, i }))
  //We setActiveSong and then to that we want to pass an object including song we wanna play, the data for all the songs, and the index of that song
  dispatch(playPause(true))
  //We also wanna triger the playPause to true as we are right now playing
}

//(GLOBAL EXPLANATION*)
//We have to know which song is the currently active song, and are we currently playing, and we know that in Discover component, that is where we have to handle that global state of are we showing the player, are we playing, or are we not. In there we have to make use of special redux toolkit function 


  return (
  //We accept song and index prop
  <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className="relative w-full h-56 group">
      <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden"}`}>
      {/* This div has dynamic classname, because we want to know if the song we are currently showing is the song we are actually playing. If active song is equal to song title, we set property to flex bg black and opacity, if not we set it to hidden */}
        <PlayPause 
          isPlaying = {isPlaying}
          activeSong = {activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          //We have to pass some props to PlayPause
        />
      </div>
      <img alt="song_img" src={song.images?.coverart}/>
      {/* We are fetching 50 different cover arts for 50 different songs coming from the shazamCore api */}
    </div>
    <div className="mt-4 flex flex-col">
      <p className="font-semibold text-lg text-white truncate">
        <Link to={`/songs/${song?.key}`}>
          {/* When clicking on this link, we're gonna be led to specific song detail page */}
          {song.title}
        </Link>
      </p>
      <p className="text-sm truncate text-gray-300 mt-1">
        <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
          {/* If song artist exists, then we wanna go to (dynamic sting of that artist, and then the first artist by specifying the index of [0]), otherwise if artist doesen't exist we point to top artists*/}
          {song.subtitle}
        </Link>
      </p>
    </div>
  </div>
);

}

export default SongCard;

//(GLOBAL EXPLANATION HOW DISPATCH WORKS*)
// CAKE -> SELECTORS (PIECES)
//(We have different cakes, and we have selectors for different pieces. What dispatch does is that it allows you to make changes to that cake)
// DISPATCH (ADD CHOCHOLATE POWDER)
// DISPATCH (ADD CHOCHOLATE DRESSING)
//(So if you say DISPATCH then we can do something like ADD CHOCHOLATE POWDER, or ADD CHOCHOLATE DRESSING)
//(So these are the verbs of doing something to the state. Do something to our cake , from which than later on we'll be able to select those pieces we've done something to) 