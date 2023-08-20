 
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
 import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext';
//  import PropTypes from 'prop-types';
function CityList() {
  const  {cities,isLoading} = useCities();
 
    
   if(isLoading){
    return <Spinner/>
   }
   if(!cities.length){
    return <Message message='Add Your First City on by clicking on the map'/>
   }
    return (
        <ul className={styles.cityList}>
            {
                cities.map((city,i)=><CityItem key={i} city={city}/>)
            }
        </ul>
    )
}
// CityList.propTypes = {
//     cities: PropTypes.arrayOf(
//       PropTypes.shape({
//         cityName: PropTypes.string.isRequired,
//         country: PropTypes.string.isRequired,
//         emoji: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//         notes: PropTypes.string.isRequired,
//         position: PropTypes.shape({
//           lat: PropTypes.number.isRequired,
//           lng: PropTypes.number.isRequired,
//         }).isRequired,
//         id: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//     isLoading: PropTypes.bool.isRequired, // Corrected from PropTypes.boolean to PropTypes.bool
//   };
  
export default CityList;
