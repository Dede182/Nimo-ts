import { fetchParams } from '../redux/movies/movietypes';
import { ApiRequest } from './ApiRequest';

interface GetObj {
    (url: string): fetchParams
}
const getObj: GetObj = (url:string) => {
    return {
      method: "get",
      url: url,
      params: {
        language: "en-US",
      },
    };
};

export const fetchMovieInfo  = async (url: string) => {
    try {
        const obj = getObj(url);
        const response = await ApiRequest(obj);
        return response!;

    }
    catch (e) {
        if (e instanceof Error) {
            //return some thing
            return e;
        }
    }
}

export const fetchMovieDetail = async (id: string | undefined) => {
        const ID = Number(id)
        const url = `movie/${ID}`;   
        const response = await fetchMovieInfo(url);
        return response!;
}

export const fetchCredit = async (id: string | undefined) => {
        const ID = Number(id)
        const url = `movie/${ID}/credits`;
        const response = await fetchMovieInfo(url);
        return response!;
}

export const fetchRelatedMovies = async (id: string | undefined) => {
        const ID = Number(id)
        const url = `movie/${ID}/recommendations`;
        const response = await fetchMovieInfo(url);
        return response!;
}

