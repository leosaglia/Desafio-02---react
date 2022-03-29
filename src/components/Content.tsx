import { useEffect, useState } from 'react';
import { MovieCard } from "./MovieCard"
import { Header } from "./Header"
import { api } from '../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type ContentProps = {
  selectedGenreId: number,
  selectedGenre: {
    title: string
  }
}

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [props.selectedGenreId])

  return (
    <div className="container">
        <Header title={props.selectedGenre.title}/>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  );
}