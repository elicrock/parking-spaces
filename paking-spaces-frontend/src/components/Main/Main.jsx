import './Main.css';
import CreateParkingSpace from '../CreateParkingSpace/CreateParkingSpace';

function Main() {
  return (
    <main className="main">
      <h1 className="main__title">Парковочные пространства</h1>
      <CreateParkingSpace />
    </main>
  );
}

export default Main;
