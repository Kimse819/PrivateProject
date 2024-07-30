import { AspectRatio, Box, Center, Flex, Heading, Image, Spinner, Text, VStack, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_KEY = 'd2ffc44dee69cf0b426d3e6202d85a5d';
const BASE_URL = 'https://api.themoviedb.org/3';

const genres = {
  action: 28,
  comedy: 35,
  drama: 18,
  horror: 27,
  scifi: 878,
};

export function CategoryPage() {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            language: 'ko-KR',
            with_genres: genres[genre],
            page: 1,
          },
        });
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [genre]);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="white" />
      </Center>
    );
  }

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={8}>
      <Heading as="h1" size="xl" mb={6} textTransform="capitalize">
        {genre} 영화
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {movies.map((movie) => (
          <Box
            key={movie.id}
            p={4}
            bg="gray.800"
            borderRadius="md"
            boxShadow="lg"
            cursor="pointer"
            onClick={() => navigate(`/movie/${movie.id}`)}
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <AspectRatio ratio={2 / 3}>
              <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} objectFit="cover" borderRadius="md" />
            </AspectRatio>
            <Box mt={2} textAlign="center">
              <Heading as="h3" size="md" color="white">
                {movie.title}
              </Heading>
              <Flex justifyContent="center" alignItems="center">
                <FontAwesomeIcon icon={faStar} color="gold" />
                <Text ml={1}>{movie.vote_average}</Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default CategoryPage;
