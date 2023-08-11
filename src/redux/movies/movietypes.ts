export type moviesStateType =
    {
        movies: movieType[];
        page: number;
        total_pages: number;
        total_results: number;
        loading: Status;
        error: string | null;
    }


export type movieType = {
    id: number,
    original_title: string,
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    original_language: string,
    over_view: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
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


export type MovieDetailType = {
    runtime: number,
    vote_average: number,
    genres: Array<{
        id: number,
        name: string
    }>,
    poster_path: string,
    title: string,
    overview: string,
    release_date: string,
    tagline: string,
    backdrop_path: string,
    id: number,
    vote_count: number,
    status: string,
    budget: number,
    revenue: number,
    original_language: string,
    original_title: string,
    popularity: number,
    video: boolean,
    adult: boolean,
    homepage: string,
    imdb_id: string,
    production_companies: Array<
        {
            id: number,
            logo_path: string,
            name: string
        }
        >,
    production_countries: Array<string>,
    spoken_languages: Array<string>,
    belongs_to_collection: string,
    videos: Array<string>,

}

export type RelatedMovieType = {
    results: Array<movieType>,
    data?: unknown
}

export type Casts = {
    name: string,
    profile_path: string,
    character: string,
    original_name: string,
}

export type MovieCastType =
    {
        cast: Casts[] | Casts,
    }