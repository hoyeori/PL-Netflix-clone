import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

const DetailPage = () => {

    const { movieId } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`/movie/${movieId}`);
            setMovie(request.data);
        }
        fetchData();
    }, [movieId]);

    if (!movie) return <div>...loading</div>;

    console.log(movie);

    return (
        <section>
            <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt="poster"
                className="modal__poster-img"
            />
        </section>
    )
}

export default DetailPage

