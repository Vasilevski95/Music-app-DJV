import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";



import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";


const ArtistDetails = () => {
  

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  //We pull the data from the state. We get the state and specifically pinpoint state.player

  const { id:artistId } = useParams();
  //useParams gives us access to this song id we have in url bar

  const { data: artistData, isFetching: isFetchingArtistDetails, error } =
    useGetArtistDetailsQuery( artistId );
  //We call useGetArtistDetailsQuery it as a hook, we rename data to songData, and we rename isFetching to isFetchingSongDetails.
  //We have to pass in songid as an object or as an parameter. If we pass it like an object ({songid}), if as a parameter (songid), but if we pass it as a parameter we also must remove object {} from shazamCore as well. Both are usable


//Now we have all of the states we can pass to our RelatedSongs component

    if(isFetchingArtistDetails) return 
    <Loader title='Loading artist details'/>

    if (error) return <Error />

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData}/>
      {/* We pass two different props to it. Now, where are we gonna get that information? */}
    
      <RelatedSongs
        data={Object.values(artistData?.songs)}
        //We simply want to format our songs in a proper way, so that we can the render songs from that specific artist
        artistId={artistId}
        //We pass artistId, now that we have it
        isPlaying={isPlaying}
        activeSong={activeSong}
        
        //We pass the props in this component 
      />
    </div>
  );
};

export default ArtistDetails;
