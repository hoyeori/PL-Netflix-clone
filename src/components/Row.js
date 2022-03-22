import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import "./Row.css";
import MovieModal from './MovieModal/MovieModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle"
import { Navigation } from 'swiper';


const Row = ({ title, id, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setmovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async () => {

        const request = await axios.get(fetchUrl);
        console.log('request', request);
        setMovies(request.data.results);
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setmovieSelected(movie);
    }

    return (
        <section className="row">
            { /** TITLE */} <h2>{title}</h2>
            <Swiper
                className="slider"
                modules={[Navigation]}
                navigation={{
                    prevEl: '.slider__arrow-left',
                    nextEl: '.slider__arrow-right',
                }}
                slidesPerView="7">
                <div className="slider__arrow-left">
                    <span className="arrow">{"<"}</span>
                </div>
                <div id={id} className="row__posters">
                    {/**SEVERAL ROW_POSTER */}
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <img
                                className={`row__poster ${isLargeRow && "row__posterLarge"} `}
                                src={`http://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path} `} loading="lazy" alt={movie.name}
                                onClick={() => handleClick(movie)}
                            />
                        </SwiperSlide>

                    ))}
                </div>
                <div className="slider__arrow-right">
                    <span className="arrow">{">"} </span>
                </div>
            </Swiper>
            {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
        </section>

    )
}

export default Row