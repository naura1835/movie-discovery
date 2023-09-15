import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SideBar from "../../components/sidebar/sidebar.component";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";

import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

import list from "../../assets/List.svg";
import star from "../../assets/Star.svg";
import tickets from "../../assets/TwoTickets.svg";

import "./details.styles.scss";

const DetailsPage = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TOKEN,
        },
      };

      fetch(url, options)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error(res.status);
        })
        .then((data) => {
          setLoading(false);
          setDetails(data);
        })
        .catch((err) => {
          if (err instanceof TypeError) {
            notify("Failed to fetch");
          }
          if (err instanceof SyntaxError) {
            notify("There was a syntax error");
          }
          if (err.message == 404) {
            notify("Movie not found");
          }
        });
    };

    fetchDetails();
  }, [movieId]);

  const notify = (message) => toast.error(message);

  // `http://api.themoviedb.org/3/movie/${
  //           details.id
  //         }/videos?api_key=${import.meta.env.VITE_API_KEY}`

  return (
    <section className="details">
      <SideBar />
      {/* <p>{errorMessage}</p> */}
      <ToastContainer />
      <article className="details__movie-info">
        {loading && (
          <Skeleton
            rectangle
            height="100%"
            width="100%"
            containerClassName="skeleton__img"
          />
        )}
        <img
          src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`}
          alt={details.title}
          className="details__movie-info__img"
          style={{ display: loading ? "none" : undefined }}
        />
        <div className="details__movie-info__wrapper">
          <ul className="details__movie-info__header">
            <li
              data-testid="movie-title"
              className="details__movie-info__header__item"
            >
              {loading ? <Skeleton width="100px" /> : details.title}
            </li>
            <li
              data-testid="movie-release-date"
              className="details__movie-info__header__item"
            >
              {loading ? <Skeleton width="100px" /> : details.release_date}
            </li>
            <li className="details__movie-info__header__item">
              {loading ? (
                <Skeleton width="100px" />
              ) : (
                <span data-testid="movie-runtime">{details.runtime}</span>
              )}
              {loading == false && "m"}
            </li>
            <li style={{ display: "flex", flexWrap: "wrap" }}>
              <SkeletonTheme
                baseColor="#e65757"
                highlightColor="#f8e7eb"
                borderRadius="0.5rem"
                duration={4}
              >
                {details?.genres?.map((item) => (
                  <Fragment key={item.id}>
                    {loading ? (
                      <Skeleton width="100px" />
                    ) : (
                      <div className="genre-chip">{item.name}</div>
                    )}
                  </Fragment>
                ))}
              </SkeletonTheme>
            </li>
          </ul>
          <p
            data-testid="movie-overtime"
            className="details__movie-info__overview"
            style={{ lineHeight: loading ? 1.5 : "auto" }}
          >
            {loading ? <Skeleton count={3} /> : details.overview}
          </p>
        </div>
        <div className="details__movie-info__others">
          {loading ? (
            <Skeleton width="200px" />
          ) : (
            <div className="details__movie-info__others__rating">
              User Rating
              <img src={star} alt="star" />
              <span className="vote--average">
                {details.vote_average?.toFixed(1)}
              </span>
              <span className="vote--count"> | {details.vote_count}k</span>
            </div>
          )}
          {loading ? (
            <Skeleton
              width="300px"
              height="3.4375rem"
              containerClassName="btn"
            />
          ) : (
            <button className="showtime">
              <img src={tickets} alt="tickets" />
              See show times
            </button>
          )}
          {loading ? (
            <Skeleton
              width="300px"
              height="3.4375rem"
              containerClassName="btn"
            />
          ) : (
            <button className="watch-options">
              <img src={list} alt="list" />
              More watch options
            </button>
          )}
        </div>
      </article>
    </section>
  );
};

export default DetailsPage;
