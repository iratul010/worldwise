import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
  const {
    isLoading :isLoadingPosition, 
    position:geolocationPosition,
     getPosition} = useGeolocation();
  const {cities} = useCities();
  const [mapPositions,setMapPositions]= useState( [40,0]);


    const[mapLat,mapLng] = useUrlPosition();
    useEffect(()=>{
      if(mapLat && mapLng)  setMapPositions([mapLat,mapLng]) 
    } ,[mapLat,mapLng])

    useEffect(()=>{
      if(geolocationPosition) setMapPositions([geolocationPosition.lat,geolocationPosition.lng])
    },[geolocationPosition])
    return (
        <div className={styles.mapContainer} >
        {!geolocationPosition&& <Button type='position' onClick={getPosition}>
        {
         isLoadingPosition?'Loading...':'Use Your Position'
        }
        </Button>}
        <MapContainer 
        center={ mapPositions}
         className={styles.map}  zoom={6} scrollWheelZoom={true}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
       { cities.map((city)=>( <Marker position={ [city.position.lat,city.position.lng]} key={city.id}>
          <Popup>
           <span>{city.emoji}</span><span>{city.cityName}</span>
          </Popup>
        </Marker>)
        )}<DetectClick/>
        <ChangeCenter  position={mapPositions}/>
      </MapContainer>
        </div>
    )
}
// eslint-disable-next-line react/prop-types
function ChangeCenter({position}){
  const map  = useMap();
  map.setView(position);
  return null;
}
function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({

    click:(e)=> {
      console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)}
  })
}
export default Map
