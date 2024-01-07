import './Main.css';
import CreateParkingSpace from '../CreateParkingSpace/CreateParkingSpace';
import ParkingSpaces from '../ParkingSpaces/ParkingSpaces';

function Main() {
  return (
    <main className="main">
      <h1 className="main__title">Парковочные пространства</h1>
      <CreateParkingSpace />
      <ParkingSpaces />
    </main>
  );
}

export default Main;
