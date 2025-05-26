import { configureStore } from '@reduxjs/toolkit';

// 後で追加するスライスをここにインポート
// import todoSlice from './todoSlice';

export const store = configureStore({
  reducer: {
    // 後でtodoスライスを追加
    // todos: todoSlice,
  },
});

// TypeScript用の型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;