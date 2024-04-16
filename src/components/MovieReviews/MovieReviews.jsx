import { useEffect, useState } from "react";
import { reviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [moviesReviews, setmoviesReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const heandleReviews = async () => {
      try {
        const data = await reviews(movieId);
        setmoviesReviews(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    heandleReviews();
  }, [movieId]);
  return (
    <div className={css.container}>
      {moviesReviews.length > 0 ? (
        <ul>
          {moviesReviews &&
            moviesReviews.map(
              ({
                content,
                author_details: { username, avatar_path, rating },
                id,
              }) => {
                return (
                  <li className={css.list} key={id}>
                    <div className={css.boxText}>
                      {" "}
                      <h3>{username}</h3>
                      <p>rating: {rating}</p>
                    </div>
                    <p>{content}</p>
                    {avatar_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${avatar_path}`}
                        alt="user avatar"
                      />
                    )}
                  </li>
                );
              }
            )}
        </ul>
      ) : (
        <h3>There are no reviews</h3>
      )}
    </div>
  );
};

export default MovieReviews;
