import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link , } from 'react-router-dom'
import { getAllMovie } from '../Api-helpers/api-helpers'

const Homepage = () => {
  const [movies, setmovies]=useState([])
  useEffect(() => {
   getAllMovie()
    .then((data)=>setmovies(data.movies))
    .catch((error) =>console.log(error))
  }, [])
  console.log(movies)
  return (
   <Box width={"100%"} height={'100%'} margin={"auto"} marginTop={2}>
        <Box margin={'auto'} width='70%' height={"40vh"} padding={2}>
          <img src='https://i.ytimg.com/vi/flXhA8DOi84/maxresdefault.jpg' alt=''
            width={'100%'}
            height={'100%'}
          />
        </Box>
        <Box padding={5} margin="auto">
          <Typography variant="h4" textAlign={"center"}>
            Latest Realease
           </Typography>
           
           <Box display={"flex"} width="80%" margin="auto" justifyContent={'center'}
           flexWrap={"wrap"}>
              {movies && movies.slice(0,4).map((item , index)=>
              <MovieItem id={item.id}
              title={item.title}
              posterUrl={item.posterUrl}
              releaseDate={item.releaseDate}
               key={index}/>
               )}
           </Box>
           <Box display="flex" padding={5} margin="auto">
           <Button LinkComponent={ Link } to="/movies" variant='outlined' sx={{margin:'auto', color:'#2b2d32'} }>
                View All Movies
           </Button>
          

           </Box>
       </Box>
   </Box>
  )
}

export default Homepage