import { Box, Image, Text, VStack, Spinner, Center, Heading, HStack, Flex, Divider, SimpleGrid } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d2ffc44dee69cf0b426d3e6202d85a5d";

export function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        },
      });
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.900" color="white">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!movie) {
    return (
      <Center minH="100vh" bg="gray.900" color="white">
        <Text>영화 정보를 가져오지 못했습니다.</Text>
      </Center>
    );
  }

  return (
    <Box p={8} bg="gray.900" color="white" minH="100vh">
      <VStack spacing={8} align="start">
        <HStack spacing={8} align="start" w="full">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            borderRadius="md"
            boxShadow="lg"
            maxW="sm"
          />
          <VStack align="start" spacing={4} maxW="lg">
            <Heading as="h1" size="2xl">{movie.title}</Heading>
            <Text fontSize="lg"><strong>개봉일:</strong> {movie.release_date}</Text>
            <Flex align="center">
              <FontAwesomeIcon icon={faStar} color="gold" />
              <Text fontSize="lg" ml={2}>{movie.vote_average} / 10</Text>
            </Flex>
            <Text fontSize="md">{movie.overview}</Text>
          </VStack>
        </HStack>
        <Divider borderColor="gray.700" />
        <Box w="full">
          <Heading as="h2" size="lg" mb={4}>추가 정보</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Text><strong>원제:</strong> {movie.original_title}</Text>
            <Text><strong>언어:</strong> {movie.original_language}</Text>
            <Text><strong>런타임:</strong> {movie.runtime}분</Text>
            <Text><strong>장르:</strong> {movie.genres.map(genre => genre.name).join(", ")}</Text>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
}
