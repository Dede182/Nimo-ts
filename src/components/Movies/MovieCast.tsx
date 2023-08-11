import React from 'react'
import { Casts } from '../../redux/movies/movietypes'


type Props = {
    cast : Casts
}

const MovieCast = ({cast} : Props )=> {
  return (
    <div className="w-[140px]">
    <div className="w-full h-[175px]">
      <img
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${cast.profile_path}`}
        className="w-full h-full object-cover"
        alt=""
      />
    </div>
    <div className="">
      <p className="text-[#fff] font-bold pt-1">
        {cast.original_name }
      </p>
      <p className="text-[#fff] text-[12px]">
        {cast.character }
      </p>
    </div>
  </div>
  )
}
const SameCast = ({cast : prevProps} : Props , {cast : nextProps} : Props) => {
    return Object.keys(prevProps).every((key) => {
        return prevProps[key as keyof Casts] === nextProps[key as keyof Casts]
    })
}

const MemorizedMovieCast = React.memo(MovieCast,SameCast)

export default MemorizedMovieCast