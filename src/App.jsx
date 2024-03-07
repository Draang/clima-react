import { useEffect, useState } from "react";

function App() {
  const [geoLoc, setGeoLoc] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    if (!Object.values(geoLoc).includes(0)) {
      apiCall();
    }
  }, [geoLoc]);
  async function apiCall() {
    const req = await fetch(
      `${import.meta.env.VITE_URL_CLIMA_API}&lat=${geoLoc.lat}&lon=${
        geoLoc.lon
      }`
    );
    const res = await req.json();
    console.log(res);
  }
  function getLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(success, fail);
    else fail();
  }

  function success(position) {
    setGeoLoc({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  }

  function fail() {
    //TODO: crear alerta que no se puede acceder a ubicacion
    setGeoLoc({
      lat: 0,
      lon: 0,
    });
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl font-bold py-5">Clima Actual</h1>
      </div>
    </>
  );
}

export default App;
