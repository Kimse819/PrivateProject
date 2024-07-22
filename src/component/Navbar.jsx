import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
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
          fontSize={"40"}
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
        <InputGroup>
          <Input
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="gray.700"
            color="white"
            borderRadius="md"
          />
          <InputRightElement>
            <IconButton
              icon={<SearchIcon />}
              onClick={handleSearch}
              aria-label="Search"
            />
          </InputRightElement>
        </InputGroup>

        {account.isLoggedIn ? (
          <Menu>
            <MenuButton as={Button} variant="link" cursor="pointer">
              <Flex alignItems="center">
                <Avatar size="sm" />
                <Box ml={2} color="white">
                  {account.nickName} {/* 닉네임 표시 */}
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/profile")} color={"black"}>
                프로필
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  account.logout();
                  navigate("/login");
                }}
                color={"black"}
              >
                로그아웃
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            <MenuButton as={Button} leftIcon={<FontAwesomeIcon icon={faUser} />}>
              계정
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/login")} color={"black"}>
                로그인
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate("/signup")} color={"black"}>
                회원가입
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
