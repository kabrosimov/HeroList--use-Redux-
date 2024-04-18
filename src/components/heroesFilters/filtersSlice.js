import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilters: [],
// }

const filterAdapter = createEntityAdapter({
    selectId: (filters) => filters.key,
});
const initialState = filterAdapter.getInitialState(
    {
        filtersLoadingStatus: 'idle',
        activeFilters: [],
    }
);






export const fetchFilter = createAsyncThunk(
    'filterSlice/fetchFilter',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
)
const filtersSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {state.activeFilters = action.payload},
        // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        // filtersFetched: (state, action) => {state.filters = action.payload; state.filtersLoadingStatus = 'idle'},
        // filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilter.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilter.fulfilled, (state, action) => {
                                                // state.filters = action.payload; 
                                                filterAdapter.setAll(state, action.payload)
                                                state.filtersLoadingStatus = 'idle'})
            .addCase(fetchFilter.rejected, state => {state.filtersLoadingStatus = 'error'})
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {selectAll} = filterAdapter.getSelectors(state => state.filtersSlice);
export const {
    activeFilterChanged,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
} = actions;