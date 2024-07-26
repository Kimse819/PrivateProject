import {Box, Image, Text, VStack, Spinner, Center, Heading, HStack, Flex} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d2ffc44dee69cf0b426d3e6202d85a5d";  // 여기에 TMDb API 키를 입력하세요

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
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!movie) {
    return (
      <Center minH="100vh">
        <Text>영화 정보를 가져오지 못했습니다.</Text>
      </Center>
    );
  }

  return (
    <Box p={8} bg="gray.900" color="white" minH="100vh">
      <VStack spacing={8} align="start">
        <HStack spacing={8} align="start">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            borderRadius="md"
            boxShadow="lg"
          />
          <VStack align="start" spacing={4}>
            <Heading as="h1" size="2xl">{movie.title}</Heading>
            <Text fontSize="lg"><strong>개봉일: </strong>
              {movie.release_date}</Text>
            <Flex>
            <FontAwesomeIcon icon={faStar} color="gold"/>
            <Text fontSize="lg">{movie.vote_average} / 10</Text>
            </Flex>
            <Text fontSize="md">{movie.overview}</Text>
          </VStack>
        </HStack>
        <Box>
          <Heading as="h2" size="lg" mb={4}>추가 정보</Heading>
          <Text><strong>원제:</strong> {movie.original_title}</Text>
          <Text><strong>언어:</strong> {movie.original_language}</Text>
          <Text><strong>런타임:</strong> {movie.runtime}분</Text>
          <Text><strong>장르:</strong> {movie.genres.map(genre => genre.name).join(", ")}</Text>
        </Box>
      </VStack>
    </Box>
  );
}
