"use client";

import HotelInfoCard from "@/components/page-components/model/HotelInfoCard";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import CustomOverlay from "./CustomOverlay";

interface Hotel {
  id: number;
  name: string;
  lat: number;
  lng: number;
  price: string;
  originalPrice?: string;
  discount?: number;
  description: string;
  rating: number;
  reviews: number;
  images: string[];
  slots: {
    startTime: string;
    endTime: string;
    price: number;
    _id: string;
    isAvailable: boolean;
  }[];
  times: string[];
  city: string;
  isFavorite: boolean;
}

interface Props {
  selectedCity: any;
  hotelsData: { data: Hotel[] };
}

const MapWithInfoWindow = ({ selectedCity, hotelsData }: Props) => {
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  const [zoomLevel, setZoomLevel] = useState<number | null>(null);

  useEffect(() => {
    if (mapInstance.current) {
      const listener = mapInstance.current.addListener("zoom_changed", () => {
        setZoomLevel(mapInstance.current!.getZoom()!);
      });
      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [isMapReady]);

  const mappedHotels: Hotel[] =
    hotelsData?.data?.map((hotel: any) => ({
      ...hotel,
      lat: hotel.location?.coordinates?.[1],
      lng: hotel.location?.coordinates?.[0],
    })) || [];

  // Load Google Map
  useEffect(() => {
    if (!mapApiKey) {
      console.error("Google Maps API key is not defined");
      return;
    }

    const loader = new Loader({
      apiKey: mapApiKey,
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (mapRef.current && !mapInstance.current && window.google) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.006 }, // Default center (New York)
          zoom: 13,
        });
        setIsMapReady(true);
      }
    });
  }, [mapApiKey]);

  // Handle markers and map clicks
  useEffect(() => {
    if (!isMapReady || !selectedCity || !mapInstance.current) return;

    const cityHotels = mappedHotels.filter((hotel) =>
      hotel.city.toLowerCase().includes(selectedCity.toLowerCase())
    );

    // Clear old markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Clear any previous map click listeners
    google.maps.event.clearListeners(mapInstance.current, "click");

    // Add markers
    cityHotels.forEach((hotel) => {
      const marker = new google.maps.Marker({
        position: { lat: hotel.lat, lng: hotel.lng },
        map: mapInstance.current!,
        label: { text: `${hotel.price}`, color: "white" },
        icon: {
          path: "M -10 0 a 4 4 0 0 1 4 -4 h 12 a 4 4 0 0 1 4 4 a 4 4 0 0 1 -4 4 h -12 a 4 4 0 0 1 -4 -4 Z",
          scale: 3,
          fillColor: "#6E69AC",
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "white",
        },
      });

      marker.addListener("click", (e: any) => {
        e.stop();
        setSelectedHotel(hotel);
      });

      markersRef.current.push(marker);
    });

    // Center on first hotel
    if (cityHotels.length > 0) {
      mapInstance.current.setCenter({
        lat: cityHotels[0].lat,
        lng: cityHotels[0].lng,
      });
    }

    // 🆕 Click on map anywhere to close popup
    mapInstance.current.addListener("click", () => {
      setSelectedHotel(null);
    });

    return () => {
      google.maps.event.clearListeners(mapInstance.current!, "click");
    };
  }, [isMapReady, selectedCity]);

  // Pan to selected hotel
  useEffect(() => {
    if (!selectedHotel || !mapInstance.current) return;

    mapInstance.current.panTo({
      lat: selectedHotel.lat,
      lng: selectedHotel.lng,
    });
  }, [selectedHotel]);

  return (
    <div ref={mapRef} className="absolute inset-0 w-full h-full z-0">
      {selectedHotel && mapInstance.current && (
        <CustomOverlay
          key={`${selectedHotel.id}-${zoomLevel}`}
          map={mapInstance.current}
          position={
            new google.maps.LatLng(selectedHotel.lat, selectedHotel.lng)
          }
        >
          <div onClick={(e) => e.stopPropagation()}>
            <HotelInfoCard hotel={selectedHotel} />
          </div>
        </CustomOverlay>
      )}
    </div>
  );
};

export default MapWithInfoWindow;
