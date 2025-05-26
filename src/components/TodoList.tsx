import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Badge,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi, Todo } from "../services/todoApi";
import { Checkbox } from "@chakra-ui/checkbox";

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();

  // React Query でTodo一覧を取得
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todoApi.getAllTodos,
  });

  // Todo更新のMutation
  const updateTodoMutation = useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: any }) =>
      todoApi.updateTodo(id, todo),
    onSuccess: () => {
      // 更新成功時にキャッシュを再取得
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Todo削除のMutation
  const deleteTodoMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      // 削除成功時にキャッシュを再取得
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // 完了状態をトグル
  const handleToggleComplete = (todo: Todo) => {
    updateTodoMutation.mutate({
      id: todo.id,
      todo: { completed: !todo.completed },
    });
  };

  // Todoを削除
  const handleDelete = (id: number) => {
    if (window.confirm("このTodoを削除しますか？")) {
      deleteTodoMutation.mutate(id);
    }
  };

  // ローディング状態
  if (isLoading) {
    return (
      <Center py={8}>
        <Spinner size="lg" color="blue.500" />
      </Center>
    );
  }

  // エラー状態
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        データの取得に失敗しました
      </Alert>
    );
  }

  // Todo一覧が空の場合
  if (todos.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">まだTodoがありません</Text>
        <Text color="gray.400" fontSize="sm">
          新しいTodoを追加してみましょう！
        </Text>
      </Box>
    );
  }

  return (
    <VStack gap={4} align="stretch">
      {todos.map((todo) => (
        <Card key={todo.id} variant="outline">
          <CardBody>
            <HStack justify="space-between" align="start">
              <HStack align="start" gap={3} flex={1}>
                <Checkbox
                  isChecked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                  size="lg"
                  colorScheme="green"
                />
                <Box flex={1}>
                  <Text
                    fontWeight="semibold"
                    textDecoration={todo.completed ? "line-through" : "none"}
                    color={todo.completed ? "gray.500" : "gray.800"}
                  >
                    {todo.title}
                  </Text>
                  {todo.description && (
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      mt={1}
                      textDecoration={todo.completed ? "line-through" : "none"}
                    >
                      {todo.description}
                    </Text>
                  )}
                  <HStack mt={2} gap={2}>
                    <Badge
                      colorScheme={todo.completed ? "green" : "orange"}
                      size="sm"
                    >
                      {todo.completed ? "完了" : "未完了"}
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(todo.createdAt).toLocaleDateString("ja-JP")}
                    </Text>
                  </HStack>
                </Box>
              </HStack>
              <HStack>
                <IconButton
                  aria-label="編集"
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="削除"
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDelete(todo.id)}
                  loading={deleteTodoMutation.isPending}
                >
                  <DeleteIcon />
                </IconButton>
              </HStack>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default TodoList;
