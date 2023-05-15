import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { Box, Typography } from "@mui/material";
import { getAllMovie } from "../../Api-helpers/api-helpers";
const Movies = () => {
  const [Movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovie()
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log("no data found"));
  }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        variant='h4'
        padding={2}
        textAlign="center"
        width="40%"
        bgcolor={"#900C3F"}
        margin={"auto"}
        color={"white"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin={"auto"}
        marginTop="5"
        display="flex"
        justifyContent="flex-start"
        flexWrap={'wrap'}
      >
        {Movies.map((item, index) => 
          <MovieItem
            id={item._id}
            title={item.title}
            posterUrl={item.posterUrl}
            releaseDate={item.releaseDate}
            key={index}
          />
        )}
      </Box>
    </Box>
  );
};

export default Movies;
