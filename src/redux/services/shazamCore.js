import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
//We have to import two utility functions coming from redux toolkit


//fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
    //.then(response => response.json())
    //.then(response => console.log(response))
    //.catch(err => console.error(err));

    //We fetch this from rapid API, this code generated by rapidApi is usefull for fetching base query (after we fetch, we don't need them)

    export const shazamCoreApi = createApi ({
        reducerPath: 'shazamCoreApi',
        //Api need a reducerPath, and we give it a name of our API (we call it how we like)
        //We need to import this to store.js
        baseQuery: fetchBaseQuery({
            //baseQuery is a function call to fetchBaseQuery to which we're gonna provide an object, inside that object we're gonna have a baseUrl, and that baseUrl is simlply going to be a string ('') 
            baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
            //We copy link from generated code of rapidApi up until v1, that our base query,  which is always the same, and we add different endpoints
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', '61d6550440msh21576a8d3cfe90cp131c24jsn6619e15c54ae')
                //This is a callback arrow function, its going to prepare headers for us before each and every api call, so we won't have to provide options every time
                return headers
                //We have to return headers, after we set the specific property (headers)
            },

        }),

        endpoints: (builder) => ({
            //We add another property called endpoints, there as the first parameter we pass builder and we pass in an object
            getTopCharts: builder.query ({query: () => '/charts/world'}),
            //To get top charts we call builder.query and provide object - query: '/charts/world'
            getSongsByGenre: builder.query ({query: (genre) => `/charts/genre-world?genre_code=${genre}`}),
            getSongDetails: builder.query ({query: ({songid}) => `/tracks/details?track_id=${songid}` }),
            //To get songDetails we call builder.query we pass in the actual query, and that query is a callback function, in this case we will accept a parameter, which is going to be a {songid} (we want to destructure songid)
            //And finally we want to go to  `/tracks/details?track_id=${songid}`, its dynamic because songid is unique
            getSongRelated: builder.query({query: ({songid}) => `/tracks/related?track_id=${songid}`}),
            //This way we call related songs
            getArtistDetails: builder.query({query: (artistId) => `/artists/details?artist_id=${artistId}`}),
            //We don't need to destructure it as we did with the songid, as we are going to pass it automatically
            getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
        }),
        //And now redux toolkit allows us to call this as a hook, the only thing left to do is to export this function
    });
    
    export const {
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
}  = shazamCoreApi
//It takes the name getTopCharts, adds the use in front, and then query in the back and that is equal to shazamCoreApi, after that we pass it to discover component
//After useGetTopChartsQuery, redux toolkit generates a new query useGetSongDetailsQuery, and we can use that in our song details