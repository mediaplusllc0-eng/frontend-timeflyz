// components/MapWithInfoWindow.jsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useMemo, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import HotelInfoCard from "@/components/page-components/model/HotelInfoCard";

const MapAutoFocus = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, 13); // you can change zoom level here
    }
  }, [center, map]);

  return null;
};

const createPriceIcon = (price, isSelected = false) =>
  L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        position: relative;
        background: ${isSelected ? '#4B4D4D' : 'white'};
        color: ${isSelected ? 'white' : '#333'};
        padding: 6px 10px;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        white-space: nowrap;
        animation: ${isSelected ? 'bounce 0.6s ease' : 'none'};
      ">
        AED ${price}
        <div style="
          position: absolute;
          left: 50%;
          bottom: -6px;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid ${isSelected ? '#4B4D4D' : 'white'};
        "></div>
      </div>
    `,
    iconSize: [80, 40],
    iconAnchor: [40, 40],
  });


const MapWithInfoWindow = ({ selectedCity, hotelsData, selectedHotelProps }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const cityHotels = useMemo(() => {
    return hotelsData?.data
      ?.map((hotel) => ({
        ...hotel,
        lat: hotel?.location?.coordinates?.[1],
        lng: hotel?.location?.coordinates?.[0],
      }))
      .filter(
        (hotel) =>
          hotel.city?.toLowerCase().includes(selectedCity.toLowerCase()) &&
          hotel.lat !== undefined &&
          hotel.lng !== undefined
      );
  }, [hotelsData, selectedCity]);

  const [center, setCenter] = useState(cityHotels?.length
    ? [cityHotels[0].lat, cityHotels[0].lng]
    : [40.7128, -74.006]);

  useEffect(() => {
    if (selectedHotelProps) {
      setCenter([selectedHotelProps?.location?.coordinates[1], selectedHotelProps?.location?.coordinates[0]])
    }
  }, [selectedHotelProps])

  useEffect(() => {
    console.log(center)
  }, [center])

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapAutoFocus center={center} />

      {cityHotels?.map((hotel) => {
        const isSelected = selectedHotelProps?.id === hotel.id;
        return (
          <Marker
            key={hotel.id}
            position={[hotel.lat, hotel.lng]}
            icon={createPriceIcon(hotel.price, isSelected)}
            eventHandlers={{
              click: () => {
                setSelectedHotel(hotel);
              },
            }}
          >
            {selectedHotel?.id === hotel.id && (
              <Popup>
                <HotelInfoCard hotel={selectedHotel} />
              </Popup>
            )}
          </Marker>
        );
      })}
    </MapContainer>

  );
};

export default MapWithInfoWindow;
