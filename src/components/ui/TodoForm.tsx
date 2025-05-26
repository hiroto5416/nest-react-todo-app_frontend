import React, { useState } from "react";
import { Button, Input, Textarea, VStack, Heading } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi, CreateTodoDto } from "../../services/todoApi";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  // Todo作成のMutation
  const createTodoMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      // 作成成功時にフォームをリセットし、キャッシュを再取得
      setTitle("");
      setDescription("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo: CreateTodoDto = {
      title: title.trim(),
      description: description.trim() || undefined,
    };

    createTodoMutation.mutate(newTodo);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md" color="blue.600">
          新しいTodoを追加
        </Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            <FormControl isRequired>
              <FormLabel>タイトル</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="やるべきことを入力してください"
                borderColor="blue.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>説明（任意）</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="詳細な説明があれば入力してください"
                borderColor="blue.500"
                rows={3}
              />
            </FormControl>

            {createTodoMutation.error && (
              <Alert status="error">
                <AlertIcon />
                Todoの作成に失敗しました
              </Alert>
            )}

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              loading={createTodoMutation.isPending}
              loadingText="作成中..."
              disabled={!title.trim()}
            >
              Todoを追加
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default TodoForm;
