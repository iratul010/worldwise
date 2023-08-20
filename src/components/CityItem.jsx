import PropTypes from 'prop-types';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
const formatDate = (date, local) =>
  new Intl.DateTimeFormat(local || 'en', {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
  const local  = navigator.language;
  const check = formatDate(new Date(), local);

function CityItem({city}) {
  const {currentCity,deleteCity} = useCities();
   const {cityName, emoji,date,id, position} = city;
   const {lat,lng} = position;

   function handleClick(e){
    e.preventDefault();
    deleteCity(id)
   }
 
    return (
        <li>
        <Link  className={`${styles.cityItem} ${id===currentCity.id? styles[`cityItem--active`]: ''}`} to={`${id}?lat=${ lat}&lng=${ lng}`}>
        <span className={styles.emoji}>{emoji}</span> 
        <h3 className={styles.name}>{cityName}</h3> 
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={ handleClick
        }>&times;</button>
        </Link>
        </li>
    )
}
/** {
    "cityName": "Madrid",
    "country": "Spain",
    "emoji": "🇪🇸",
    "date": "2027-07-15T08:22:53.976Z",
    "notes": "",
    "position": {
      "lat": 40.46635901755316,
      "lng": -3.7133789062500004
    },
    "id": 17806751
  }, */
CityItem.propTypes = {
    city: PropTypes.shape({
      cityName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  };
  

export default CityItem
