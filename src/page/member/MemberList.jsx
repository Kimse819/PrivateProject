import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Center,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기
        const response = await axios.get("/api/member/list", {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더에 토큰 추가
          },
        });
        setMemberList(response.data);
      } catch (error) {
        console.error("Error fetching member list:", error);
        toast({
          title: "회원 목록 로드 오류",
          description: "회원 목록을 가져오는 중에 오류가 발생했습니다.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchMemberList();
  }, [toast]);

  if (memberList.length === 0) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={8} bg="gray.900" color="white" minH="100vh">
      <VStack spacing={8}>
        <Heading textAlign="center" fontSize="2xl" fontWeight="bold" color="white">
          회원 목록
        </Heading>
        <Box overflowX="auto" w="full" bg="gray.800" p={6} boxShadow="lg" borderRadius="md">
          <Table variant="simple" colorScheme="whiteAlpha">
            <Thead bg="gray.700">
              <Tr>
                <Th w={20} color="white">ID</Th>
                <Th color="white">이메일</Th>
                <Th color="white">이름</Th>
                <Th w={"150px"} color="white">별명</Th>
                <Th color="white">성별</Th>
                <Th color="white">생년월일</Th>
                <Th color="white">전화번호</Th>
                <Th w={96} color="white">가입일시</Th>
              </Tr>
            </Thead>
            <Tbody>
              {memberList.map((member) => (
                <Tr
                  cursor="pointer"
                  _hover={{ bg: "gray.700" }}
                  onClick={() => navigate(`/member/${member.id}`)}
                  key={member.id}
                >
                  <Td>{member.id}</Td>
                  <Td>{member.email}</Td>
                  <Td>{member.name}</Td>
                  <Td>{member.nickName}</Td>
                  <Td>{member.gender}</Td>
                  <Td>{member.birth}</Td>
                  <Td>{member.phone}</Td>
                  <Td>{member.inserted}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}

export default MemberList;
