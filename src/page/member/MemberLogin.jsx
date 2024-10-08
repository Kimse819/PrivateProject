import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  const handleSignup = () => {
    navigate("/signup");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleLogin() {
    setIsLoading(true);
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        if (account && account.login) {
          account.login(res.data.token);
        }
        toast({
          status: "success",
          description: "로그인 되었습니다.",
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        if (account && account.logout) {
          account.logout();
        }
        toast({
          status: "warning",
          description: "이메일과 패스워드를 확인해주세요.",
          position: "top",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Center
      bgImage="url('/image/backimage.jpg')"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box w={500} p={8} bg="white" boxShadow="md" borderRadius="md">
        <Box mb={10} mt={30}>
          <Center mb={10}>
            <Heading>로그인</Heading>
          </Center>
          <VStack spacing={7}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordVisibility}>
                    {showPassword ? "숨기기" : "보이기"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              onClick={handleLogin}
              colorScheme={"pink"}
              isLoading={isLoading}
            >
              로그인
            </Button>

            <Flex alignItems={"center"}>
              <Box mr={2}>아직 계정이 없으신가요?</Box>
              <Button
                onClick={handleSignup}
                colorScheme={"pink"}
                _hover={{ bg: "skyblue" }}
              >
                회원가입
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Center>
  );
}
