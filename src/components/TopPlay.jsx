import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          {/* We type dynamic strings because every song has its unique key */}
          <p className="text-xl font-bold text-white">{song?.title}</p>
          {/* In this paragraph we render song title */}
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          {/* We type dynamic strings because every song has its unique key */}
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
          {/* In this paragraph we render song subtitle */}
        </Link>
      </div>
    </div>
    {/* This is a wrapper for the rest */}
    <PlayPause 
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);
//Insted of curly bracers after arrow function, we have instant return
//Inside this Component we render song title, and we pass through the props song and index

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  //We get the state and we choose the specific piece of state, in this case a player
  const { data } = useGetTopChartsQuery();
  //We get the data which is equal to useGetTopChartsQuery()
  const divRef = useRef(null);
  //We create divRef, we use this to scroll at the top of the page

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  //To make divRef work you need useEffect, it wont have dependency array, so it will only happend at the start.
  //We use it for page to scrrol automatically on top of the page

  const topPlays = data?.slice(0, 5);
  //These are gonna be the top songs, and we wanna get the first five songs

  const handlePauseClick = () => {
    dispatch(playPause(false));
    //The only we want to do if we wanna handle pause is set playPause to false
  };

  const handlePlayClick = (song, i) => {
    //Song is coming as a parameter to handlePlayClick and the index is also passed, we are calling it in the topPlays.map
    dispatch(setActiveSong({ song, data, i }));
    //We setActiveSong and then to that we want to pass an object including song we wanna play, the data for all the songs, and the index of that song
    dispatch(playPause(true));
    //We also wanna triger the playPause to true as we are right now playing
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      {/* We use this to make our scrollbar go to the top */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
            {/* When we click on see more we want to go to top charts */}
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard 
              key={song.key} 
              song={song} 
              i={i} 
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
              //We have to call it as a callback function, and we have to provide a song as well as the index. So once we click on a specific song, we wanna know which song we want to play
              />
            //Inside of TopChartCard we pass song and index, and since we are mapping over this also must pass a key {song.key}, after this we get 5 top charts
          ))}
          {/* Inside this div we want to map over our top songs, we get each individual song, and index, and we want to return a <TopChartCard /> */}
        </div>
      </div>
      <div>
        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
              {/* When we click on see more we want to go to top artists */}
            </Link>
          </div>
          <Swiper
            slidesPerView="auto"
            //Number of slides per view (slides visible at the same time on slider's container).
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
            //Hover on them to see what they are doing
          >
            {topPlays?.map((song, i) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  {/* That link points to=, we pass a dynamic template string of artist and then we wanna get the song, and the first artist (adamid is some sort of an id) */}
                  <img
                    src={song?.images.background}
                    alt="name"
                    //We render artist image
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
              //For each song we wanna render swiper slide
            ))}
            {/* We have to loop over our top plays */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopPlay;


//(GLOBAL EXPLANATION)
//This is the beauty of the redux, one single state is shared across three completely different pieces of our UI, the discover page, the top charts widget, and the music player component.