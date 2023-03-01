import React,{useState,useEffect} from 'react';
import './home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Link} from "react-router-dom";
import Movie from '../movieDetail/movie';
import MovieList from '../../components/movieList/movieList';

const Home=()=>{
    const [popularMovie,setPopularMovie]=useState([]);
    useEffect(()=>{
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=562a149748146c4f6eb59fb41bb1c25f&language=en-US")
        .then(res=>res.json())
        .then(data=>setPopularMovie(data.results))


    },[])
    console.log(popularMovie)
    return(
        <>
            <div className='poster'>
                <Carousel 
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                         popularMovie.map(movie=>(
                        <Link style={{textDecoration:"none",color:'white'}} to={`/movie/${movie.id}`}>
                        <div className='posterImage'>
                            <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}/>

                        </div>
                        <div className='posterImage_overlay'>
                            <div className='posterImage_title'>
                                {movie?movie.original_title:""}
                            </div>
                            <div className='posterImage_runtime'>
                                {movie?movie.release_date:""}
                                <span className='posterImage_rating'>
                                    {movie?movie.vote_average:""}
                                    <i className='fas fa-star'/>{' '}
                                </span>
                            </div>
                            <div className='posterImage_description'>{movie?movie.overview:""}</div>
                        </div>
                       
                            
                        
                        </Link>
                         ))
                    }
                </Carousel>
                <MovieList/>
            </div>


        </>
    )
}
export default Home