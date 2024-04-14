const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilters: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HERO':
            const duplicate = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: duplicate
            }
        case 'ADD_HERO':
            // const duplicate = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: [...state.heroes, 
                    {   
                        id: action.payload.id, 
                        name: action.payload.name,
                        description: action.payload.description,
                        element: action.payload.element,

                    }]
            }
        case 'FILTER_INIT':
            return {
                ...state,
                activeFilters: action.payload
            }
        
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        
        default: return state
    }
}

export default reducer;