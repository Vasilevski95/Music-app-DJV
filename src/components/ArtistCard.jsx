import { useNavigate } from "react-router-dom";

const ArtistCard = ({track}) => {
  const navigate = useNavigate(track)
  //This is a react-router-dom hook that allows us to move to different pages

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
    {/* On this div you have to give an onClick property, when you click on artist it leads to that artist page */}
      <img alt="artist" src={track?.images?.coverart} className="w-full h-56 rounded-lg"/>
      <p className="mt-4 font-semibold text-lg text-white truncate">{track?.subtitle}</p>
    </div>
  )
};

export default ArtistCard;
