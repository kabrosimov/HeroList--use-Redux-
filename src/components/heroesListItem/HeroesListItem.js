
import port from '../../assets/port.png'
import { deleteHero, heroesFetchingError } from '../../actions';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import '../heroesList/heroesList.css'
const HeroesListItem = ({name, description, element, id}) => {

    let elementClassName;
    const dispatch = useDispatch();
    const {request} = useHttp();
    const removeHeroFromDB = (id) => {
        // dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .catch(() => dispatch(heroesFetchingError()))
    }
    // console.log(name, description, element, id)
    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        
            <li 
                className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
                <img src={port}
                    className="img-fluid w-25 d-inline" 
                    alt="unknown hero" 
                    style={{'objectFit': 'cover'}}/>
                <div className="card-body">
                    
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text">{description}</p>
                </div>
                <span className="position-absolute top-0 start-100 translate-middle badge  border rounded-pill bg-light">
                    <button type="button" className="btn-close btn-close" aria-label="Close" onClick={() => {dispatch(deleteHero(id)); removeHeroFromDB(id)}}></button>
                </span>
            </li>
    )
}

export default HeroesListItem;