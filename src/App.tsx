import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function App() {
  const [message, setMessage] = React.useState<string>("");

  const testChakraUI = () => {
    setMessage("🎉 Chakra UI v2 が正常に動作しています！");
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        {/* ヘッダーセクション */}
        <Box textAlign="center">
          <Heading size="xl" color="blue.500" mb={2}>
            📝 Todo アプリ
          </Heading>
          <Text color="gray.600">React 18 + Chakra UI v1 + NestJS</Text>
        </Box>

        <Divider />

        {/* セットアップ確認 */}
        <Box
          w="100%"
          p={6}
          borderWidth={1}
          borderRadius="lg"
          shadow="md"
          bg="blue.50"
        >
          <Text fontWeight="semibold" mb={4}>
            🔧 セットアップ確認
          </Text>

          <Button colorScheme="blue" onClick={testChakraUI} mb={4}>
            Chakra UI テスト
          </Button>

          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
            </Alert>
          )}
        </Box>

        {/* 次のステップ */}
        <Box
          w="100%"
          p={6}
          borderWidth={1}
          borderRadius="lg"
          shadow="md"
          bg="green.50"
        >
          <Text color="green.800" fontWeight="semibold">
            ✅ 今回の構成（シンプル版）
          </Text>
          <VStack spacing={2} mt={3} align="stretch">
            <Text color="green.600" fontSize="sm">
              ✅ React 18
            </Text>
            <Text color="green.600" fontSize="sm">
              ✅ TypeScript
            </Text>
            <Text color="green.600" fontSize="sm">
              ✅ Chakra UI v2
            </Text>
            <Text color="gray.500" fontSize="sm">
              ⏸️ React Query（後で追加）
            </Text>
            <Text color="gray.500" fontSize="sm">
              ⏸️ Redux Toolkit（後で追加）
            </Text>
            <Text color="gray.500" fontSize="sm">
              ⏸️ axios（後で追加）
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default App;
