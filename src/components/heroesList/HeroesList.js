
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice'; //hook RTK query
import './heroesList.css';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    
    const {
        data: heroes = [],
        isFetching,
        isLoading,
        isError
    } = useGetHeroesQuery(); 
    const [deleteHeroRTK] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filtersSlice.activeFilters);

    const filteredHeroes = useMemo(() => {
        const filtHeroes = heroes.slice();
        if (activeFilter.length === 0)
            return filtHeroes;
        else return filtHeroes.filter(item => activeFilter.includes(item.element))
    }, [heroes, activeFilter]);


    const onDelete = useCallback((id) => {
        deleteHeroRTK(id);
    }, []); 


    if (isLoading || isFetching) {
        return <Spinner/>;
    // } else if (heroesLoadingStatus === "error") {
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (heroes) => { 
        if (heroes.length === 0) {
            return (
                //без обертки зависнет надпись
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return heroes.map(({id, ...props}) => {
            return (
            <CSSTransition classNames="item" timeout={500} key={id} >
                <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
            </CSSTransition>
        )
            
               
        })
    }
    // const elements = renderHeroesList(filteredHeroes);
    const elements = renderHeroesList(filteredHeroes);
    return (
        
        <ul>
          <TransitionGroup component={null}>
            {elements}
          </TransitionGroup>
        </ul>
      
    )
}

export default HeroesList;