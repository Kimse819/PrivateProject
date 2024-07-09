import {AspectRatio, Box, Divider, Flex, Heading, Image, Text, VStack} from "@chakra-ui/react";
import React from "react";
import {Outlet} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Navbar} from "../component/Navbar.jsx";


export function Home() {

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
        breakpoint: 600,
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
    <Box>
      <Navbar>
      </Navbar>
      <Box>
        <Divider />
        <VStack spacing={8} my={8}>
          <Box w="full">
            <Heading as="h2" size="lg" mb={5}>
              Popular Movies
            </Heading>
            <Slider {...settings}>
              {movies.map((movie) => (
                <Box key={movie.id} p={2} onClick={() => navigate(`/movie/${movie.id}`)}>
                  <AspectRatio ratio={2 / 3}>
                    <Image src={movie.posterUrl} alt={movie.title} objectFit="cover" />
                  </AspectRatio>
                  <Box mt={2}>
                    <Heading as="h3" size="md">
                      {movie.title}
                    </Heading>
                    <Flex align="center">
                      <FontAwesomeIcon icon={faStar} color="gold" />
                      <Text ml={1}>{movie.rating}</Text>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </VStack>
        <Divider />
        <Box mt={8}>
          {/* You can add more content here if needed */}
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
}
