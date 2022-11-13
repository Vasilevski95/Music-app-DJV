import SongBar from './SongBar'

const RelatedSongs = ({data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId}) => (

<div className='flex flex-col'>
  <h1 className='font-bold text-3xl text-white'>Related Songs</h1>
  <div className='mt-6 w-full flex flex-col'>
    {data?.map((song, i) =>(
      <SongBar 
        key={`${song.key}-${artistId}`}
        song={song}
        i={i}
        artistId={artistId}
        isPlaying={isPlaying}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    //We map over the data, and we return the <SongBar /> component for each song, later on if we go to specific artist, we're gonna also have a related songs for that artist, and that means the data is not gonna be just a song, sometimes its gonna be about artists
    //So sometimes we're not gonna have a song.key, what we can do is either provide a song.key or provide the artistId
    ))}
  </div>
</div>
);

export default RelatedSongs;
