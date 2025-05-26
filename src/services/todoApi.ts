import axios from "axios";

// APIのベースURL（NestJSバックエンド）
const API_BASE_URL = "http://localhost:3001";

// axiosインスタンスの作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Todo型の定義
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// DTO型の定義
export interface CreateTodoDto {
  title: string;
  description?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

// API関数の定義
export const todoApi = {
  // 全てのTodoを取得
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get("/todos");
    return response.data;
  },

  // 特定のTodoを取得
  getTodoById: async (id: number): Promise<Todo> => {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  },

  // 新しいTodoを作成
  createTodo: async (todo: CreateTodoDto): Promise<Todo> => {
    const response = await apiClient.post("/todos", todo);
    return response.data;
  },

  // Todoを更新
  updateTodo: async (id: number, todo: UpdateTodoDto): Promise<Todo> => {
    const response = await apiClient.patch(`/todos/${id}`, todo);
    return response.data;
  },

  // Todoを削除
  deleteTodo: async (id: number): Promise<Todo> => {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  },
};
