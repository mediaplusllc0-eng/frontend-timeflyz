"use client";
import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Header";
import Switch from "@/components/ui/Switch";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/utils/hooks";

interface ExtraItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export default function BookingForm() {
  const { selectedSlot } = useAppSelector((state) => state.hotelDetails);

  const authCheck = localStorage.getItem("token");
  const [open, setOpen] = useState("personalize");
  const [promoCode, setPromoCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    { id: string; quantity: number }[]
  >([]);
  const [code, setCode] = useState(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [isPersonalizationComplete, setIsPersonalizationComplete] =
    useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const router = useRouter();

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitched(checked);
  };

  useEffect(() => {
    const hasExtras = selectedItems.length > 0;
    const hasAgreed = agreed;
    setIsPersonalizationComplete(hasExtras && hasAgreed);
  }, [selectedItems, agreed]);

  const handleChange = (i: number, val: string) => {
    if (val.length <= 1) {
      const newCode = [...code];
      newCode[i] = val;
      setCode(newCode);
      if (val && i < 5) refs.current[i + 1]?.focus();
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i]) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    if (paste.every((c) => /^\d$/.test(c))) {
      setCode(paste.concat(Array(6).fill("")).slice(0, 6));
      refs.current[paste.length < 6 ? paste.length : 5]?.focus();
    }
  };

  const extraItems: ExtraItem[] = [
    {
      id: "white-wine",
      name: "Bottle of white wine",
      price: 35,
      image: "/img/bottel.jpg",
    },
    {
      id: "rose-wine",
      name: "Bottle of rosé wine",
      price: 35,
      image: "/img/bottel.jpg",
    },
    {
      id: "red-wine",
      name: "Bottle of red wine",
      price: 35,
      image: "/img/bottel.jpg",
    },
    {
      id: "champagne",
      name: "Champagne Brut Deutz 75cl",
      price: 80,
      image: "/img/wine.jpg",
    },
    {
      id: "champagne-glass",
      name: "Champagne glass",
      price: 18,
      image: "/img/wine.jpg",
    },
    {
      id: "love-box",
      name: "Love Box",
      price: 45,
      image: "/img/box.jpg",
    },
    {
      id: "bathrobe",
      name: "Bathrobe for Spa access",
      price: 8,
      image: "/img/bathrob.jpg",
      description: "Leave in your room when you return from the spa.",
    },
  ];

