import { AspectRatio, Box, Divider, Flex, Heading, Image, Text, VStack, Button, Spinner, Center, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../component/Navbar.jsx";
import axios from "axios";
import _ from "lodash";

const API_KEY = 'd2ffc44dee69cf0b426d3e6202d85a5d';
const BASE_URL = 'https://api.themoviedb.org/3';

export function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
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
        const randomMovies = _.sampleSize(response.data.results, 8);
        setRecommendedMovies(randomMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const featuredMovie = movies.length > 0 ? movies[0] : {
    title: "Loading...",
    posterUrl: "",
    description: "Fetching featured movie...",
  };

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="white" />
      </Center>
    );
  }

  const categoryCards = [
    { name: "액션", image: "/image/action.jpeg", route: "/category/action" },
    { name: "코미디", image: "/image/comedy.jpg", route: "/category/comedy" },
    { name: "드라마", image: "/image/drama.jpeg", route: "/category/drama" },
    { name: "SF", image: "/image/scifi.jpeg", route: "/category/scifi" },
    { name: "호러", image: "/image/horror.jpeg", route: "/category/horror" },
  ];

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Box p={8}>
        <Box mb={10} position="relative" onClick={() => navigate(`/movie/${featuredMovie.id}`)}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              objectFit="cover"
              borderRadius="md"
            />
          </AspectRatio>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            bg="rgba(0, 0, 0, 0.6)"
            p={6}
            borderRadius="md"
            color="white"
          >
            <Heading as="h1" size="2xl">{featuredMovie.title}</Heading>
            <Text mt={2} fontSize="lg" noOfLines={3}>{featuredMovie.overview}</Text>
          </Box>
        </Box>

        <Divider borderColor="gray.700" />
        <VStack spacing={8} my={8}>
          <Box w="full">
            <Heading as="h2" size="lg" mb={5} color="white">
              오늘의 인기영화
            </Heading>
            <Slider {...settings}>
              {movies.map((movie) => (
                <Box
                  key={movie.id}
                  p={2}
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
            </Slider>
          </Box>

          <Box w="full">
            <Heading as="h2" size="lg" mb={5} color="white">
              볼 만한 영화
            </Heading>
            <Slider {...settings}>
              {recommendedMovies.map((movie) => (
                <Box
                  key={movie.id}
                  p={2}
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
            </Slider>
          </Box>

          {/* Categories */}
          <Box w="full">
            <Heading as="h2" size="lg" mb={5} color="white">
              카테고리별 영화
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={4}>
              {categoryCards.map((category) => (
                <Box
                  key={category.name}
                  p={4}
                  bg="gray.800"
                  borderRadius="md"
                  boxShadow="lg"
                  cursor="pointer"
                  onClick={() => navigate(category.route)}
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image src={category.image} alt={category.name} objectFit="cover" borderRadius="md" />
                  </AspectRatio>
                  <Box mt={2} textAlign="center">
                    <Heading as="h3" size="md" color="white">
                      {category.name}
                    </Heading>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>

        <Divider borderColor="gray.700" />
        <Box mt={8}>
          {/* You can add more content here if needed */}
        </Box>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box as="footer" py={4} textAlign="center" bg="gray.800" color="gray.500">
      </Box>
    </Box>
  );
}

export default Home;
