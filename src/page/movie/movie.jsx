import axios from 'axios';

const API_KEY = 'd2ffc44dee69cf0b426d3e6202d85a5d';  // 발급받은 TMDb API 키로 교체하세요
const BASE_URL = 'https://api.themoviedb.org/3';

// 인기 영화 가져오기
const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',  // 원하는 언어로 변경 가능
        page: 1               // 페이지 번호
      }
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// 특정 영화 정보 가져오기
const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

// 영화 검색하기
const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        query: query,
        page: 1,
        include_adult: false // 성인 콘텐츠 제외
      }
    });

    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// 예제 사용법

// 인기 영화 가져오기 예제
getPopularMovies().then(movies => {
  console.log('Popular movies:', movies);
}).catch(error => {
  console.error('Error:', error);
});

// 특정 영화 정보 가져오기 예제
getMovieDetails(550).then(movie => {
  console.log('Movie details:', movie);
}).catch(error => {
  console.error('Error:', error);
});

// 영화 검색하기 예제
searchMovies('Inception').then(movies => {
  console.log('Search results:', movies);
}).catch(error => {
  console.error('Error:', error);
});
