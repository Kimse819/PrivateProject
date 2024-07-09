import { AspectRatio, Box, Divider, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  const navigate = useNavigate();

  // Dummy data for movies
  const movies = [
    {
      id: 1,
      title: "Inception",
      posterUrl: "https://via.placeholder.com/200x300",
      rating: 4.8,
      description: "A mind-bending thriller by Christopher Nolan.",
    },
    {
      id: 2,
      title: "The Dark Knight",
      posterUrl: "https://via.placeholder.com/200x300",
      rating: 4.9,
      description: "The second film in Christopher Nolan's Batman trilogy.",
    },
    {
      id: 3,
      title: "Interstellar",
      posterUrl: "https://via.placeholder.com/200x300",
      rating: 4.7,
      description: "A journey through space and time to save humanity.",
    },
    {
      id: 4,
      title: "Parasite",
      posterUrl: "https://via.placeholder.com/200x300",
      rating: 4.6,
      description: "A dark comedy thriller about class conflict.",
    },
    {
      id: 5,
      title: "Joker",
      posterUrl: "https://via.placeholder.com/200x300",
      rating: 4.5,
      description: "A chilling origin story of the iconic villain.",
    },
    // Add more dummy movies if needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Navbar />
      <Box p={8}>
        <Divider borderColor="gray.700" />
        <VStack spacing={8} my={8}>
          <Box w="full">
            <Heading as="h2" size="lg" mb={5} color="white">
              오늘의 인기영화
            </Heading>
            <Slider {...settings}>
              {movies.map((movie) => (
                <Box key={movie.id} p={2} cursor="pointer" onClick={() => navigate(`/movie/${movie.id}`)}>
                  <AspectRatio ratio={2 / 3}>
                    <Image src={movie.posterUrl} alt={movie.title} objectFit="cover" borderRadius="md" />
                  </AspectRatio>
                  <Box mt={2} textAlign="center">
                    <Heading as="h3" size="md" color="white">
                      {movie.title}
                    </Heading>
                    <Flex justifyContent="center" alignItems="center">
                      <FontAwesomeIcon icon={faStar} color="gold" />
                      <Text ml={1}>{movie.rating}</Text>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </VStack>
        <Divider borderColor="gray.700" />
        <Box mt={8}>
          {/* You can add more content here if needed */}
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Home;
