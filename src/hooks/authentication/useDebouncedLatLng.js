import { useEffect, useRef, useState } from "react";
import { extractRoadName } from "@/utils/helpers";
import debounce from "lodash.debounce";

export function useDebouncedLatLng({ setFromErrorMessage }) {
  const [latLng, setLatLng] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const debouncedFetch = useRef(null);

  useEffect(() => {
    debouncedFetch.current = debounce(async (query) => {
      const extractQuery = extractRoadName(query);
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(extractQuery)}`,
        );
        const data = await res.json();

        if (data.length > 0) {
          setLatLng({
            latitude: Number(data[0].lat),
            longitude: Number(data[0].lon),
          });
        } else {
          setLatLng(null);
          setFromErrorMessage(`無法找到地址：${query}`);
          setErrorMessage(`無法找到地址：${query}`);
        }
      } catch (error) {
        setLatLng(null);
        console.error("Error fetching lat/lng:", error);
        setFromErrorMessage(`查詢地址失敗，請稍後再嘗試`);
        setErrorMessage(`無法找到地址：${query}`);
      } finally {
        setIsLoading(false);
      }
    }, 600);

    return () => {
      debouncedFetch.current?.cancel();
    };
  }, [setFromErrorMessage]);

  function fetchLatLng(input) {
    if (input.length >= 5) {
      debouncedFetch.current?.(input);
    }
  }

  return { latLng, fetchLatLng, isLoading, errorMessage };
}
