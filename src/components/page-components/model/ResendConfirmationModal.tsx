"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResendConfirmationModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData?.email) {
          setEmail(userData.email);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#4B4D4D] hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Resend the confirmation
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          A new confirmation will be sent to this address
        </p>
        <label className="block mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none text-gray-600"
          />
        </label>
        <button
          onClick={() => {
            // TODO: Send confirmation logic
            onClose();
          }}
          className="bg-[#DAA520] text-white rounded-full w-full py-2 font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
