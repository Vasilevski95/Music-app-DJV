import { useDispatch, useSelector } from 'react-redux'

import {Error, Loader, SongCard} from '../components'
import {genres} from '../assets/constants'
import { selectGenreListId } from '../redux/features/playerSlice'

import { useGetSongsByGenreQuery } from '../redux/services/shazamCore'

const Discover = () => {

    const dispatch = useDispatch()
    //To make the song play, we need to call dispatch

    const { activeSong, isPlaying, genreListId } = useSelector ((state) => state.player)
    //(Global*)
    //This is how redux works. You have one huge global state. You can think of this as a cake, and that cake can have different slices. So you are wondering, which piece of the cake you want to select? Do you like more chocolate, or vanilla? And to select the slice we use useSelector function.
    //As the first parameter to this callback function you get access to entire cake, now you know what you wanna get, and you know your cake has it so you say CAKE.VANILLA, that's what i want to pull out from this state. *Of course this is simplified language to explain better, but we use redux naming*.
    //So we get state, and state.player (we are pulling player information from entire state), and in curly bracers we type what specifically wanna get {activeSong, isPlaying}
    //How do we know our state has these? If we go to redux, then features, than playerSlice, we see the initial state and all the variables that state eventually have
    //We pass them over to the <SongCard />

    const {data, isFetching, error} = useGetSongsByGenreQuery(genreListId || 'POP')
    //We pass in the genreListId or 'POP', because pop is the first one
    //We call it as a hook, we get back 3 different things, the actual data (the result of the api call), isFetching - That will allow us to know if we are currently fetching, therefore we can show the loading state, and we get the error - That will allow us to know if an error has happened
    //So on top of allowing you to easily create an endpoints, we also get additional functionalities that we can use inside our components, and we dont have to clutter component view, to focus on fetching logic, all of the logic is contained in shazamCore
    
    
    //ADDITION*
    //console.log(data)
    //Since we use rapidApi extension, we know that we get array of different songs
    
    if(isFetching) return <Loader title='Loading songs...'/>
    //We add checks and loading states. If isFetching, in that case we return Loader component and we also pass a title on that loader.
    if(error) return <Error />
    
    const genreTitle = genres.find(({value}) => value === genreListId)?.title
    //We do this because we want to show which genre we are discovering
    //We use .find, after that destructure the value, and then we can check if the value is equal to the genreListId, and we get the title once we find the one that matches

    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center flex-col mt-4 mb-10 sm:flex-row'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
                <select
                //Usual elements for every input
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    //We are doing what is explained on bottom of the code
                    //So the select has the event, and we can dispatch an action called selectGenreListId (and this is coming from the playerSlice). We pass the event.target.value
                    value={genreListId || 'pop'}
                    //genreListId is coming from the state 
                    className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                    
                >
                {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                {/* We want to get a specific genre information, and for each genre we want to return option, inside that option we want to render genre titles, and since we are mapping, every option must have a key, and we give it actual value */}
                </select>
            </div>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song, i) => (
                    <SongCard 
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    i={i}
                    />
                ))}
                
                {/* We map over data (use questionmark ? in case the data doesen't exist yet), for each song we return SongCard component, we pass unique key, we pass actual song, and index of the specific song and we put it as a second parameter on our map function */}
            </div>
        </div>
    );
}

export default Discover;


//We use select when we want to select a piece of state
//We use dispatch when we want to modify the state
//For example in this case*:  dispatch -> dispatches an action to the store -> genres (we want to get this specific genre)
//                            selector -> stated (With the selector we'll be able to fetch that modified state)
