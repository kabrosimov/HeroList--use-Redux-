
import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';
// import filtersReducer from '../reducers/filtersReducer';

const stringMiddleware = (store) => (next) => (action) => {    
    if (typeof action === 'string'){
        return next({type: action})
    }
    return next(action);    
}


// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string'){
//             return oldDispatch({type: action})
//         }
//         return oldDispatch(action);
//     }
//     return store;
// }

// const store = createStore(
//     combineReducers({heroesReducer, filtersReducer}),
//     compose(
//         applyMiddleware(thunk, stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );
const store = configureStore({
    reducer: { filtersSlice, [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
}); 
    

export default store;