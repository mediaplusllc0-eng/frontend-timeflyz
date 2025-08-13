// components/MapWithInfoWindow.jsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useMemo, useEffect, useRef } from "react";
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

const createPriceIcon = (price, isSelected = false, currency) =>
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
        text-align: center
      ">
        ${currency} ${price}
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
    iconSize: [100, 40],
    iconAnchor: [40, 40],
  });


const MapWithInfoWindow = ({ selectedCity, hotelsData, selectedHotelProps }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const cityHotels = useMemo(() => {
    return hotelsData?.data?.itineraries
  }, [hotelsData, selectedCity]);

  const [center, setCenter] = useState(cityHotels?.length
    ? [cityHotels[0].latitude ? cityHotels[0].latitude : 0, cityHotels[0].longitude ? cityHotels[0].longitude : 0]
    : [40.7128, -74.006]);

  useEffect(() => {
    if (selectedHotelProps) {
      setSelectedHotel(selectedHotelProps)
       setHoveredHotelId(null);
      setCenter([selectedHotelProps?.latitude ? selectedHotelProps?.latitude : 0, selectedHotelProps?.longitude ? selectedHotelProps?.longitude : 0])
    }
  }, [selectedHotelProps])

  useEffect(() => {
    console.log(center)
  }, [center])

  const popupRefs = useRef({});
  const [hoveredHotelId, setHoveredHotelId] = useState(null);

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
        const isSelected = selectedHotel?.twxHotelId === hotel.twxHotelId;
        const isHovered = hoveredHotelId === hotel.twxHotelId;
        const shouldHighlight = isSelected || isHovered;
        return (
          <Marker
            key={hotel.twxHotelId}
            position={[hotel.latitude ? hotel.latitude : 0, hotel.longitude ? hotel.longitude : 0]}
            icon={createPriceIcon(
              hotel?.perNightArray[0]?.price,
              shouldHighlight,
              hotel?.perNightArray[0]?.currency
            )}
            zIndexOffset={isSelected ? 1000 : 0} // 👈 this makes selected marker float on top
            eventHandlers={{
              click: () => {
                setSelectedHotel(hotel);
                const ref = popupRefs.current[hotel.twxHotelId];
                if (ref) {
                  ref.openOn(ref._map);
                }
              },
              mouseover: () => {
                setSelectedHotel(hotel);
                setHoveredHotelId(hotel.twxHotelId)
              }
              ,
              mouseout: () => {
                if (hoveredHotelId !== selectedHotel?.twxHotelId) {
                  setHoveredHotelId(null);
                }
              }
            }}
          >
            <Popup ref={(ref) => {
              if (ref) popupRefs.current[hotel.twxHotelId] = ref;
            }}>
              <HotelInfoCard hotel={hotel} />
            </Popup>
          </Marker>

        );
      })}
    </MapContainer>

  );
};

export default MapWithInfoWindow;
