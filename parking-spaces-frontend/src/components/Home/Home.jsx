import { useState } from 'react';
import './Home.css';
import CreateParkingSpace from '../CreateParkingSpace/CreateParkingSpace';
import ParkingSpaces from '../ParkingSpaces/ParkingSpaces';

function Home() {
  const [selectedSpace, setSelectedSpace] = useState(null);

  return (
    <main className="main">
      <h1 className="main__title">Парковочные пространства</h1>
      <CreateParkingSpace setSelectedSpace={setSelectedSpace} />
      <ParkingSpaces selectedSpace={selectedSpace} setSelectedSpace={setSelectedSpace} />
    </main>
  );
}

export default Home;
