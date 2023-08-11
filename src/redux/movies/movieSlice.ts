import { createAsyncThunk } from './../../../node_modules/@reduxjs/toolkit/src/createAsyncThunk';
import { ApiRequest } from './../../api/ApiRequest';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { moviesStateType, fetchParams } from './movietypes';
import { RootState } from '../store';

const initialMovies: moviesStateType = {
    movies: [],
    loading: 'idle',
    page: 0,
    total_pages: 0,
    total_results: 0,
    error: null
}

//make obj with param accept pagnum function 
const getObj = (page  = 1,url : string) : fetchParams => {
    return {
        method: "get",
        url: url,
        params: {
            language: "en-Us",
            page: page,
        },
    }
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (page : number) => {
    try {
        const obj = getObj(page,"movie/popular");
        const response = await ApiRequest(obj);
        console.log(page)
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

export type MovieActionPayloads = 
{
    page: number;
    results: [];
    total_pages: number;
    total_results: number;
};

type payLoadType = PayloadAction< unknown, string, {
    arg: number;
    requestId: string;
    requestStatus: "fulfilled";
}, never>

export const movieSlice = createSlice({
    name: 'movies',
    initialState: initialMovies,
    reducers: {
        changeLoading : (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state : moviesStateType) => {
                state.loading = 'fetching'
                
            })
            .addCase(fetchMovies.fulfilled, (state : moviesStateType, action :payLoadType )  => {
                state.loading = 'succeeded'

               const { page, results, total_pages, total_results } = action.payload as MovieActionPayloads;

                const newMovies  = results;

                state.movies = state.movies.concat(newMovies)
                state.page = page
                state.total_pages = total_pages
                state.total_results = total_results
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error.message !
            }
            )
    }
})

export const getMovieState = (state: RootState) => state.movies
export const { changeLoading } = movieSlice.actions
export default movieSlice.reducer