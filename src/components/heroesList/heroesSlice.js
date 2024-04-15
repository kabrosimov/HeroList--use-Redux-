import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}
const heroesSlice = createSlice({
    name: 'heroesSlice',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
                                    state.heroesLoadingStatus = 'idle'; 
                                    state.heroes = action.payload},
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        deleteHero: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)},
        addHero: (state, action) => {state.heroes.push(action.payload)},            
    }
} 
);
const {actions, reducer} = heroesSlice;

export default reducer;

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
    addHero,
} = actions;