import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  sidebarOpen: boolean;
  themeMode: "light" | "dark";
  notification: {
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null;
}

const initialState: UiState = {
  sidebarOpen: true,
  themeMode: "light",
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setThemeMode(state, action: PayloadAction<"light" | "dark">) {
      state.themeMode = action.payload;
    },
    showNotification(state, action: PayloadAction<UiState["notification"]>) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setThemeMode,
  showNotification,
  clearNotification,
} = uiSlice.actions;
export default uiSlice.reducer;
