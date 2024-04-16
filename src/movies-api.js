import axios from "axios";

const options = {
  include_adult: false,
  params: { language: "en-US" },
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzEyNmViYWRiMDFiYjg2OTNkOTc0MTdlOGU2YWIyYyIsInN1YiI6IjY2MTYwNWY4MTA5ZGVjMDE2MjlkNDcwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V2ArL8O8_RwiicrUSYrJ5KFQWs66-6-j8LblH4ucyBI",
  },
};

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const getMovies = async (page) => {
  const response = await axios.get(`trending/movie/day?page=${page}`, options);

  return response.data;
};

export const searchMovies = async (search, page) => {
  const response = await axios.get(
    `/search/movie?page=${page}&query=${search}`,
    options
  );

  return response.data;
};

export const movieDetails = async (id) => {
  const response = await axios.get(`movie/${id}`, options);

  return response.data;
};

export const cast = async (id) => {
  const response = await axios.get(`movie/${id}/credits`, options);

  return response.data;
};

export const reviews = async (id) => {
  const respons = await axios.get(`movie/${id}/reviews`, options);

  return respons.data;
};
