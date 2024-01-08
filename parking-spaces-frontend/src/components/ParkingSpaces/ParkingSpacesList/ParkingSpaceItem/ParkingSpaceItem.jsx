import './ParkingSpaceItem.css';

function ParkingSpaceItem({ parkingSpace, handleItemClick, isActive }) {
  return (
    <li
      className={`parking-spaces__item ${isActive ? 'parking-spaces__item_active' : ''}`}
      onClick={() => handleItemClick(parkingSpace)}
    >
      <h3 className="parking-spaces__title">{parkingSpace.name}</h3>
    </li>
  );
}

export default ParkingSpaceItem;
