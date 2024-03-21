import { configureStore, createSlice } from '@reduxjs/toolkit';



interface DarkModeState {
    mode: boolean;
}

const storedMode = typeof window !== 'undefined' ? localStorage.getItem("darkMode") : null;
const initialState: DarkModeState = {
    mode: storedMode ? JSON.parse(storedMode) : false
};



const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.mode = !state.mode;
            localStorage.setItem("darkMode", JSON.stringify(state.mode));
        }
    }
});

//action creator
export const { toggleDarkMode } = darkModeSlice.actions;

//store
export const store = configureStore({
    reducer: {
        darkMode: darkModeSlice.reducer
    }
});