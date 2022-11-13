import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {

  const artist = artistData?.artists[artistId].attributes;

  return (
    //It's gonna accept props, artistId in case if we are on artist detail page, artist data, or song data if we are on song data page
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
        <div className="absolute inset-0 flex items-center">
          <img
            alt="art"
            src={
              artistId
                ? artist.artwork?.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : songData?.images?.coverart
            }
            //Source is dynamic. In case we have artist id, we want to render the artistData?.artists and then we want to dive into the specific artist by saying [artistId], and then dive into its attributes and then dive into its artwork and then finally get the url of that artwork
            //That url have some properties such as height and width of the image. Because API return a dynamic image, and we can change numbers to provide a specific height and width
            //In case we dont have the artist id, we render songData?.images?.coverart
            //We have repetitive lines, so we call this function artist 
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">{artistId ? artist.name : songData?.title}</p>
            {/* If we do have artistId in that case we want to go into artistData, we wanna top into that specific artist, and then we wanna go into attributes and get the name */}
            {/* And if we dont have artistId we want to have song title */}
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
                <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
              </Link>
            )}
            {/* If no artistId (meaning we want to render something that is not on song details page) render this link*/}
            <p className="text-base text-gray-400 mt-2">
              {artistId ? artist?.genreNames[0] 
              : songData?.genres?.primary}
              {/* We also want to check if the artistId is there, if it does exist, then we want to get the artist, which is our variable we got at the top, and then want to see which genres that artist plays */}
              {/* Else we want the songData?.genres?.primary */}
              {/* WE USE ?. BECAUSE WE WANT TO BE SURE THAT DATA EXIST, IN CASE IT DOESENT JAVASCRIPT WILL GIVE US AN ERROR, BUT IF WE PUT ? IT WILL GIVE US UNDEFINED WHICH IS BETTER THAN ERROR */}
            </p>
          </div>
        </div>
        <div className="w-full sm:h-44 h-24"/>
      </div>
    
  );
};

export default DetailsHeader;
