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
  Hide,
  Show,
  Center,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faCog, faUsers, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, nickName, id, logout, isAdmin } = useContext(LoginContext);
  const [searchQuery, setSearchQuery] = useState("");
  const account = useContext(LoginContext);

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

        {account.isLoggedIn() && (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Flex gap={2}>
                <Box
                  onClick={() => navigate(`/member/${id}`)}
                  cursor={"pointer"}
                  _hover={{
                    bgColor: "gray.200",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Box>
                <Box>
                  <Hide below={"lg"}>{nickName}</Hide>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate(`/member/${id}`)}>
                <FontAwesomeIcon icon={faCog} color={"black"}/>
                <Box ml={2} color={"black"}>프로필</Box>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} color={"black"}/>
                <Box ml={2} color={"black"}>로그아웃</Box>
              </MenuItem>
              {account.isAdmin() && (
                <MenuItem
                  onClick={() => navigate("/member/list")}
                  cursor={"pointer"}
                >
                  <FontAwesomeIcon icon={faUsers} color={"black"}/>
                  <Box ml={2} color={"black"}>회원목록</Box>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}

        {!account.isLoggedIn() && (
          <Center>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Show below={"lg"}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Show>
                <Hide below={"lg"}>로그인</Hide>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/login")}>
                  <FontAwesomeIcon icon={faRightToBracket} color={"black"}/>
                  <Box ml={2} color={"black"}>로그인</Box>
                </MenuItem>
                <MenuItem onClick={() => navigate("/signup")}>
                  <FontAwesomeIcon icon={faUserPlus} color={"black"}/>
                  <Box ml={2} color={"black"}>회원가입</Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
