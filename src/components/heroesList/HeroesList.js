import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchHeroes } from '../../actions';
import { deleteHero, fetchHeroes, filteredHeroSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import './heroesList.css';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {


    const heroesLoadingStatus = useSelector(state => state.heroesSlice.heroesLoadingStatus);
    const filteredHeroes = useSelector(filteredHeroSelector)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
        // // dispatch(heroesFetching());
        // // dispatch('HEROES_FETCHING');
        // dispatch(heroesFetching);
        // request("http://localhost:3001/heroes")
        //     .then(data => dispatch(heroesFetched(data)))
        //     .catch(() => dispatch(heroesFetchingError()))
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')            
            .then(dispatch(deleteHero(id)))
            .then(console.log('Hero was deleted'))
            .catch((e) => console.log(e))
    }, [request]); 

  
    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (heroes) => { 
        if (heroes.length === 0) {
            return (
                //без обертки зависет надпись
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