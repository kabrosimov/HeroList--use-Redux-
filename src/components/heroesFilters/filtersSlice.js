import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilters: [],
}
const filtersSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {state.activeFilters = action.payload},
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {state.filters = action.payload; state.filtersLoadingStatus = 'idle'},
        filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    activeFilterChanged,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
} = actions;