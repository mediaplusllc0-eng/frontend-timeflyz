"use client";
import React, { useState, useRef } from "react";
import { GrMail } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";
import Navbar from "@/components/layout/Header";
import Image from "@/components/ui/Image";
import { useRouter } from "next/navigation";

interface ExtraItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export default function index() {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");
  const [info, setInfo] = useState("");
  const [discovery, setDiscovery] = useState("");
  const [improve, setImprove] = useState<null | boolean>(null);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);
  const router = useRouter();
  return (
    <>
      <Navbar menuColor="light" isFixed={false} />
      <div className="min-h-screen text-gray-800 font-sans">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Left Column - Scrollable */}
          <div className="md:w-2/3 p-4 overflow-y-auto max-h-[calc(100vh-64px)] border border-gray-200 mt-10 rounded-3xl hide-scrollbar">
            <div className="flex justify-center mb-5">
              <Image
                src="/img/confirm.svg"
                alt="Success"
                className="!w-[300px] !h-[300px]"
              />
            </div>
            <div className="mb-6 text-center max-w-xl mx-auto">
              <h1 className="text-4xl font-bold">
                Your daytime <br /> reservation is <br /> confirmed!
              </h1>
              <p className="my-5 text-base font-medium">
                Booking reference:
                <a href="#" className="text-[#51b0b0b3] font-semibold">
                  39LF3F0T
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-1 text-center w-2/4 mx-auto">
                The hotel has been informed of your arrival.{""} We have just
                sent you a reservation confirmation to
                <strong> user@gmail.com.</strong>
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-left w-[60%] max-w-xl mx-auto mt-10 border border-gray-100">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    What is the main reason for your TimeFlyZ booking today?
                  </h2>
                  <div className="space-y-1 mb-6">
                    {[
                      {
                        label: "Leisure",
                        desc: "(e.g., relaxation, celebration, romantic moment, celebration with friends, or a solo break)",
                      },
                      {
                        label: "Transit",
                        desc: "(e.g., layovers, waiting for a flight, train, or in-between connections)",
                      },
                      {
                        label: "Work",
                        desc: "(e.g., business meetings, work-from-hotel, interviews, shooting, between two shifts)",
                      },
                      {
                        label: "Privacy or Discretion",
                        desc: "(e.g. discreet appointments or confidentiality)",
                      },
                      {
                        label: "Other",
                        desc: "(e.g., specific needs like home renovations, etc)",
                      },
                    ].map((r) => (
                      <label
                        key={r.label}
                        className="flex items-start gap-2 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition"
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={r.label}
                          checked={reason === r.label}
                          onChange={(e) => setReason(e.target.value)}
                          className="mt-2 accent-yellow-400"
                        />
                        <span className="flex flex-col">
                          <span className="font-semibold text-gray-800 text-lg">
                            {r.label}
                          </span>
                          <span className="text-sm text-gray-500 font-normal">
                            {r.desc}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">
                      Additional information
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg mt-1 p-3 resize-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 text-gray-800 text-base"
                      rows={3}
                      maxLength={500}
                      placeholder="Tell us more. (optional)"
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">
                      {info.length}/500
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      Your booking reason is confidential and will not be shared
                      with the hotel.
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-500 font-medium">
                      1/3
                    </span>
                    <button
                      className={`px-10 py-2 rounded-full bg-[#DAA520] font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                        !reason && "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={next}
                      disabled={!reason}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    How did you hear about TimeFlyz?
                  </h2>
                  <div className="space-y-1 mb-8">
                    {[
                      "Google or direct search",
                      "Our hotel partners",
                      "Social Media",
                      "Word-of-mouth",
                      "Press",
                      "Street advertising",
                      "Other",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        <input
                          type="radio"
                          name="discovery"
                          value={opt}
                          checked={discovery === opt}
                          onChange={(e) => setDiscovery(e.target.value)}
                          className="accent-yellow-400"
                        />
                        <span className="text-base text-gray-800 font-medium">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-500 font-medium">
                      2/3
                    </span>
                    <button
                      className={`px-8 py-2 rounded-lg bg-[#DAA520] font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                        !discovery && "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={next}
                      disabled={!discovery}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === 3 && improve === null && (
                <>
                  <div className="p-8">
                    <h2 className="text-lg font-bold text-gray-900 text-center mb-4">
                      Help Us Improve! 🙌
                    </h2>
                    <p className="text-sm text-center text-gray-600 mb-6">
                      Would you be open to us reaching out to gather your
                      thoughts on how we can enhance our services? We value your
                      feedback and would love to hear from you!
                    </p>

                    <div className="flex justify-center gap-6 mt-4">
                      <button
                        onClick={() => setImprove(false)}
                        className="border border-gray-300 px-8 py-2 rounded-full font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
                      >
                        No, thanks
                      </button>
                      <button
                        onClick={() => setImprove(true)}
                        className="bg-[#DAA520] px-8 py-2 rounded-full font-semibold text-white shadow"
                      >
                        Yes, I’m in!
                      </button>
                    </div>

                    <div className="text-sm text-center mt-6 text-gray-500 font-medium">
                      3/3
                    </div>
                  </div>
                </>
              )}

              {step === 3 && improve !== null && (
                <div className="text-center p-6">
                  <p className="mb-6 text-gray-800 text-lg font-semibold">
                    Help us better meet your needs! Take a moment to share your
                    experience with one of our experts — your feedback makes all
                    the difference.
                  </p>
                  <button className="bg-[#DAA520] px-8 py-2 rounded-lg font-semibold text-white shadow">
                    Share my feedback
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-[50%] flex justify-center items-center mx-auto bg-[#DAA520] text-white py-2 rounded-full text-base font-semibold">
                <GrMail className="me-2" /> Send me the confirmation by SMS
              </button>
              <button className="w-[50%] flex justify-center items-center mx-auto border py-2 rounded-full text-base">
                <IoCalendarOutline className="me-2" /> Add to my calendar
              </button>
            </div>

            <div className="text-sm mt-6 text-gray-600 text-center">
              <h3 className="mb-2 text-center text-sm font-medium">
                Need some help ?{" "}
                <a
                  className="text-gray-800 underline block cursor-pointer text-sm font-medium"
                  href="#"
                >
                  Consult the frequently asked questions
                </a>
              </h3>
              <h3 className="text-center text-sm font-medium my-3">
                You can contact our Customer Service by phone at{" "}
                <a
                  className="text-gray-800 font-medium underline cursor-pointer text-sm"
                  href="tel:0176760695"
                >
                  01 76 76 06 95
                </a>
              </h3>
            </div>

            <div className="flex justify-center mb-5">
              <Image
                src="/img/share-reservation.png"
                alt="Success"
                className="!w-[404px] !h-[114px] shadow-md rounded-lg"
              />
            </div>

            <div className="flex justify-center items-center space-x-2">
              <button
                className="rounded-full bg-[#DAA520] px-6 py-2 text-white"
                onClick={() => {
                  // Here, you'd also verify the entered code first
                  router.push("/Confirmreservation");
                }}
              >
                My reservation
              </button>
              <button className="rounded-full px-10 py-2 border">Cancel</button>
            </div>

            <div className="flex items-start gap-3 bg-white shadow-lg w-md rounded-xl p-4 text-sm text-gray-800 mx-auto">
              <div className="text-blue-500 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 9h2v5H9V9zM10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 110 12A6 6 0 0110 4zm0 5a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold mb-1 text-sm">
                  Let’s support hoteliers!
                </p>
                <p className="text-sm text-gray-500">
                  When a booking is not honored without prior cancellation, it
                  impacts the hotel, which has prepared the room especially for
                  you.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Remember to cancel if you are unable to attend! It is possible
                  until the last minute on the site if you have created an
                  account or via your confirmation email.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/3 p-4 flex-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-3xl p-6 mt-5 shadow-lg">
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
              <div className="bg-white rounded-3xl p-6 mt-5 shadow-lg">
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
                {/* <div className="mb-6">
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
                </div> */}

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
