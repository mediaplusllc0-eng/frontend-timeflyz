
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Header";
import React from "react";

export default function index() {
  return (
    <>
      <Navbar menuColor="light" isFixed={false} />
      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center">
          TIMEFLYZ – TERMS AND CONDITIONS
        </h1>

        <section className="space-y-6">
          <div className="mb-6 border-b my-4">
            <p className="mb-2 md:text-lg text-base pb-5">
              <strong>Note:</strong> The Timeflyz platform is currently under
              development. The following Terms and Conditions serve as a
              preliminary version of our policies. These terms will be updated
              and finalized once the platform goes live.
            </p>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="text-xl font-semibold mb-2">1. INTRODUCTION</h2>
            <p className="mb-2 md:text-lg text-base pb-5">
              Timeflyz is offering an online platform for daytime hotel bookings
              via its website and mobile application. These Terms and Conditions
              (“Terms”) are meant to outline your rights and obligations as a
              user of the Timeflyz services. By using our platform, you agree to
              be bound by these Terms.
            </p>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="text-xl font-semibold mb-4">2. DEFINITIONS</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Timeflyz Platform:</strong> The website and mobile
                applications (iOS and Android) through which hotel services are
                browsed and booked.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Hotel:</strong> Partner hotels offering limited-time
                daytime services via Timeflyz.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Service:</strong> A hotel room, space, or facility
                booked for a specific time window during the day.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Offer:</strong> The package provided by a Hotel,
                including duration, price, facilities, and any add-ons.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Add-ons: </strong>Optional extras such as food, drinks,
                meeting rooms, parking, etc.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Booking: </strong>A confirmed reservation made through
                the platform.
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                <strong>Customer Account: </strong>Optional extras such as food,
                drinks, meeting rooms, parking, etc.
              </li>
            </ul>
          </div>
          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              3. ACCESS AND USAGE :
            </h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                The Timeflyz platform is accessible to users with an internet
                connection.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Users must be at least 18 years old to make a booking.
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                A customer account is optional but provides easier access to
                booking history, saved preferences, and account management.
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              4. BOOKINGS AND CANCELLATIONS :
            </h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Customers can search offers based on city, hotel, or amenities,
                and book services for daytime use.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Bookings can be made with or without an account. Confirmation
                will be sent via email.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Cancellation terms vary based on payment method and hotel
                policy:
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li className="mb-2 md:text-lg text-base pb-3">
                    Prepaid bookings are generally non-refundable.
                  </li>
                  <li className="mb-2 md:text-lg text-base pb-10">
                    Bookings payable at the hotel may be canceled up until
                    check-in time without penalty (excluding booking fees).
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">5. PAYMENTS :</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Payment methods include:
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li className="mb-2 md:text-lg text-base pb-3">
                    Full payment on the Timeflyz platform.
                  </li>
                  <li className="mb-2 md:text-lg text-base pb-3">
                    Payment at the hotel.
                  </li>
                  <li className="mb-2 md:text-lg text-base pb-3">
                    Partial payment (booking fee on Timeflyz + remainder at
                    hotel).
                  </li>
                </ul>
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Partial payment (booking fee on Timeflyz + remainder at hotel).
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                Some hotels may require a security deposit at check-in.
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              6. CUSTOMER RESPONSIBILITIES :
            </h2>
            <p className="mb-2 md:text-lg text-base pb-3">
              Customers agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Arrive on time for their booking.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Follow the rules and policies of the hotel.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Pay for any additional services or damages.
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                Respect the platform and partner hotels. Any misuse may result
                in account suspension or blacklisting.
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              7. TIMEFLYZ RESPONSIBILITIES
            </h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Timeflyz acts solely as a booking intermediary between users and
                hotels.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                We are not responsible for the quality or execution of services
                by the hotel.
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Pay for any additional services or damages.
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                If a booking cannot be honored, Timeflyz will assist in finding
                an alternative or issue a refund/compensation if appropriate.
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              8. COMPLAINTS AND SUPPORT
            </h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Customers can contact Timeflyz via:
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li className="mb-2 md:text-lg text-base pb-3">
                    <strong>Email: </strong>
                    <a href="http://">support@timeflyz.com</a>
                  </li>
                  <li className="mb-2 md:text-lg text-base pb-3">
                    <strong>Phone: </strong> [to be updated on launch]
                  </li>
                  <li className="mb-2 md:text-lg text-base pb-3">
                    Partial payment (booking fee on Timeflyz + remainder at
                    hotel).
                  </li>
                </ul>
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                In the case of issues such as a denied check-in or pricing
                error, Timeflyz will help resolve the matter or issue
                appropriate compensation.
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">9. DATA PRIVACY</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Personal data is handled in accordance with our Privacy Policy
                and GDPR regulations.
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                Users can request data deletion or account closure by contacting
                support.
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">10. LEGAL</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                These Terms are governed by French law.
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                Disputes shall fall under the jurisdiction of the courts of
                Paris, France.
              </li>
            </ul>
          </div>

          <div className="mb-6 my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              IMPORTANT NOTICE
            </h2>
            <p className="mb-4 md:text-lg text-base pb-3">
              🔔 Timeflyz is currently under development.* These Terms are
              subject to change prior to the official launch of the platform.
              Once Timeflyz goes live, we will notify users and publish an
              updated version of our Terms and Privacy Policy. Please check back
              for the latest version before using our services.*
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
