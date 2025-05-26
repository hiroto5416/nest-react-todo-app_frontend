import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ChakraProvider } from "./components/ui/provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query Client の作成
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失敗時のリトライ回数
      staleTime: 1000 * 60, // データが古くなるまでの時間（1分）
      refetchOnWindowFocus: false, // ウィンドウフォーカス時の自動再取得を無効
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ReduxProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
