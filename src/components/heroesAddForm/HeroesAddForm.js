
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
// import { fetchFilter } from "../../actions";
import { fetchFilter, selectAll } from "../heroesFilters/filtersSlice";
import { useSelector } from "react-redux";
import { useHttp } from '../../hooks/http.hook';
import { useCreateHeroMutation } from "../../api/apiSlice";
// import store from "../../store";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const initialState = {
        name: '',
        description: '',
        element:''
    }
    const [formData, setformData] = useState(initialState);
    const dispatch = useDispatch();
    const { filtersLoadingStatus} = useSelector(state => state.filtersSlice);
    const listAllFilter = useSelector(selectAll);
    const [createHeroRTK] = useCreateHeroMutation();

    useEffect( () => {
        dispatch(fetchFilter());
    }, []); 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setformData(prevState => ({
          ...prevState,
          [name]: value        
        }))

    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const submitObj = {id: uuidv4(), ...formData }
        createHeroRTK(submitObj).unwrap();
        setformData(initialState)              
    }
      
    const renderFilters = (filters) => {
        if (filtersLoadingStatus === "loading") {
            return <option>Загрузка элементов...</option>;
        } else if (filtersLoadingStatus === "error") {
            return <option>Ошибка загрузки</option>
        }
        const newSelectOptions = filters.map(({key, name}) => {             
            if (key === 'all')
                return
            return <option value={key} key={key}>{name}</option>                   
        });
        return (
            <>
                <option >Я владею элементом...</option> 
                {newSelectOptions}
            </>
            )
    }
    // const elements = renderFilters(filters);
    const elements = renderFilters(listAllFilter);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmitForm}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    onChange={handleChange}
                    value={formData.description}
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    onChange={handleChange}
                    value={formData.element}
                    name="element">                   
                    {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;