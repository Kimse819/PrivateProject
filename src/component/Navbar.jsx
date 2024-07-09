import { useNavigate } from "react-router-dom";
import { Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import React, { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 임시로 로그인 상태를 관리

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
          color={"red"}
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
          onClick={() => navigate("/BoardList")}
          cursor="pointer"
          _hover={{ bgColor: "gray.600" }}
          p={2}
          borderRadius="md"
        >
          커뮤니티
        </Box>
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
          <Button onClick={() => navigate("/login")} colorScheme="teal">
            로그인
          </Button>
          <Button onClick={() => navigate("/signup")} colorScheme="teal">
            회원가입
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default Navbar;
