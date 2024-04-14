
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from 'react-redux';
import { filterInit } from "../../actions";
import classNames from 'classnames';
import Spinner from '../spinner/Spinner';
import './heroesFilter.css'
const HeroesFilters = () => {
    const {activeFilters, filters, filtersLoadingStatus} = useSelector(state => state);


    const dispatch = useDispatch(); 

    const handleClick = (key) => {
        if (key === 'all') {
            dispatch(filterInit([]))
        } else {
            if (activeFilters.indexOf(key) > -1) {
                dispatch(filterInit(activeFilters.filter(item => item !==  key)))
            } else {
                dispatch(filterInit([...activeFilters, key]))
            }
        }
    }

    const createButtons = (arr) => {
        const buttonsList = arr.map((item, i) => {
            
            let buttonElement;            
            for (let key in item) {
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
               
                buttonElement = <button 
                    className={elementClass} 
                    key={i}
                    onClick={() => handleClick(key)}>
                        {item[key]}
                    </button>  
                                
            }
            return buttonElement  
            
            
            });
        return buttonsList;
    }
    const buttons = createButtons(filters);
    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

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