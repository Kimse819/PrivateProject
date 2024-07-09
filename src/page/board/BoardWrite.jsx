import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Container, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const toast = useToast();

  function handleSaveClick() {
    axios.post("/api/board/add", {
      title,
      content,
      writer,
    })
      .then(() => {
        toast({
          title: "글이 저장되었습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "저장 중 오류가 발생했습니다.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }

  return (
    <Box py={8} px={4} minH="100vh" bg="gray.900">
      <Container maxW="container.md" bg="gray.800" p={6} borderRadius="md" boxShadow="lg">
        <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold" color="white">
          글 작성
        </Heading>
        <VStack spacing={6} align="stretch">
          <FormControl id="title">
            <FormLabel fontWeight="bold" color="white">제목</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              bg="gray.700"
              borderColor="white"
              color="white"
            />
          </FormControl>
          <FormControl id="content">
            <FormLabel fontWeight="bold" color="white">본문</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="본문을 입력하세요"
              bg="gray.700"
              borderColor="white"
              color="white"
              resize="vertical"
              minH="200px"
            />
          </FormControl>
          <FormControl id="writer">
            <FormLabel fontWeight="bold" color="white">작성자</FormLabel>
            <Input
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              placeholder="작성자를 입력하세요"
              bg="gray.700"
              borderColor="white"
              color="white"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSaveClick}>
            저장
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}

export default BoardWrite;
