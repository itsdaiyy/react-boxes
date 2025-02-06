import { useStations } from "@/hooks/useStations";

import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";
import MapNav from "@/components/MapNav";
import ErrorMessage from "@/components/ErrorMessage";

function Map() {
  const { stations, isLoadingStations, stationsError } = useStations();
  //  寫法 1.
  //  比較建議的寫法是提早 return ，但在這裡 return 的話 Nav 與 Footer 不會顯示
  //  因此建議可以再拉一層 component 放在 Map component 的 main 裡面
  //  然後於該 component 呼叫 useStations

  // if (isLoadingStations) return <Spinner />;
  // if (stationsError) return <ErrorMessage error={stationsError} />;

  return (
    <div>
      <MapNav />
      {/* 寫法 2. 在 return 內部判斷 */}
      <main>
        {isLoadingStations && <Spinner />}
        {stationsError && <ErrorMessage errorMessage={stationsError.message} />}
        {!isLoadingStations && !stationsError && (
          <ul className="mx-4 list-disc px-8">
            {stations.map((station) => (
              <li key={station.id}>{station.station_name}</li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Map;
