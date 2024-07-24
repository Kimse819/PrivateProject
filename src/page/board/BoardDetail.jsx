import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Text, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";

export function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => {
      setBoard(res.data.board);
      setComments(res.data.comments);
    });
  }, [id]);

  const handleAddComment = () => {
    const commentData = { content: newComment };
    axios.post(`/api/board/${id}/comment`, commentData).then((res) => {
      setComments([...comments, res.data]);
      setNewComment("");
    });
  };

  const handleUpdateComment = (updatedComment) => {
    setComments(
      comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment,
      ),
    );
  };

  const handleDeleteComment = (commentId) => {
    axios.delete(`/api/board/${id}/comment/${commentId}`).then(() => {
      setComments(comments.filter((comment) => comment.id !== commentId));
    });
  };

  const handleReply = (newReply) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === newReply.parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      }),
    );
  };

  if (!board) return <Box>Loading...</Box>;

  return (
    <Box>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          {board.title}
        </Text>
        <Text>{board.content}</Text>
      </Box>
      <Box mt={4}>
        <Text fontSize="xl" fontWeight="bold">
          댓글
        </Text>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
            onReply={handleReply}
          />
        ))}
      </Box>
      <VStack mt={4}>
        <Textarea
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddComment}>
          댓글 작성
        </Button>
      </VStack>
    </Box>
  );
}
