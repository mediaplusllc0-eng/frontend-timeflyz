import { useAppDispatch } from "@/utils/hooks";
import { X, Users, Ruler } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RoomDetailModal({
  room,
  onClose,
  setSelectedSlot,
  selectedDate,
}: {
  room: any;
  onClose: () => void;
  setSelectedSlot: any;
  selectedDate: Date | null;
}) {
  if (!room) return null;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSlotSelect = (room: any) => {
    if (!selectedDate) return;
    dispatch(setSelectedSlot(room));
    const checkInDateParam = encodeURIComponent(
      selectedDate.toISOString().split("T")[0]
    );
    router.push(`/booking?roomId=${room._id}&checkInDate=${checkInDateParam}`);
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-[600px] max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 z-10" onClick={onClose}>
          <X
            size={15}
            className="w-7 h-7 text-black bg-white rounded-full p-1"
          />
        </button>

        {/* Image section */}
        <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-t-xl">
          <Image
            src={room.images[0] || "/placeholder.jpg"}
            alt={room.masterRoomName}
            fill
            className="object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="p-6 space-y-5">
          {/* Title & Meta */}
          <div className=" border-gray-200 pb-5 mb-0 space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {room.masterRoomName}
            </h2>
            <p
              className="text-sm text-gray-600 editor-html"
              dangerouslySetInnerHTML={{ __html: room.description }}
            />
            <div className="flex flex-wrap items-center gap-4 text-md text-gray-800 font-bold mt-5">
              <span className="flex items-center gap-1">
                <Users fill="#000" size={16} /> Max {room.capacity} guests
              </span>
            </div>
          </div>

          {/* Amenities */}
          {room.amenities.length > 0 && (
            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-lg font-bold mb-2">Amenities</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 text-sm text-gray-700">
                {room.amenities?.map((item: string, idx: number) => (
                  <div key={idx}>• {item}</div>
                ))}
              </div>
            </div>
          )}

          {/* Optional: Conditions */}
          {/* <div>
            <h3 className="text-lg font-medium mb-2">Conditions</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>A valid ID is required to check in</li>
              <li>Guests must be at least 21 years old</li>
              <li>Valid credit card and deposit required</li>
            </ul>
          </div> */}

          <button
            onClick={() => handleSlotSelect(room)}
            className="bg-primary-500 text-white mt-5 py-2 w-full font-bold  px-4 rounded-full hover:bg-primary-600 transition"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
