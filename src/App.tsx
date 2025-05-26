import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

function App() {
  return (
    <Container maxW="container.md" py={8}>
      <VStack gap={6}>
        <Box textAlign="center">
          <Heading size="xl" color="blue.500">
            Todo アプリ
          </Heading>
          <Text mt={2} color="gray.600">
            React + NestJS で作る Todo アプリケーション
          </Text>
        </Box>

        <Box w="100%" p={6} borderWidth={1} borderRadius="lg" shadow="md">
          <Text>🚀 Chakra UI のセットアップが完了しました！</Text>
          <Text mt={2}>次は Redux Toolkit と React Query を設定します。</Text>
        </Box>
      </VStack>
    </Container>
  );
}

export default App;
