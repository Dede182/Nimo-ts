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
function fetchResponse (url : string){
    return new Promise((resolve) => {
        resolve(fetchMovieInfo(url));
});
}
export const fetchMovieDetail = async (id: string | undefined) => {
        const ID = Number(id)
        const url = `movie/${ID}`;   
        const response = await fetchResponse(url)
        return response!;
}

export const fetchCredit = async (id: string | undefined) => {
        const ID = Number(id)
        const url = `movie/${ID}/credits`;
        const response =  await fetchResponse(url)
        return response!;
}

export const fetchRelatedMovies = async (id: string | undefined) => {
        const ID = Number(id)
        const url = `movie/${ID}/recommendations`;
        const response =  await fetchResponse(url)
        // throw response!; //uncomment if want to test error
        return response
}

export const fetchMovieDetailApi = async (id : string | undefined)=>{
    //use Promise.allSettled to fetch all data at once and get the promise status and value 
    //don't use Promise.all because if one of the promise rejected it will stop the rest of the promise
    //updated 11/8/2023
    const [movieDetail, credit, relatedMovies] = await Promise.allSettled([
        fetchMovieDetail(id),
        fetchCredit(id),
        fetchRelatedMovies(id)
    ])

    console.log(movieDetail, credit, relatedMovies)
  
    return {movieDetail, credit, relatedMovies}
}

