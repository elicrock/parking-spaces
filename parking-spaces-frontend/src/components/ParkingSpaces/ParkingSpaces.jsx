import { useState } from 'react';
import './ParkingSpaces.css';
import ParkingSpacesList from './ParkingSpacesList/ParkingSpacesList';
import ParkingSpacesMap from './ParkingSpacesMap/ParkingSpacesMap';
import { useSelector } from 'react-redux';

function ParkingSpaces({ selectedSpace, setSelectedSpace }) {
  const parkingSpaces = useSelector(state => state.parkings);
  const [isAllItemsActive, setIsAllItemsActive] = useState(false);

  const handleItemClick = item => {
    setSelectedSpace(item);
    setIsAllItemsActive(false);
  };

  const handleAllItemClick = () => {
    setSelectedSpace(null);
    setIsAllItemsActive(true);
  };

  if (parkingSpaces.length === 0) {
    return (
      <section className="parking-spaces">
        <h3 className="parking-spaces__empty">У вас ещё нет созданных парковочных пространств</h3>
      </section>
    );
  }

  return (
    <section className="parking-spaces">
      <ParkingSpacesList
        parkingSpaces={parkingSpaces}
        handleItemClick={handleItemClick}
        handleAllItemClick={handleAllItemClick}
        selectedSpace={selectedSpace}
        setSelectedSpace={setSelectedSpace}
        isAllItemsActive={isAllItemsActive}
      />
      <ParkingSpacesMap parkingSpaces={parkingSpaces} selectedSpace={selectedSpace} />
    </section>
  );
}

export default ParkingSpaces;
