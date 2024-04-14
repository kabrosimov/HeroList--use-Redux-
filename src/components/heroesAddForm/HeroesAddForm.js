
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addHero, filtersFetching, filtersFetched, filtersFetchingError } from "../../actions";
import { useSelector } from "react-redux";
import { useHttp } from '../../hooks/http.hook';
import Spinner from "../spinner/Spinner";
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

    const [formData, setformData] = useState({
        name: '',
        description: '',
        element:''
    });
    // const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const {request} = useHttp();

    useEffect( () => {
        dispatch(filtersFetching())
         request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(dispatch(filtersFetchingError()));

    }, []); 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setformData(prevState => ({
          ...prevState,
          [name]: value        
        }))

    }


    const addHeroDB = (hero) => {
        // dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/`, 'POST', JSON.stringify(hero))
            .then(data => alert(`Hero ${data.name} was added`))
            .catch(data => console.log('Adding hero. Some error', data))
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const submitObj = {id: uuidv4(), ...formData }
        dispatch(addHero(submitObj));
        addHeroDB(submitObj)

       
    }
    const createSelect = (arr) => {
            const new_object = arr.map((item, i) => {
                    let t_v;                
                    for (let key in item) {
                        if (key !== 'all')
                            t_v = <option value={key} key={i}>{item[key]}</option>
                         }
                    return t_v                 
                });
                return new_object
        }
    const elements = createSelect(filters);
    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    

    
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
                    <option >Я владею элементом...</option>                    
                    {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;