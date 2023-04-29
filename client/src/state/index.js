import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the global slice
const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

// Create a new slice of the Redux store with the name "global"
export const globalSlice = createSlice({
  name: "global",

  // Set the initial state for the slice
  initialState,

  // Define the reducers for the slice
  reducers: {
    // Define a reducer called "setMode"
    setMode: (state) => {
      // Toggle the "mode" property of the state between "light" and "dark"
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// Export the "setMode" action creator from the slice
export const { setMode } = globalSlice.actions;

// Export the reducer function for the slice
export default globalSlice.reducer;
