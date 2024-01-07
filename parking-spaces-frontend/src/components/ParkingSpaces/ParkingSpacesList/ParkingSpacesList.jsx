import ParkingSpaceItem from './ParkingSpaceItem/ParkingSpaceItem';
import './ParkingSpacesList.css';

function ParkingSpacesList() {
  return (
    <ul className="parking-spaces__list">
      <ParkingSpaceItem />
    </ul>
  );
}

export default ParkingSpacesList;
