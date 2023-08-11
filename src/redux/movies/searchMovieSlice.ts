import { RootState } from './../store';
import { moviesStateType } from './movietypes';
import { ApiRequest } from './../../api/ApiRequest';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface movieSearchType extends moviesStateType {
    searchName : string
}

const moviesIntialState  : movieSearchType = {
    movies: [],
    loading: 'idle',
    page: 0,
    total_pages: 0,
    total_results: 0,
    error: null,
    searchName : ""
}

export const searchMovies = createAsyncThunk('movies/searchMovie', async (keywords : string) => {
    try {
        const obj = {
            method: "get",
            url: "search/movie",
            params: {
              query: keywords,
              language: "en-US",
              page: 1,
            },
          };  
        const response = await ApiRequest(obj);
        if(response)
        {
            return response.data;
        }
    }
    catch(e )
    {
        if(e instanceof Error)
        {
            console.log(e.message)
        }
    }
})

export const searchMovieSlice = createSlice({
    name: 'searchMovies',
    initialState: moviesIntialState,
    reducers: {
        setSearchName : (state ,action )=>{
            state.searchName = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchMovies.pending, (state) => {
            state.loading = 'fetching'
        }
        ).addCase(searchMovies.fulfilled, (state, action ) => {
            state.loading = 'idle'
            state.movies = action?.payload?.results
            state.page = action?.payload?.page
            state.total_pages = action?.payload?.total_pages
            state.total_results = action?.payload?.total_results
        })
    }
})
export const searchMoviesState = (state:RootState) => state.searchMovies
export const { setSearchName } = searchMovieSlice.actions
export default searchMovieSlice.reducer;
