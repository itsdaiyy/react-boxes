import { useStations } from "@/hooks/useStations";

import Spinner from "@/components/Spinner";
import ErrorMessage from "./ErrorMessage";
import MapNav from "./MapNav";

function Map() {
  const { stations, isLoadingStations, stationsError } = useStations();

  if (isLoadingStations) return <Spinner />;
  if (stationsError) return <ErrorMessage error={stationsError} />;

  return (
    <>
      <MapNav />
      <main>
        <h3>Map</h3>
        <ul className="mx-4 list-disc px-8">
          {stations.map((station) => (
            <li key={station.id}>{station.station_name}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Map;
Map;
