import { useState } from "react";
import { Button } from "./ui/button";

import { useStation } from "@/hooks/useStation";
import { useStations } from "@/hooks/useStations";

import MapNav from "./MapNav";
import Spinner from "@/components/Spinner";
import ErrorMessage from "./ErrorMessage";

function Map() {
  const [clickedId, setClickedId] = useState(null);
  const { stations, isLoadingStations, stationsError } = useStations();
  const { station, isLoadingStation, stationError } = useStation(clickedId);

  if (isLoadingStations) return <Spinner />;
  if (stationsError) return <ErrorMessage error={stationsError} />;

  return (
    <>
      <MapNav />
      <main>
        <h3>Map</h3>
        <div className="my-10">
          <h4>營業時間</h4>
          {isLoadingStation && <Spinner />}
          {station && (
            <ul>
              {station.station_daily_hours.map((el) => (
                <li key={el.id}>open time: {el.open_time}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4>所有站點</h4>
          <ul className="mx-4 list-disc px-8">
            {stations.map((station) => (
              <li key={station.id}>
                {station.station_name}
                <Button
                  className="ms-4"
                  onClick={() => setClickedId(station.id)}
                  variant="outline"
                >
                  click me!
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Map;
