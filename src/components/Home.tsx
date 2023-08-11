import {  useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { changeLoading, fetchMovies, getMovieState } from '../redux/movies/movieSlice';
import MemorizedMovieCard from './Movies/MovieCard';
import MemorizedNavigations from './Navigation';
import AppLoading from './AppLoader';
import InfiniteScroll from "react-infinite-scroll-component";
import { BeatLoader } from 'react-spinners';


const Home = () => {
    const dispatch = useAppDispatch();
    const moviesState = useAppSelector(getMovieState)
    const [page, setPage] = useState<number>(1)
    const [lastPage, setLastPage] = useState<number >(0)
    const movies = useMemo(() => 
    moviesState.movies
    , [moviesState.movies])
    const getData = useCallback((page: number) :void => {
        if (moviesState.loading === 'idle' || moviesState.loading === 'loadMore') {
            dispatch(fetchMovies(page))
        }
        if (moviesState.loading === 'succeeded') {
            setLastPage(moviesState.total_pages)

        }

    }, [dispatch, moviesState.loading, moviesState.total_pages])

    const loadMore = useCallback(() => {
      
            const pageNum = page + 1;
            if (lastPage >= pageNum) {
                dispatch(changeLoading('loadMore'))
                setPage(pageNum);
                getData(pageNum);
            } else {
                return;
            }
   
    }, [dispatch, getData, lastPage, page]);

    useEffect(() => {
        getData(page)
    }, [getData, movies, page])
    
    return (
        <MemorizedNavigations>
            {moviesState.loading === 'loading' ? <AppLoading /> : 
             <>
             <div className="pt-[90px] max-w-[1400px] mx-auto h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 extra:!grid-cols- gap-x-4 gap-y-4 px-3 sm:px-[40px]">
                 {movies.map((movie, index) => (
                     <MemorizedMovieCard movie={movie} key={index} />
                 ))}
             </div>
             <InfiniteScroll
                 dataLength={movies.length}
                 next={loadMore}
                 hasMore={true}
                 loader={lastPage >= page ? (
                     <div className="w-full text-center ">
                         <BeatLoader color="red" loading={true} size={10} />
                     </div>
                 ) : (
                     <div className="w-full text-center text-xl font-bold">End</div>
                 )} children={undefined}                    ></InfiniteScroll>
         </>}
        </MemorizedNavigations>
    )

}
export default Home