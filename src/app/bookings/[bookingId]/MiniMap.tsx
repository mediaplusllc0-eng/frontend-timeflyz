"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MiniMap = ({
  hotel,
  height = "100%",
  width = "100%",
  zoom = 15,
}: any) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: hotel.location.coordinates[0], lng: hotel.location.coordinates[1] },
          zoom,
          disableDefaultUI: true,
          gestureHandling: "none",
          clickableIcons: false,
        });

        new google.maps.Marker({
          position: { lat: hotel.location.coordinates[0], lng: hotel.location.coordinates[1] },
          map,
        //   label: {
        //     text: hotel.name,
        //     color: "white",
        //   },
        //   icon: {
        //     path: "M -10 0 a 4 4 0 0 1 4 -4 h 12 a 4 4 0 0 1 4 4 a 4 4 0 0 1 -4 4 h -12 a 4 4 0 0 1 -4 -4 Z",
        //     scale: 3,
        //     fillColor: "#6E69AC",
        //     fillOpacity: 1,
        //     strokeWeight: 1,
        //     strokeColor: "white",
        //   },
        });
      }
    });
  }, [hotel]);

  return (
    <div
      ref={mapRef}
      style={{ height, width }}
      className="rounded-xl overflow-hidden border"
    />
  );
};

export default MiniMap;
