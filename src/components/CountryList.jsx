 
 
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
 import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext';
//  import PropTypes from 'prop-types';
function CountryList( ) {
  const {cities,isLoading} = useCities();
 
   if(isLoading){
    return <Spinner/>
   }
   if(!cities.length){
    return <Message message='Add Your First City on by clicking on the map'/>
   }
   const countries = cities.reduce((arr,city)=> 
   {
    if(!arr.map(el=>el.country).includes(city.country)) 
    return [...arr,{country: city.country,emoji: city.emoji}];
    else return arr;
   },[]);
   
    return (
        <ul className={styles.countryList}>
            {
                countries.map((country,i)=><CountryItem key={country.country} country={country}/>)
            }
        </ul>
    )
}
// CountryList.propTypes = {
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
  
export default CountryList;
