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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isCheckedNickName, setIsCheckedNickName] = useState(true);
  const [oldNickName, setOldNickName] = useState("");
  const account = useContext(LoginContext);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (!account.isLoggedIn()) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .get(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
        setOldNickName(member1.nickName);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          toast({
            status: "warning",
            description: "회원 정보 조회 중 문제가 발생하였습니다.",
            position: "top",
          });
          navigate("/");
        }
      });
  }, [id, navigate, toast, account]);

  const handleClickSave = () => {
    const token = localStorage.getItem("token");
    axios
      .put("/api/member/modify", { ...member, oldPassword }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        toast({
          status: "success",
          description: "회원 정보가 수정되었습니다.",
          position: "top",
        });
        account.login(res.data.token);
        navigate(`/member/${id}`);
      })
      .catch(() => {
        toast({
          status: "error",
          description: "회원 정보가 수정되지 않았습니다.",
          position: "top",
        });
      })
      .finally(() => {
        onClose();
        setOldPassword("");
      });
  };

  if (member === null) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  let isDisableNickNameCheckButton = false;

  if (member.nickName === oldNickName) {
    isDisableNickNameCheckButton = true;
  }

  if (member.nickName.length === 0) {
    isDisableNickNameCheckButton = true;
  }

  let isDisableSaveButton = false;

  if (member.password !== passwordCheck) {
    isDisableSaveButton = true;
  }

  if (member.nickName.trim().length === 0) {
    isDisableSaveButton = true;
  }

  if (!isCheckedNickName) {
    isDisableSaveButton = true;
  }

  const handleCheckNickName = () => {
    setIsCheckedNickName(false); // 중복 확인 초기화
    const token = localStorage.getItem("token");
    axios
      .get(`/api/member/check-nickName?nickName=${member.nickName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
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
  };

  return (
    <Box
      py={8}
      px={4}
      minH="100vh"
      bgImage="url('/image/backimage.jpg')"
      bgSize="cover"
      bgPosition="center"
    >
      <Center>
        <Box
          w={{ base: "100%", md: 500 }}
          p={8}
          bg="rgba(255, 255, 255, 0.8)"
          boxShadow="lg"
          borderRadius="md"
        >
          <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold" >
            회원 정보 수정
          </Heading>
          <Box mb={6}>
            <FormControl>
              <FormLabel fontWeight="bold">이메일</FormLabel>
              <Input readOnly value={member.email} bg="gray.100" />
            </FormControl>
          </Box>
          <Box mb={6}>
            <FormControl>
              <FormLabel fontWeight="bold">암호</FormLabel>
              <Input
                onChange={(e) =>
                  setMember({ ...member, password: e.target.value })
                }
                placeholder={"암호를 변경하려면 입력하세요"}
                type="password"
                bg="gray.100"
              />
              <FormHelperText>
                입력하지 않으면 기존 암호를 변경하지 않습니다.
              </FormHelperText>
            </FormControl>
          </Box>
          <Box mb={6}>
            <FormControl>
              <FormLabel fontWeight="bold">암호 확인</FormLabel>
              <Input
                onChange={(e) => setPasswordCheck(e.target.value)}
                type="password"
                bg="gray.100"
              />
              {member.password !== passwordCheck && (
                <FormHelperText color="red.500">
                  암호가 일치하지 않습니다.
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mb={6}>
            <FormControl>
              <FormLabel fontWeight="bold">별명</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => {
                    const newNickName = e.target.value.trim();
                    setMember({ ...member, nickName: newNickName });
                    setIsCheckedNickName(newNickName === oldNickName);
                  }}
                  value={member.nickName}
                  bg="gray.100"
                />
                <InputRightElement w={"75px"} mr={1}>
                  <Button
                    isDisabled={isDisableNickNameCheckButton}
                    size={"sm"}
                    onClick={handleCheckNickName}
                    colorScheme="blue"
                  >
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
          <Box mb={6}>
            <FormControl>
              <FormLabel fontWeight="bold">생년월일</FormLabel>
              <Input
                type="date"
                value={member.birth}
                onChange={(e) => setMember({ ...member, birth: e.target.value })}
                bg="gray.100"
              />
            </FormControl>
          </Box>
          <Box mb={6}>
            <FormControl>
              <FormLabel fontWeight="bold">전화번호</FormLabel>
              <Input
                value={member.phone}
                onChange={(e) => setMember({ ...member, phone: e.target.value })}
                bg="gray.100"
              />
            </FormControl>
          </Box>
          <Center>
            <Button
              isDisabled={isDisableSaveButton}
              onClick={onOpen}
              colorScheme="blue"
              w="100%"
              py={6}
            >
              저장
            </Button>
          </Center>
        </Box>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>기존 암호 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>기존 암호</FormLabel>
              <Input
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                bg="gray.100"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="blue" onClick={handleClickSave}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
