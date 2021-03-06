import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import useDebounce from '../../hooks/useDebounce';
import './SearchPage.css'

const SearchPage = () => {

    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q")
    const debounceSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debounceSearchTerm) {
            fetchSearchMovie(debounceSearchTerm);
        }

    }, [debounceSearchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const requests = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            )
            setSearchResults(requests.data.results);
        } catch (error) {
            console.log("error", error);
        }

    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== 'person') {
                        const movieImageUrl = "http://image.tmdb.org/t/p/w500" + movie.backdrop_path
                        return (
                            <div className='movie' key={movie.id}>
                                <div className='movie__colum-poster' onClick={() => navigate(`/${movie.id}`)}>
                                    <img
                                        src={movieImageUrl} alt='movie image' className='movie__poster'
                                    />

                                </div>

                            </div>
                        )
                    }
                })}

            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>??????????????? ????????? "{debounceSearchTerm}" ??? ?????? ????????? ????????????.</p>
                </div>
            </section>
        );
    }


    return renderSearchResults();

}

export default SearchPage