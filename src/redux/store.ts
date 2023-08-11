import { searchMovieSlice } from './movies/searchMovieSlice';
import { movieSlice } from './movies/movieSlice';
import { appLoadingSlice } from './Loading/appLoadingSlice';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
  reducer: {
    loading: appLoadingSlice.reducer,
    movies: movieSlice.reducer,
    searchMovies : searchMovieSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { loading: LoadingState, movies: MoviesState }
export type AppDispatch = typeof store.dispatch;
