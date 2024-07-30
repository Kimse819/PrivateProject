import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Input,
    Select,
    Stack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Text,
    Container,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
    faImages,
} from "@fortawesome/free-solid-svg-icons";

export function BoardList() {
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [searchType, setSearchType] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchParams] = useSearchParams();
    const toast = useToast();

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/api/board/list?${searchParams}`)
            .then((res) => {
                setBoardList(res.data.boardList);
                setPageInfo(res.data.pageInfo);
            })
            .catch(() => {
                toast({
                    title: "데이터를 가져오는 중 오류가 발생했습니다.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            });

        setSearchType("all");
        setSearchKeyword("");

        const typeParam = searchParams.get("type");
        const keywordParam = searchParams.get("keyword");
        if (typeParam) {
            setSearchType(typeParam);
        }
        if (keywordParam) {
            setSearchKeyword(keywordParam);
        }
    }, [searchParams]);

    const pageNums = [];
    for (let i = pageInfo.leftPageNum; i <= pageInfo.rightPageNum; i++) {
        pageNums.push(i);
    }

    function handleSearch() {
        navigate(`/board/list?type=${searchType}&keyword=${searchKeyword}`);
    }

    function handlePageClick(pageNum) {
        searchParams.set("page", pageNum);
        navigate(`/board/list?${searchParams}`);
    }

    function handleClickWrite() {
        navigate(`/write`);
    }

    const bgColor = useColorModeValue("gray.900", "gray.50");
    const headingColor = useColorModeValue("white", "gray.900");
    const searchBgColor = useColorModeValue("gray.800", "gray.200");
    const tableHeaderBg = useColorModeValue("gray.700", "gray.200");
    const buttonBgColor = useColorModeValue("teal.100", "teal.700");

    return (
        <Box py={8} px={4} minH="100vh" bg={bgColor}>
            <Container maxW="container.xl" bg={searchBgColor} p={6} borderRadius="md" boxShadow="lg">
                <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold" color={headingColor}>
                    커뮤니티
                </Heading>
                <Box mb={8} bg={searchBgColor} p={4} borderRadius="md" boxShadow="sm">
                    <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
                        <Stack direction={{ base: "column", md: "row" }} spacing={2} align="center">
                            <Select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                                width="150px"
                                bg="gray.700"
                                borderColor="white"
                                color="deeppink"
                            >
                                <option value="all">전체</option>
                                <option value="text">제목+내용</option>
                                <option value="nickName">작성자</option>
                            </Select>
                            <Input
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                placeholder="검색어 입력"
                                width={{ base: "100%", md: "auto" }}
                                bg="gray.700"
                                borderColor="white"
                                color="white"
                            />
                            <Button onClick={handleSearch} colorScheme="blue">
                                검색
                            </Button>
                        </Stack>
                        <Box>
                            <Button onClick={handleClickWrite} colorScheme="green">
                                글쓰기
                            </Button>
                        </Box>
                    </Flex>
                </Box>
                {boardList.length === 0 && (
                    <Center>
                        <Text color="white">조회 결과가 없습니다.</Text>
                    </Center>
                )}
                {boardList.length > 0 && (
                    <Box bg="gray.800" p={6} boxShadow="lg" borderRadius="md">
                        <Table variant="simple">
                            <Thead bg={tableHeaderBg}>
                                <Tr>
                                    <Th color="white">#</Th>
                                    <Th color="white">제목</Th>
                                    <Th color="white">작성자</Th>
                                    <Th color="white">작성일시</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {boardList.map((board) => (
                                    <Tr key={board.id}>
                                        <Td color="white">{board.id}</Td>
                                        <Td
                                            cursor="pointer"
                                            color="white"
                                            onClick={() => navigate(`/board/${board.id}`)}
                                        >
                                            {board.numberOfImages > 0 && (
                                                <Badge bgColor="white">
                                                    <FontAwesomeIcon icon={faImages} color="green" />
                                                </Badge>
                                            )}
                                            {board.title}
                                            {board.numberOfComments > 0 && (
                                                <Badge bgColor="white" ml={1}>
                                                    [{board.numberOfComments}]
                                                </Badge>
                                            )}
                                        </Td>
                                        <Td color="white">{board.writer}</Td>
                                        <Td color="white">{board.inserted}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                )}
                <Center mt={8}>
                    <Flex wrap="wrap" justifyContent="center">
                        {pageInfo.prevPageNum && (
                            <>
                                <Button
                                    onClick={() => handlePageClick(1)}
                                    colorScheme="gray"
                                    variant="outline"
                                    m={1}
                                    w={10}
                                >
                                    <FontAwesomeIcon icon={faAnglesLeft} />
                                </Button>
                                <Button
                                    onClick={() => handlePageClick(pageInfo.prevPageNum)}
                                    colorScheme="gray"
                                    variant="outline"
                                    m={1}
                                    w={10}
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </Button>
                            </>
                        )}
                        {pageNums.map((pageNum) => (
                            <Button
                                key={pageNum}
                                onClick={() => handlePageClick(pageNum)}
                                m={1}
                                colorScheme={pageNum === pageInfo.currPageNum ? "blue" : "gray"}
                                variant="outline"
                            >
                                {pageNum}
                            </Button>
                        ))}
                        {pageInfo.nextPageNum && (
                            <>
                                <Button
                                    onClick={() => handlePageClick(pageInfo.nextPageNum)}
                                    colorScheme="gray"
                                    variant="outline"
                                    m={1}
                                    w={10}
                                >
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </Button>
                                <Button
                                    onClick={() => handlePageClick(pageInfo.lastPageNum)}
                                    colorScheme="gray"
                                    variant="outline"
                                    m={1}
                                    w={10}
                                >
                                    <FontAwesomeIcon icon={faAnglesRight} />
                                </Button>
                            </>
                        )}
                    </Flex>
                </Center>
            </Container>
        </Box>
    );
}

export default BoardList;