  const handleItemQuantity = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) {
        return [...prev, { id: itemId, quantity }];
      } else {
        const updatedItems = [...prev];
        updatedItems[itemIndex] = { id: itemId, quantity };
        return updatedItems;
      }
    });
  };

  const handleConfirmBooking = () => {
    if (isPersonalizationComplete) {
      // Open the SMS dropdown and enable SMS box after confirmation
      setOpen("sms");
    }
  };

  return (
    <>
      <Navbar menuColor="light" isFixed={false} />
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* Header */}
        <div className="max-w-7xl mx-auto p-4 border-b">
          <Link href="/hoteldetail">
            <button className="flex items-center text-gray-700 font-medium text-xl">
              <ChevronLeft className="mr-2" />
              Return to the hotel page
            </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Left Column - Scrollable */}
          <div className="md:w-2/3 p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
            {/* Identification Section */}
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <div className="flex items-center">
                <h2 className="text-[#4B4D4D] text-xl font-light">
                  IDENTIFICATION
                </h2>
                {authCheck && (
                  <div className="ml-2 bg-blue-100 rounded-full p-1">
                    <Check className="w-5 h-5 text-blue-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Personalize Your Stay */}
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <button
                onClick={() =>
                  setOpen(open === "personalize" ? "" : "personalize")
                }
                className="w-full flex items-center justify-between text-xl font-bold text-gray-700"
              >
                <h2 className="text-gray-500 text-xl font-light">
                  PERSONALISATION
                </h2>
                <ChevronDown
                  className={`transition-transform ${
                    open === "personalize" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === "personalize" && (
                <div className="pt-3">
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-2">
                      Together, let's encourage flexibility!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Timeflyz offers unique flexibility regarding last-minute
                      cancellations.
                    </p>
                    <p className="text-gray-600">
                      Failing to show up at the hotel without canceling your
                      reservation harms our partners and jeopardizes this
                      benefit. Cancel your reservation if you cannot make it.
                      This allows us to keep this option available.
                    </p>
                  </div>

                  {/* Arrival Time */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Arrival Time</h3>
                    <p className="text-gray-600 mb-1">
                      Your room is available from 11am to 4pm.
                    </p>
                    <p className="text-gray-600 mb-4">
                      By specifying your arrival time, you allow the hotel to
                      better organize your welcome. l'hôtel de mieux organiser
                      votre accueil.
                    </p>

                    <div className="mb-2">Arrival Time</div>
                    <div className="relative">
                      <select className="w-full p-4 border rounded-lg appearance-none pr-10">
                        <option>I don't know</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">
                      Special requests
                    </h3>
                    <div className="relative">
                      <select className="w-full p-4 border rounded-lg appearance-none pr-10">
                        <option>-</option>
                        <option>Chambre calme</option>
                        <option>Étage supérieur</option>
                        <option>Lit supplémentaire</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>

                  {/* Your Little Extra */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Your extra</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {extraItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-lg shadow overflow-hidden"
                        >
                          <div className="h-40 overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-sm text-gray-600 mb-2">
                                {item.description}
                              </p>
                            )}
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-medium">AED {item.price}</span>
                              <div className="flex gap-2 items-center">
                                <button
                                  onClick={() => handleItemQuantity(item.id, 1)}
                                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                                    selectedItems.some((i) => i.id === item.id)
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-amber-400 hover:bg-amber-500 text-white"
                                  }`}
                                >
                                  {selectedItems.some((i) => i.id === item.id)
                                    ? "Quantity"
                                    : "Add"}
                                </button>
                                {selectedItems.some(
                                  (i) => i.id === item.id
                                ) && (
                                  <div className="relative">
                                    <select
                                      value={
                                        selectedItems.find(
                                          (i) => i.id === item.id
                                        )?.quantity || 1
                                      }
                                      onChange={(e) =>
                                        handleItemQuantity(
                                          item.id,
                                          parseInt(e.target.value)
                                        )
                                      }
                                      className="w-16 p-1 border rounded-lg appearance-none pr-6"
                                    >
                                      {Array.from(
                                        { length: 5 },
                                        (_, i) => i + 1
                                      ).map((num) => (
                                        <option key={num} value={num}>
                                          {num}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <label className="flex items-start space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1"
                      />
                      <span>
                        By checking this box, I acknowledge that I have read and
                        agree to the{" "}
                        <Link
                          href="/TermsandConditions"
                          className="text-blue-600 underline"
                        >
                          Terms of Use
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/PrivacyPolicy"
                          className="text-blue-600 underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>

                    <button
                      disabled={!agreed}
                      onClick={handleConfirmBooking}
                      className={`w-full py-3 text-center text-base font-medium text-black rounded-full transition-all
       ${
         agreed
           ? "bg-gradient-to-r from-yellow-400 to-orange-400 hover:opacity-90"
           : "bg-gray-300 cursor-not-allowed"
       }`}
                    >
                      Confirm my booking
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SMS Verification */}
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <button
                onClick={() => {
                  if (!isPersonalizationComplete) return;
                  setOpen(open === "sms" ? "" : "sms");
                }}
                className={`w-full flex items-center justify-between text-lg font-bold ${
                  isPersonalizationComplete
                    ? "text-gray-600 hover:text-gray-800"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              >
                <h2 className="text-gray-500 text-xl font-light">SMS</h2>
                <ChevronDown
                  className={`transform transition-transform ${
                    open === "sms" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {!isPersonalizationComplete && (
                <p className="text-sm text-red-500 mt-2">
                  Complete personalization section to enable SMS verification.
                </p>
              )}

              {open === "sms" && isPersonalizationComplete && (
                <div className="px-4 pb-4 text-center">
                  <p className="text-base font-medium text-gray-500 mb-4">
                    Enter the code sent to your phone
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    {code.map((val, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          refs.current[i] = el;
                        }}
                        value={val}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKey(i, e)}
                        onPaste={handlePaste}
                        maxLength={1}
                        inputMode="numeric"
                        className="w-10 h-10 text-center text-lg border rounded focus:ring-1 focus:ring-primary"
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch
                      checked={isSwitched}
                      onCheckedChange={handleSwitchChange}
                    />
                    <span>Enable SMS notifications for future bookings</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setOpen("")}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Here, you'd also verify the entered code first
                        router.push("/Confirm");
                      }}
                      className="bg-[#FFC107] text-white px-4 py-2 rounded"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/3 p-4 flex-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-3xl p-6 mt-5">
                {/* Hotel Info */}
                <div className="flex mb-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden mr-3">
                    <img
                      src="/img/hotel1.jpg"
                      alt="LAZ' Hôtel Spa Urbain"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <span key={star} className="text-gray-800">
                          ★
                        </span>
                      ))}
                    </div>
                    <h3 className="font-medium">LAZ' Hôtel Spa Urbain</h3>
                    <p className="text-sm text-gray-600">
                      17 Rue de Milan, 75009 Paris, France
                    </p>
                  </div>
                </div>

                {/* Check-in/Check-out */}
                <div className="flex border-t py-4">
                  <div className="w-1/2 border-r pr-2">
                    <div className="text-gray-500 text-sm">CHECK-IN</div>
                    <div>24 Apr</div>
                    <div className="bg-gray-800 text-white text-xs rounded-full px-3 py-1 inline-block mt-1">
                      11am
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="text-gray-500 text-sm">CHECK-OUT</div>
                    <div>le même jour</div>
                    <div className="bg-gray-800 text-white text-xs rounded-full px-3 py-1 inline-block mt-1">
                      4pm
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 mt-5">
                {/* Room Info */}
                <div className="mb-4 border-b pb-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold text-md">
                      Cosy Double Room + SPA Access
                    </h3>
                    <div className="font-medium">AED 150</div>
                  </div>

                  <div className="flex justify-between text-sm mt-3 text-[#54545d99] font-medium">
                    <div>Pool access included</div>
                    <div>Included</div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="mb-2 text-sm font-bold">
                    Do you have a promo code or gift card?
                  </div>
                  <div className="flex border rounded-lg">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow p-3 text-[#D2D6DB] font-bold text-md"
                      placeholder="Code promo"
                    />
                    <button className="bg-white underline px-4 text-blue-600 font-medium tracking-[.17em]">
                      APPLY
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-1">
                    <div className="font-medium">Total</div>
                    <div className="font-medium">AED 150</div>
                  </div>
                  <div className="text-xs text-gray-500">TVA incluse</div>
                </div>

                {/* Payment Info */}
                <div className="pt-4 mb-4">
                  <div className="flex justify-between mb-1">
                    <div>À payer à l'hôtel</div>
                    <div className="font-medium">AED 150</div>
                  </div>
                  <div className="text-xs text-green-500">
                    Annulation gratuite
                  </div>
                </div>
              </div>
              {/* Terms */}
              <div className="text-center mt-4">
                <a href="#" className="text-[#54545d] text-base underline">
                  Quelles sont les conditions spécifiques ?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
