export type moviesStateType =
    {
        movies: movieType[];
        page : number;
        total_pages : number;
        total_results : number;
        loading: Status;
        error: string | null;
    }


export type movieType = {
    id: number,
    original_title : string,
    adult : boolean,
    backdrop_path : string,
    genre_ids : number[],
    original_language : string,
    over_view : string,
    popularity : number,
    poster_path : string,
    release_date : string,
    title : string,
    video : boolean,
    vote_average : number,
    vote_count : number
}

export type fetchParams = {
    method: string;
    url: string;
    params?: {
        language?: string;
        page?: number;
        query?: string,

    };
}

export type Status = 'idle' | 'loading' | 'loadMore' | 'failed' | 'succeeded' | 'fetching' 
