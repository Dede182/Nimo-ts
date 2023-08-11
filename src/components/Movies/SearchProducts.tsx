
import { useAppSelector } from "../../redux/hooks";
import { searchMoviesState } from "../../redux/movies/searchMovieSlice";
import MemorizedMovieCard from "./MovieCard";
import MemorizedNavigations from "../Navigation";
import AppLoading from "../AppLoader";

const SearchProducts = () => {

  const moviesState = useAppSelector(searchMoviesState);
    const movies = moviesState.movies;
    const searchName = moviesState.searchName;
    const state = moviesState.loading;
  // };
  return (
    <MemorizedNavigations>
      {state == 'fetching' ? (
        <AppLoading />
      ) : (
        <div className="pt-[90px] px-3 sm:px-[40px]">
          <p className="text-[#fff] text-2xl font-bold mb-4">
            Search Results for "{searchName}"
          </p>
          {movies.length > 0 ? (
            <div className=" w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 extra:!grid-cols-12 gap-x-4 gap-y-4 ">
              {movies?.map((movie, index) => (
                <MemorizedMovieCard movie={movie} key={index} />
              ))}
            </div>
          ) : (
            <div className="w-full text-center text-[#fff] text-[20px] font-bold">
              No Movies
            </div>
          )}
        </div>
      )}
    </MemorizedNavigations>
  );
};

export default SearchProducts;
