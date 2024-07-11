import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [inserted, setInserted] = useState(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedEmai     , setIsCheckedEmail] = useState(false);
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  function handleClick() {
    setIsLoading(true);
    axios
      .post("/api/member/signup", {
        email,
        password,
        nickName,
        name,
        gender,
        birth,
        phone,
        inserted,
      })
      .then((res) => {

        toast({
          status: "success",
          description: "회원 가입이 완료되었습니다.",
          position: "top",
        });
        navigate("/login");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toast({
            status: "error",
            description: "입력값을 확인해 주세요.",
            position: "top",
          });
        } else {
          toast({
            status: "error",
            description: "회원 가입 중 문제가 발생하였습니다.",
            position: "top",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCheckEmail() {
    axios
      .get(`/api/member/check-email?email=${email}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 이메일입니다.",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다.",
            position: "top",
          });
          setIsCheckedEmail(true);
        }
        //
      });
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check-nickName?nickName=${nickName}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 별명입니다.",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 별명입니다.",
            position: "top",
          });
          setIsCheckedNickName(true);
        }
      });
  }

  const isCheckedPassword = password === passwordCheck;

  let isDisabled = !(
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    nickName.trim().length > 0 &&
    isCheckedPassword &&
    isCheckedEmail &&
    isCheckedNickName &&
    isValidEmail &&
    name.trim().length > 0 &&
    gender.trim().length > 0 &&
    birth.trim().length > 0 &&
    phone.trim().length > 0
  );

  return (
    <Center>
      <Box w={500}>
        <Center mb={10} mt={30}>
          <Heading>회원 가입</Heading>
        </Center>
        <VStack spacing={7}>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <InputGroup>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsCheckedEmail(false);
                  setIsValidEmail(!e.target.validity.typeMismatch);
                }}
              />
              <InputRightElement w="75px" mr={1}>
                <Button
                  isDisabled={!isValidEmail || email.trim().length === 0}
                  onClick={handleCheckEmail}
                  size="sm"
                >
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
            {!isCheckedEmail && (
              <FormHelperText mt={2}>이메일 중복확인을 해주세요.</FormHelperText>
            )}
            {!isValidEmail && (
              <FormHelperText mt={2}>
                올바른 이메일 형식으로 작성해 주세요.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>암호 확인</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            {!isCheckedPassword && (
              <FormHelperText mt={2}>암호가 일치하지 않습니다.</FormHelperText>
            )}
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>이름</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!name && (
              <FormHelperText mt={2} color="red.500">
                이름을 입력해주세요.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>성별</FormLabel>
            <Select
              placeholder="성별을 선택해주세요"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>생년월일</FormLabel>
            <Input
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>전화번호</FormLabel>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <InputGroup>
              <Input
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value.trim());
                  setIsCheckedNickName(false);
                }}
                required
              />
              <InputRightElement w="75px" mr={1}>
                <Button
                  isDisabled={nickName.trim().length === 0}
                  size="sm"
                  onClick={handleCheckNickName}
                >
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
            {!isCheckedNickName && (
              <FormHelperText mt={2}>별명 중복확인을 해주세요.</FormHelperText>
            )}
          </FormControl>
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            onClick={handleClick}
            isDisabled={isDisabled}
          >
            가입
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
