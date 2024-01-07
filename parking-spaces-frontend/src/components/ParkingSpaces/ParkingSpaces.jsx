import './ParkingSpaces.css';
import ParkingSpacesList from './ParkingSpacesList/ParkingSpacesList';
import ParkingSpacesMap from './ParkingSpacesMap/ParkingSpacesMap';

function ParkingSpaces() {
  return (
    <section className="parking-spaces">
      <ParkingSpacesList />
      <ParkingSpacesMap />
    </section>
  );
}

export default ParkingSpaces;
