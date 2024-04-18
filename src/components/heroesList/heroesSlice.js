import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { createSelector } from "@reduxjs/toolkit";

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }

const heroesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});
const initialState = heroesAdapter.getInitialState({heroesLoadingStatus: 'idle',});
// console.log(initialState);

export const fetchHeroes = createAsyncThunk(
    'heroesSlice/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes")
    }
);
const heroesSlice = createSlice({
    name: 'heroesSlice',
    initialState,
    reducers: {
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => {
        //                             state.heroesLoadingStatus = 'idle'; 
        //                             state.heroes = action.payload},
        // heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        // deleteHero: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)},
        deleteHero: (state, action) => heroesAdapter.removeOne(state, action.payload),
        // addHero: (state, action) => {state.heroes.push(action.payload)},            
        addHero: (state, action) => heroesAdapter.addOne(state, action.payload),            
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                                                        state.heroesLoadingStatus = 'idle'; 
                                                        heroesAdapter.setAll(state, action.payload)})
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
} 
);
const {actions, reducer} = heroesSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroesSlice);
// console.log(selectAll)
//createSelector используется , когда нужно мемоизировать результат выаолнения 
//какого-то дейсттвия, которое меняет стейт. при одинаковых вызовах нет смысла перерисовывать стейт
//и потом из-за этого перерисовывать компонент
export const filteredHeroSelector = createSelector(
    (state) => state.filtersSlice.activeFilters,
    // (state) => state.heroesSlice.heroes,
    selectAll, //тоже самое вернет, что и предыдущая строка
    (filters, heroes) => {
        if (filters.length === 0)
            return heroes;
        else return heroes.filter(item => filters.includes(item.element))
    }        
)

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
    addHero,
} = actions;