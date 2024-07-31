import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
  VStack,
  Divider,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberInfo() {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setMember(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "warning",
            description: "존재하지 않는 회원입니다.",
            position: "top",
          });
          navigate("/");
        } else if (err.response.status === 403) {
          toast({
            status: "error",
            description: "권한이 없습니다.",
            position: "top",
          });
          navigate(-1);
        }
      });
  }, [id, navigate, toast]);

  const handleClickRemove = () => {
    setIsLoading(true);

    axios
      .delete(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id, password },
      })
      .then(() => {
        toast({
          status: "success",
          description: "회원 탈퇴하였습니다.",
          position: "top",
        });
        account.logout();
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          toast({
            status: "error",
            description: "회원 정보 삭제 권한이 없습니다.",
            position: "top",
          });
        } else {
          toast({
            status: "warning",
            description: "회원 탈퇴 중 문제가 발생하였습니다.",
            position: "top",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        setPassword("");
        onClose();
      });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      axios
        .put(`/api/member/${id}/profile-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          toast({
            status: "success",
            description: "프로필 사진이 업데이트되었습니다.",
            position: "top",
          });
          setMember((prev) => ({ ...prev, profileImage: res.data.profileImage }));
        })
        .catch((error) => {
          toast({
            status: "error",
            description: "프로필 사진 업데이트 중 문제가 발생하였습니다.",
            position: "top",
          });
        });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  if (member === null) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box
      py={8}
      px={4}
      minH="100vh"
      bgImage="url('/image/image1.jpg!d')"
      bgSize="cover"
      bgPosition="center"
      bgAttachment="fixed"
    >
      <Center>
        <Box
          w={{ base: "100%", md: 600 }}
          p={8}
          bg="rgba(0, 0, 0, 0.8)"
          boxShadow="xl"
          borderRadius="lg"
        >
          <Center>
            <Avatar
              size="2xl"
              src={member.profileImage}
              mb={6}
              cursor="pointer"
              onClick={handleAvatarClick}
            />
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleProfileImageChange}
              display="none"
            />
          </Center>
          <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold" color="white">
            마이페이지
          </Heading>
          <Divider mb={6} />
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel fontWeight="bold" color="white">아이디</FormLabel>
              <Input isReadOnly value={member.id} bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold" color="white">이메일</FormLabel>
              <Input isReadOnly value={member.email} bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold" color="white">이름</FormLabel>
              <Input isReadOnly value={member.name} bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold" color="white">별명</FormLabel>
              <Input isReadOnly value={member.nickName} bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold" color="white">생년월일</FormLabel>
              <Input isReadOnly value={new Date(member.birth).toLocaleDateString()} bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold" color="white">전화번호</FormLabel>
              <Input isReadOnly value={member.phone} bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold" color="white">가입일시</FormLabel>
              <Input isReadOnly value={member.inserted} type="datetime-local" bg="gray.100" />
            </FormControl>
            {account.hasAccess(member.id) && (
              <Center>
                <Button
                  mr={4}
                  onClick={() => navigate(`/member/edit/${member.id}`)}
                  colorScheme="blue"
                >
                  수정
                </Button>
                <Button colorScheme="pink" onClick={onOpen}>
                  탈퇴
                </Button>
              </Center>
            )}
          </VStack>
          <Center mt={6}>
            <Button colorScheme="pink" onClick={() => navigate("/")}>
              홈으로
            </Button>
          </Center>
        </Box>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              취소
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={handleClickRemove}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
