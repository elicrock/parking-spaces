import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import { useDispatch } from 'react-redux';
import { useGetParkingsQuery } from './Api/pakingSpacesApi';
import { setParkingSpaces } from './redux/parkingSpaces/parkingsSlice';
import Preloader from './components/Preloader/Preloader';

function App() {
  const dispatch = useDispatch();

  const { data: parkingSpaces, isError, error, isLoading } = useGetParkingsQuery();

  useEffect(() => {
    if (parkingSpaces) {
      dispatch(setParkingSpaces(parkingSpaces));
    } else if (isError) {
      console.error('Произошла ошибка при получении парковочных пространств', error);
    }
  }, [dispatch, error, isError, parkingSpaces]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
