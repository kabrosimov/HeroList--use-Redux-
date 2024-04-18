
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from 'react-redux';
import { activeFilterChanged, selectAll } from './filtersSlice';
import classNames from 'classnames';
import './heroesFilter.css'
const HeroesFilters = () => {
    const {activeFilters, filtersLoadingStatus} = useSelector(state => state.filtersSlice);
    const listAllFilter = useSelector(selectAll);


    const dispatch = useDispatch(); 

    const handleClick = (key) => {
        if (key === 'all') {
            dispatch(activeFilterChanged([]))
        } else {
            if (activeFilters.indexOf(key) > -1) {
                dispatch(activeFilterChanged(activeFilters.filter(item => item !==  key)))
            } else {
                dispatch(activeFilterChanged([...activeFilters, key]))
            }
        }
    }

    const renderButtons = (filters) => {

        if (filtersLoadingStatus === "loading") {
            return <button>Идет загрузка...</button>;
        } else if (filtersLoadingStatus === "error") {
            return <button>Ошибка загрузки</button>;
        }

        const buttonsList = filters.map(({key, name}) => {   
            const elementClass = classNames({
                    btn: true,
                    'btn-outline-dark': key === 'all',
                    'btn-danger': key === 'fire',
                    'btn-primary': key === 'water',
                    'btn-success': key === 'wind',
                    'btn-secondary': key === 'earth',
                    'active': (key === 'all' && activeFilters.length === 0) || 
                                (activeFilters.indexOf(key) > -1) 
                });
            return (
                <button 
                className={elementClass} 
                key={key}
                onClick={() => handleClick(key)}>
                    {name}
                </button> 
                )   
            });
        return buttonsList;
    }
    const buttons = renderButtons(listAllFilter)
   

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;