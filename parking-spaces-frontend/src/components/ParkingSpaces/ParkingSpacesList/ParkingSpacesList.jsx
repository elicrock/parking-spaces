import ParkingSpaceItem from './ParkingSpaceItem/ParkingSpaceItem';
import ParkingSpacesDetails from './ParkingSpacesDetails/ParkingSpacesDetails';
import './ParkingSpacesList.css';

function ParkingSpacesList({
  parkingSpaces,
  selectedSpace,
  setSelectedSpace,
  isAllItemsActive,
  handleAllItemClick,
  handleItemClick,
}) {
  return (
    <div className="parking-spaces__contrainer">
      <ul className="parking-spaces__list">
        <li
          className={`parking-spaces__item parking-spaces__all-items ${
            isAllItemsActive ? 'parking-spaces__all-items_active' : ''
          }`}
          onClick={handleAllItemClick}
        >
          Все парковочные пространства
        </li>
        {parkingSpaces
          .map(parkingSpace => (
            <ParkingSpaceItem
              key={parkingSpace._id}
              parkingSpace={parkingSpace}
              handleItemClick={handleItemClick}
              isActive={selectedSpace && selectedSpace._id === parkingSpace._id}
            />
          ))
          .reverse()}
      </ul>
      <ParkingSpacesDetails parkingSpace={selectedSpace} setSelectedSpace={setSelectedSpace} />
    </div>
  );
}

export default ParkingSpacesList;
