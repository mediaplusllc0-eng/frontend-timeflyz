"use client";
import React, { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  StarIcon,
  StarHalf,
  Clock,
  Calendar,
  Euro,
  Coffee,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import FilterButton from "@/components/page-components/slots/FilterButton";
import Navbar from "@/components/layout/Header";
import FilterDropdown from "@/components/page-components/slots/FilterDropdown";
import PortalDropdown from "@/components/ui/PortalDropdown";
import HotelList from "@/components/page-components/slots/HotelList";
import HotelInfoCard from "@/components/page-components/model/HotelInfoCard";
import ReactDOMServer from "react-dom/server";

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
  image: string;
  times: string[];
  place: string;
}

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Hôtel Le Petit Oberkampf",
    lat: 40.7128,
    lng: -74.006,
    price: "$170",
    rating: 3.9,
    description: "Near Central Park",
    reviews: 2,
    image: "/img/slot/slot1.jpg",
    times: ["10am - 4pm", "5pm - 11pm"],
    place: "Paris",
  },
  {
    id: 2,
    name: "greet Hôtel Boulogne Billancourt Paris",
    lat: 40.7128,
    lng: -74.006,
    price: "$69",
    rating: 4.0,
    description: "Near Central Park",
    reviews: 10,
    image: "/img/slot/slot2.jpg",
    times: ["11am - 4pm"],
    place: "Paris",
  },
  {
    id: 3,
    name: "Le Grand Hotel Paris",
    lat: 40.7128,
    lng: -74.003,
    price: "$250",
    rating: 4.8,
    description: "Near Central Park",
    reviews: 156,
    image: "/img/slot/slot3.jpg",
    times: ["9am - 3pm", "4pm - 10pm"],
    place: "Paris",
  },
  {
    id: 4,
    name: "Luxury Spa & Resort",
    lat: 40.7128,
    lng: -74.001,
    price: "$189",
    rating: 4.6,
    description: "Near Central Park",
    reviews: 89,
    image: "/img/slot/slot4.jpg",
    times: ["10am - 5pm"],
    place: "Paris",
  },
  {
    id: 5,
    name: "Cozy Boutique Hotel",
    lat: 40.7128,
    lng: -74.002,
    price: "$120",
    rating: 4.3,
    description: "Near Central Park",
    reviews: 45,
    image: "/img/slot/slot5.jpg",
    times: ["11am - 4pm", "6pm - 11pm"],
    place: "Paris",
  },
  {
    id: 6,
    name: "Seine River View Hotel",
    lat: 40.7128,
    lng: -74.004,
    price: "$220",
    rating: 4.7,
    description: "Near Central Park",
    reviews: 123,
    image: "/img/slot/slot6.jpg",
    times: ["9am - 2pm", "3pm - 8pm"],
    place: "Paris",
  },
  {
    id: 7,
    name: "Historic Palace Hotel",
    lat: 40.7128,
    lng: -74.005,
    price: "$290",
    rating: 4.9,
    description: "Near Central Park",
    reviews: 178,
    image: "/img/slot/slot7.jpg",
    times: ["10am - 4pm", "5pm - 10pm"],
    place: "Paris",
  },
  {
    id: 8,
    name: "Modern City Center Hotel",
    lat: 40.7128,
    lng: -74.007,
    price: "$150",
    rating: 4.2,
    description: "Near Central Park",
    reviews: 67,
    image: "/img/slot/slot8.jpg",
    times: ["11am - 5pm"],
    place: "Paris",
  },
  {
    id: 9,
    name: "Artistic Quarter Hotel",
    lat: 40.7128,
    lng: -74.008,
    price: "$175",
    rating: 4.5,
    description: "Near Central Park",
    reviews: 92,
    image: "/img/slot/slot9.jpg",
    times: ["10am - 3pm", "4pm - 9pm"],
    place: "Paris",
  },
  {
    id: 10,
    name: "Eiffel View Boutique",
    lat: 40.7128,
    lng: -74.00912,
    price: "$280",
    rating: 4.8,
    description: "Near Central Park",
    reviews: 145,
    image: "/img/slot/slot10.jpg",
    times: ["9am - 4pm", "5pm - 11pm"],
    place: "Paris",
  },
  // London (5)
  {
    id: 11,
    name: "London Bridge Suites",
    lat: 51.5079,
    lng: -0.0877,
    price: "$180",
    rating: 4.3,
    description: "Near London Bridge",
    reviews: 98,
    image: "/img/slot/london1.jpg",
    times: ["11am - 4pm"],
    place: "London",
  },
  {
    id: 12,
    name: "Westminster Palace Hotel",
    lat: 51.4995,
    lng: -0.1248,
    price: "$220",
    rating: 4.7,
    description: "Near Westminster Abbey",
    reviews: 130,
    image: "/img/slot/london2.jpg",
    times: ["10am - 4pm", "5pm - 11pm"],
    place: "London",
  },
  {
    id: 13,
    name: "Hyde Park Boutique",
    lat: 51.5074,
    lng: -0.1657,
    price: "$140",
    rating: 4.2,
    description: "Near Hyde Park",
    reviews: 76,
    image: "/img/slot/london3.jpg",
    times: ["9am - 3pm"],
    place: "London",
  },
  {
    id: 14,
    name: "Piccadilly Grand Hotel",
    lat: 51.5101,
    lng: -0.1337,
    price: "$260",
    rating: 4.8,
    description: "Near Piccadilly Circus",
    reviews: 200,
    image: "/img/slot/london4.jpg",
    times: ["10am - 5pm"],
    place: "London",
  },
  {
    id: 15,
    name: "Chelsea Riverside Inn",
    lat: 51.4847,
    lng: -0.178,
    price: "$160",
    rating: 4.1,
    description: "Chelsea Area",
    reviews: 63,
    image: "/img/slot/london5.jpg",
    times: ["11am - 4pm", "6pm - 11pm"],
    place: "London",
  },
  // Thailand (5)
  {
    id: 16,
    name: "Bangkok Riverside Hotel",
    lat: 13.7367,
    lng: 100.5231,
    price: "$90",
    rating: 4.2,
    description: "Near Chao Phraya River",
    reviews: 75,
    image: "/img/slot/thailand1.jpg",
    times: ["9am - 3pm"],
    place: "Thailand",
  },
  {
    id: 17,
    name: "Phuket Beach Resort",
    lat: 7.8804,
    lng: 98.3923,
    price: "$120",
    rating: 4.5,
    description: "Patong Beach",
    reviews: 110,
    image: "/img/slot/thailand2.jpg",
    times: ["10am - 4pm", "5pm - 11pm"],
    place: "Thailand",
  },
  {
    id: 18,
    name: "Chiang Mai Old Town Inn",
    lat: 18.7883,
    lng: 98.9853,
    price: "$70",
    rating: 4.0,
    description: "Old City Area",
    reviews: 56,
    image: "/img/slot/thailand3.jpg",
    times: ["11am - 4pm"],
    place: "Thailand",
  },
  {
    id: 19,
    name: "Krabi Cliffside Retreat",
    lat: 8.0863,
    lng: 98.9063,
    price: "$110",
    rating: 4.3,
    description: "Near Ao Nang Beach",
    reviews: 78,
    image: "/img/slot/thailand4.jpg",
    times: ["10am - 5pm"],
    place: "Thailand",
  },
  {
    id: 20,
    name: "Pattaya Bay Hotel",
    lat: 12.9236,
    lng: 100.8825,
    price: "$95",
    rating: 3.9,
    description: "Pattaya Beachfront",
    reviews: 49,
    image: "/img/slot/thailand5.jpg",
    times: ["11am - 4pm", "6pm - 11pm"],
    place: "Thailand",
  },
  // Surat (10)
  {
    id: 21,
    name: "Surat Diamond Plaza",
    lat: 21.1702,
    lng: 72.8311,
    price: "$60",
    rating: 4.1,
    description: "Near Diamond Market",
    reviews: 60,
    image: "/img/slot/surat1.jpg",
    times: ["10am - 4pm"],
    place: "Surat",
  },
  {
    id: 22,
    name: "Tapti Riverside Hotel",
    lat: 21.185,
    lng: 72.818,
    price: "$75",
    rating: 4.3,
    description: "Near Tapti River",
    reviews: 40,
    image: "/img/slot/surat2.jpg",
    times: ["11am - 4pm"],
    place: "Surat",
  },
  {
    id: 23,
    name: "Surat Central Inn",
    lat: 21.1702,
    lng: 72.8311,
    price: "$55",
    rating: 3.8,
    description: "City Center",
    reviews: 25,
    image: "/img/slot/surat3.jpg",
    times: ["9am - 3pm", "4pm - 10pm"],
    place: "Surat",
  },
  {
    id: 24,
    name: "Hazira Beach Resort",
    lat: 21.12,
    lng: 72.65,
    price: "$80",
    rating: 4.4,
    description: "Near Hazira Beach",
    reviews: 67,
    image: "/img/slot/surat4.jpg",
    times: ["10am - 5pm"],
    place: "Surat",
  },
  {
    id: 25,
    name: "Surat Luxury Palace",
    lat: 21.1702,
    lng: 72.8311,
    price: "$100",
    rating: 4.6,
    description: "Luxury stay in Surat",
    reviews: 98,
    image: "/img/slot/surat5.jpg",
    times: ["11am - 4pm", "6pm - 11pm"],
    place: "Surat",
  },
  {
    id: 26,
    name: "Ring Road Residency",
    lat: 21.1689,
    lng: 72.8267,
    price: "$65",
    rating: 4.0,
    description: "Near Ring Road",
    reviews: 32,
    image: "/img/slot/surat6.jpg",
    times: ["9am - 2pm", "3pm - 8pm"],
    place: "Surat",
  },
  {
    id: 27,
    name: "Dumas Beach Hotel",
    lat: 21.0755,
    lng: 72.6381,
    price: "$85",
    rating: 4.2,
    description: "Near Dumas Beach",
    reviews: 58,
    image: "/img/slot/surat7.jpg",
    times: ["10am - 4pm", "5pm - 10pm"],
    place: "Surat",
  },
  {
    id: 28,
    name: "Sahara Gateway Inn",
    lat: 21.1702,
    lng: 72.8311,
    price: "$70",
    rating: 4.0,
    description: "Gateway to Sahara Darwaja",
    reviews: 20,
    image: "/img/slot/surat8.jpg",
    times: ["11am - 5pm"],
    place: "Surat",
  },
  {
    id: 29,
    name: "Udhna Comfort Suites",
    lat: 21.1702,
    lng: 72.8311,
    price: "$60",
    rating: 3.9,
    description: "Udhna Area",
    reviews: 18,
    image: "/img/slot/surat9.jpg",
    times: ["10am - 3pm", "4pm - 9pm"],
    place: "Surat",
  },
  {
    id: 30,
    name: "Vesu Urban Hotel",
    lat: 21.141,
    lng: 72.78,
    price: "$95",
    rating: 4.3,
    description: "Vesu Area",
    reviews: 42,
    image: "/img/slot/surat10.jpg",
    times: ["9am - 4pm", "5pm - 11pm"],
    place: "Surat",
  },
  // Other (5)
  {
    id: 31,
    name: "Sydney Opera View",
    lat: -33.8568,
    lng: 151.2153,
    price: "$210",
    rating: 4.7,
    description: "Near Opera House",
    reviews: 130,
    image: "/img/slot/slot1.jpg",
    times: ["10am - 4pm"],
    place: "Sydney",
  },
  {
    id: 32,
    name: "New York Central Hotel",
    lat: 40.758,
    lng: -73.9855,
    price: "$250",
    rating: 4.8,
    description: "Near Times Square",
    reviews: 210,
    image: "/img/slot/slot2.jpg",
    times: ["11am - 4pm"],
    place: "New York",
  },
  {
    id: 33,
    name: "Tokyo Shibuya Stay",
    lat: 35.658,
    lng: 139.7016,
    price: "$180",
    rating: 4.5,
    description: "Shibuya District",
    reviews: 90,
    image: "/img/slot/slot3.jpg",
    times: ["9am - 3pm"],
    place: "Tokyo",
  },
  {
    id: 34,
    name: "Cape Town Waterfront Inn",
    lat: -33.9079,
    lng: 18.42,
    price: "$130",
    rating: 4.3,
    description: "Waterfront Area",
    reviews: 60,
    image: "/img/slot/slot4.jpg",
    times: ["10am - 5pm"],
    place: "Cape Town",
  },
  {
    id: 35,
    name: "Rome Colosseum Suites",
    lat: 41.8902,
    lng: 12.4922,
    price: "$170",
    rating: 4.6,
    description: "Near Colosseum",
    reviews: 120,
    image: "/img/slot/slot5.jpg",
    times: ["11am - 4pm", "6pm - 11pm"],
    place: "Rome",
  },
  {
    id: 36,
    name: "Dubai Marina View Hotel",
    lat: 25.08,
    lng: 55.14,
    price: "$200",
    rating: 4.5,
    description: "Near Marina Walk",
    reviews: 120,
    image: "/img/slot/slot6.jpg",
    times: ["10am - 4pm", "5pm - 11pm"],
    place: "Dubai",
  },
  {
    id: 37,
    name: "Palm Jumeirah Resort",
    lat: 25.1122,
    lng: 55.1385,
    price: "$320",
    rating: 4.8,
    description: "On Palm Jumeirah",
    reviews: 210,
    image: "/img/slot/slot7.jpg",
    times: ["11am - 4pm"],
    place: "Dubai",
  },
  {
    id: 38,
    name: "Downtown Dubai Suites",
    lat: 25.1972,
    lng: 55.2744,
    price: "$180",
    rating: 4.2,
    description: "Near Burj Khalifa",
    reviews: 85,
    image: "/img/slot/slot8.jpg",
    times: ["9am - 3pm", "4pm - 10pm"],
    place: "Dubai",
  },
  {
    id: 39,
    name: "Desert Rose Hotel",
    lat: 25.2048,
    lng: 55.2708,
    price: "$150",
    rating: 4.0,
    description: "Near Dubai Mall",
    reviews: 60,
    image: "/img/slot/slot9.jpg",
    times: ["10am - 5pm"],
    place: "Dubai",
  },
  {
    id: 40,
    name: "JBR Beachfront Inn",
    lat: 25.0772,
    lng: 55.1334,
    price: "$240",
    rating: 4.6,
    description: "Jumeirah Beach Residence",
    reviews: 140,
    image: "/img/slot/slot10.jpg",
    times: ["11am - 4pm", "6pm - 11pm"],
    place: "Dubai",
  },
  {
    id: 41,
    name: "Burj View Luxury Hotel",
    lat: 25.1934,
    lng: 55.2795,
    price: "$350",
    rating: 4.9,
    description: "View of Burj Khalifa",
    reviews: 230,
    image: "/img/slot/london1.jpg",
    times: ["9am - 2pm", "3pm - 8pm"],
    place: "Dubai",
  },
  {
    id: 42,
    name: "Dubai Creek Palace",
    lat: 25.2532,
    lng: 55.328,
    price: "$270",
    rating: 4.7,
    description: "Near Dubai Creek",
    reviews: 175,
    image: "/img/slot/london2.jpg",
    times: ["10am - 4pm", "5pm - 10pm"],
    place: "Dubai",
  },
  {
    id: 43,
    name: "Al Barsha Comfort Hotel",
    lat: 25.1125,
    lng: 55.1968,
    price: "$110",
    rating: 4.1,
    description: "Near Mall of Emirates",
    reviews: 54,
    image: "/img/slot/london3.jpg",
    times: ["11am - 5pm"],
    place: "Dubai",
  },
  {
    id: 44,
    name: "Dubai Airport Transit Hotel",
    lat: 25.2532,
    lng: 55.3657,
    price: "$90",
    rating: 3.8,
    description: "Dubai International Airport",
    reviews: 40,
    image: "/img/slot/london4.jpg",
    times: ["10am - 3pm", "4pm - 9pm"],
    place: "Dubai",
  },
  {
    id: 45,
    name: "Old Town Heritage Inn",
    lat: 25.2697,
    lng: 55.3094,
    price: "$130",
    rating: 4.3,
    description: "Al Fahidi District",
    reviews: 88,
    image: "/img/slot/london5.jpg",
    times: ["9am - 4pm", "5pm - 11pm"],
    place: "Dubai",
  },
];

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf key="half" className="w-4 h-4 fill-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
}
export default function Index() {
  // All your existing state and logics
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: boolean;
  }>({});

  const [selectedFilterOptions, setSelectedFilterOptions] = useState<{
    [key: string]: string | null;
  }>({});

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    0, 250,
  ]);
  const [activeCategory, setActiveCategory] = useState("All hotels");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const searchParams = useSearchParams();
  const initialCity = (searchParams && searchParams.get("city")) || null;
  const [selectedCity, setSelectedCity] = useState<string | null>(initialCity);
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const [openFilter, setOpenFilter] = useState<{
    name: string | null;
    anchorRect: DOMRect | null;
  }>({ name: null, anchorRect: null });
  const [searchCity, setSearchCity] = useState<string | null>(null);
  const city = searchParams.get("city");

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [overlayProjection, setOverlayProjection] =
    useState<google.maps.MapCanvasProjection | null>(null);

  const router = useRouter();
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (initialCity) setSelectedCity(initialCity);
  }, [initialCity]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleFilterButtonClick = (
    filterName: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setOpenFilter((prev) =>
      prev.name === filterName
        ? { name: null, anchorRect: null }
        : { name: filterName, anchorRect: rect }
    );
  };

  const categories = [
    "All hotels",
    "Romance & Celebration",
    "Atypical Hotels",
    "Best Rated",
    "Best Deals",
    "King Size Beds",
    "4 & 5 Star Hotels",
    "Room with a bathtub",
    "best Pool",
  ];

  const filterOptions = [
    {
      name: "Time of arrival",
      icon: <Clock size={16} />,
      options: ["Morning", "Afternoon", "Evening", "Night"],
    },
    {
      name: "Duration",
      icon: <Calendar size={16} />,
      options: ["2-4 hours", "4-6 hours", "6-8 hours", "8+ hours"],
    },
    {
      name: "Prices",
      icon: <Euro size={16} />,
      options: [],
    },
    {
      name: "Number of stars",
      icon: <StarIcon size={16} />,
      options: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    },
    {
      name: "Amenities",
      icon: <Coffee size={16} />,
      options: ["Pool", "Spa", "Restaurant", "Gym", "Parking"],
    },
  ];
  // Filter hotels by selected city
  const filteredHotels = selectedCity
    ? hotels.filter((hotel) =>
        hotel.place.toLowerCase().includes(selectedCity.toLowerCase())
      )
    : hotels;

  // Map center: first hotel in filtered list or fallback to New York
  const mapCenter =
    filteredHotels.length > 0
      ? { lat: filteredHotels[0].lat, lng: filteredHotels[0].lng }
      : { lat: 40.7128, lng: -74.006 };

  useEffect(() => {
    const loader = new Loader({
      apiKey:
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
        "AIzaSyDIB2jRMBaQrUbsgPBJxwcbOcxKuZZ0Q64",
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (mapRef.current && !mapInstance.current && window.google) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: 13,
        });
        setMapReady(true);
      }
    });
  }, []);
  useEffect(() => {
    if (!mapReady || !selectedCity) return;

    const cityHotels = hotels.filter((hotel) =>
      hotel.place.toLowerCase().includes(selectedCity.toLowerCase())
    );

    // Clear old markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Create a single InfoWindow instance
    const infoWindow = new google.maps.InfoWindow();

    // Add a global function to close it from inside the HTML
    (window as any).closeInfoWindow = () => {
      infoWindow.close();
    };

    // ✅ Close infoWindow when clicking outside
    if (mapInstance.current) {
      mapInstance.current.addListener("click", () => {
        infoWindow.close();
      });
    }

    // Add new markers
    cityHotels.forEach((hotel) => {
      if (!mapInstance.current) return;

      const marker = new google.maps.Marker({
        position: { lat: hotel.lat, lng: hotel.lng },
        map: mapInstance.current,
        title: hotel.name,
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

      marker.addListener("click", () => {
        const htmlString = ReactDOMServer.renderToString(
          <HotelInfoCard hotel={hotel} />
        );

        infoWindow.setContent(htmlString);
        infoWindow.open(mapInstance.current, marker);
      });

      markersRef.current.push(marker);
    });

    if (cityHotels.length > 0 && mapInstance.current) {
      mapInstance.current.setCenter({
        lat: cityHotels[0].lat,
        lng: cityHotels[0].lng,
      });
    }
  }, [mapReady, selectedCity]);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar
        menuColor="light"
        isFixed={false}
        forceShowSearch={true}
        onCitySelect={setSelectedCity}
        searchValue={selectedCity ?? undefined}
      />

      {/* Mobile Filters */}
      <div className="block xl:hidden bg-white z-20 sticky top-16">
        <div className="px-4 pb-4">
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar scroll-smooth">
            {filterOptions.map((filter) => (
              <div className="relative shrink-0" key={filter.name}>
                <FilterButton
                  name={filter.name}
                  icon={filter.icon}
                  isActive={openFilter.name === filter.name}
                  selectedOption={selectedFilterOptions[filter.name] || null}
                  onClick={(e) => handleFilterButtonClick(filter.name, e)}
                />
                <PortalDropdown
                  open={!!openFilter.name}
                  anchorRect={openFilter.anchorRect}
                  onClose={() =>
                    setOpenFilter({ name: null, anchorRect: null })
                  }
                >
                  {openFilter.name && (
                    <FilterDropdown
                      name={openFilter.name}
                      anchorRect={openFilter.anchorRect}
                      onClose={() =>
                        setOpenFilter({ name: null, anchorRect: null })
                      }
                      selectedOption={
                        selectedFilterOptions[openFilter.name] || null
                      }
                      onSelect={(option) =>
                        setSelectedFilterOptions((prev) => ({
                          ...prev,
                          [openFilter.name!]: option,
                        }))
                      }
                      onDelete={() => {
                        setSelectedFilterOptions((prev) => {
                          const copy = { ...prev };
                          delete copy[openFilter.name!];
                          return copy;
                        });
                        if (openFilter.name === "Prices") {
                          setPriceRange([0, 250]);
                          setTempPriceRange([0, 250]);
                        }
                      }}
                      priceRange={tempPriceRange}
                      setPriceRange={setTempPriceRange}
                    />
                  )}
                </PortalDropdown>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row min-h-screen">
        <div className="xl:w-[45%] 2xl:w-[50%] bg-white flex flex-col h-screen overflow-hidden">
          <div className="hidden xl:block h-screen overflow-y-hidden hide-scrollbar">
            <div className="px-4 py-6 bg-white">
              {/* Desktop Categories */}
              <div className="relative">
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg border hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div
                  ref={sliderRef}
                  className="flex overflow-x-auto gap-2 px-10 pb-2 hide-scrollbar scroll-smooth"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 px-4 py-2 rounded-full border-1 text-sm font-medium transition-all duration-300 ${
                        category === activeCategory
                          ? "border-[#ff8200] bg-[#ff8200] text-white"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-500"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg border hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Desktop Filters */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    ref={filtersRef}
                    className="flex overflow-x-auto gap-2 pb-4 border-b border-gray-200 no-scrollbar scroll-smooth"
                    style={{ minHeight: 56 }}
                  >
                    {filterOptions.map((filter) => (
                      <div
                        className="relative inline-block shrink-0"
                        key={filter.name}
                      >
                        <FilterButton
                          name={filter.name}
                          icon={filter.icon}
                          isActive={openFilter.name === filter.name}
                          selectedOption={
                            selectedFilterOptions[filter.name] || null
                          }
                          onClick={(e) =>
                            handleFilterButtonClick(filter.name, e)
                          }
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const activeCount = Object.values(
                          selectedFilterOptions
                        ).filter(Boolean).length;
                        if (activeCount > 0) {
                          setSelectedFilterOptions({});
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-0 rounded-full border border-gray-200 text-sm font-medium text-gray-500"
                    >
                      All
                      <span className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-xs">
                        {
                          Object.values(selectedFilterOptions).filter(Boolean)
                            .length
                        }
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel List */}
            <div className="flex-1 h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar px-4 pb-6">
              <HotelList hotels={filteredHotels} />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full xl:w-[55%] 2xl:w-[50%] h-[300px] xl:h-screen relative">
          <div ref={mapRef} className="absolute inset-0 w-full h-full z-0" />
        </div>

        {/* Mobile Drawer */}
        <div className="xl:hidden">
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-20"
            animate={{ y: isDrawerOpen ? 0 : 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 400 }}
            onDragEnd={(event, info) => {
              if (info.point.y > 200) setIsDrawerOpen(false);
              else setIsDrawerOpen(true);
            }}
          >
            <div
              className="w-full flex justify-center py-2 cursor-pointer"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <div className="w-10 h-1.5 bg-gray-400 rounded-full" />
            </div>
            <div className="max-h-[80vh] overflow-y-auto px-4 pb-6">
              <HotelList hotels={filteredHotels} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
