import {Box, Grid, Image, Text, VStack, Spinner, Center, Flex} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d2ffc44dee69cf0b426d3e6202d85a5d";  // 여기에 TMDb API 키를 입력하세요

export function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
          page: 1,
        },
      });
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={8} bg="gray.900" color="white" minH="100vh">
      <VStack spacing={8}>
        <Text fontSize="3xl" fontWeight="bold">인기 영화</Text>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {movies.map((movie) => (
            <Box
              key={movie.id}
              bg="gray.800"
              borderRadius="md"
              overflow="hidden"
              cursor="pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <Box p={4}>
                <Text fontSize="xl" fontWeight="bold">{movie.title}</Text>
                <Text>{movie.release_date}</Text>
                <Flex align="center">
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <Text fontSize="lg" ml={2}>{movie.vote_average} / 10</Text>
                </Flex>
              </Box>
            </Box>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
}
