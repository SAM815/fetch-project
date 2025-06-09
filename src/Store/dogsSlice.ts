import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface DogState {
  favoriteIds: string[];
  
}

const initialState: DogState = {
  favoriteIds: [],
  

};

const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter((fid) => fid !== id);
      } else {
        state.favoriteIds.push(id);
      }
    },
    resetFavorites(state) {
      state.favoriteIds = [];
    },
    
  },
});

export const { toggleFavorite, resetFavorites } = dogsSlice.actions;
export default dogsSlice.reducer;
