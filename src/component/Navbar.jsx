import { useNavigate } from "react-router-dom";
import { Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 임시로 로그인 상태를 관리
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리

  function handleSearch() {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  }

  return (
    <Flex
      bg="gray.800"
      color="white"
      p={4}
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
    >
      <Flex gap={6} alignItems="center">
        <Box
          onClick={() => navigate("/")}
          cursor="pointer"
          _hover={{ bgColor: "gray.600" }}
          p={2}
          borderRadius="md"
          color={"deeppink"}
          fontSize={"23"}
        >
          Tracker
        </Box>
        <Box
          onClick={() => navigate("/recommend")}
          cursor="pointer"
          _hover={{ bgColor: "gray.600" }}
          p={2}
          borderRadius="md"
        >
          추천 영화
        </Box>
        <Box
          onClick={() => navigate("/popular")}
          cursor="pointer"
          _hover={{ bgColor: "gray.600" }}
          p={2}
          borderRadius="md"
        >
          인기 영화
        </Box>
        <Box
          onClick={() => navigate("/list")}
          cursor="pointer"
          _hover={{ bgColor: "gray.600" }}
          p={2}
          borderRadius="md"
        >
          커뮤니티
        </Box>
      </Flex>

      <Flex alignItems="center" gap={4}>
        <Flex>
          <Input
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="gray.700"
            color="white"
            borderRadius="md"
          />
          <IconButton
            icon={<SearchIcon />}
            onClick={handleSearch}
            colorScheme="white"
            ml={2}
          />
        </Flex>

        {isLoggedIn ? (
          <Menu>
            <MenuButton as={Button} variant="link" cursor="pointer">
              <Avatar size="sm" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/profile")} color={"black"}>
                프로필
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => { setIsLoggedIn(false); navigate("/logout"); }} color={"black"}>
                로그아웃
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Flex gap={3}>
            <Button onClick={() => navigate("/Memberlogin")} colorScheme="teal">
              로그인
            </Button>
            <Button onClick={() => navigate("/Membersignup")} colorScheme="teal">
              회원가입
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
