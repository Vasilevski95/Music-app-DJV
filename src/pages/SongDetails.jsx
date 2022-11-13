import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";


const SongDetails = () => {
  const dispatch = useDispatch();
  //We initialize our dispatch

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  //We pull the data from the state. We get the state and specifically pinpoint state.player

  const { songid } = useParams();
  //useParams gives us access to this song id we have in url bar

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  //We call useGetSongDetailsQuery it as a hook, we rename data to songData, and we rename isFetching to isFetchingSongDetails.
  //We have to pass in songid as an object or as an parameter. If we pass it like an object ({songid}), if as a parameter (songid), but if we pass it as a parameter we also must remove object {} from shazamCore as well. Both are usable

    const {data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid})
    //We want to get data, we rename isFetching to isFetchingRelatedSong, and we get error, and in useGetSongRelatedQuery in there we pass the songid inside of an object
    //Now that we have all of the isFetching properties and all of the data we can create loading and error handles

    const handlePauseClick = () => {
        dispatch(playPause(false))
        //The only we want to do if we wanna handle pause is set playPause to false
      }
      
      const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }))
        dispatch(playPause(true))
        //In addition to previous calls, we need to get the song and index as the first two parameters
      }


//Now we have all of the states we can pass to our RelatedSongs component

    if(isFetchingSongDetails || isFetchingRelatedSongs) return 
    <Loader title='Searching song details'/>

    if (error) return <Error />

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId='' songData={songData}/>
      {/* We pass two different props to it. Now, where are we gonna get that information? */}
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? 
            songData?.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            )) : 
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          }
          {/*To get songData that contain lyrics and other data, we open a new dynamic block of code {} in there, songData, we want to get first section and then we want to check if type of that section is equal to "LYRICS", in that case if it is we want to map over them and we want to show <p></p> a {line}, and than if we don't have it, simply say Sorry no lyrics found */}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        //We pass the props in this component 
      />
    </div>
  );
};

export default SongDetails;
