import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {

  const {searchTerm} = useParams()
  //We have to get the searchTerm from the url 

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  //We pass searchTerm as the one and only parameter

  const songs = data?.tracks?.hits?.map((song) => song.track)
  //We use this as the list of our songs 


  if (isFetching)
    return <Loader title="Loading top charts..." />;
  //Based on the info we received, we can say if isFetching and  we return Loader

  if (error) return <Error />;
  //If there is an error  in that case we want to return Error

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Showing results for <span className="font-black">{searchTerm}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
        {/* We get the data, and we map song and index, and for each song we return a SongCard component */}
      </div>
    </div>
  );
};
export default Search;
