import {loader} from '../assets'

const Loader = ({title}) => (
  //We accept title as a prop
  <div className='w-full flex justify-center items-center flex-col'>
    <img src={loader} alt="loader" className='w-32 h-32 object-contain'/>
    <h1 className='font-bold text-2xl text-white mt-2'>{title || "Loading..."}</h1>
    {/* This h1 renders either the title or if the title doesen't excist Loading... */}
  </div>
);

export default Loader;
