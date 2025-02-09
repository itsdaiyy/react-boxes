import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { useStation } from "@/hooks/useStation";

function StationInfo() {
  const { station, isLoadingStation, stationError } = useStation();

  if (isLoadingStation) return <Spinner />;
  if (stationError) return <ErrorMessage errorMessage={stationError.message} />;

  return (
    <>
      <Header />
      <main>
        2-2 回收站點詳細資訊頁
        <p>{station.station_name}</p>
      </main>
    </>
  );
}

export default StationInfo;
