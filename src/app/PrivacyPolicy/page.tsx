
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Header";
import React from "react";

export default function index() {
  return (
    <>
      <Navbar menuColor="light" isFixed={false} />
      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center">
          TIMEFLYZ – PRIVACY POLICY
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
              Timeflyz SAS is offering an online platform for daytime hotel
              bookings via its website and mobile application. These Terms and
              Conditions (“Terms”) are meant to outline your rights and
              obligations as a user of the Timeflyz services. By using our
              platform, you agree to be bound by these Terms.
            </p>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="text-xl font-semibold mb-4">
              2. INFORMATION WE COLLECT
            </h2>
            <p className="mb-2 md:text-lg text-base pb-3">
              We may collect and process the following types of personal data:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Identity Data:</strong> Name, email address, phone
                number
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Account Data:</strong> Login credentials, account
                preferences
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Booking Data:</strong> Hotel, service, date/time,
                add-ons, payment method
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Technical Data: </strong>Device type, browser type, IP
                address, location (if enabled)
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                <strong>Usage Data: </strong>Page visits, search queries,
                interaction with services
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                <strong>Communication Data: </strong>Messages or correspondence
                with support
              </li>
            </ul>
          </div>
          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              3. HOW WE USE YOUR DATA
            </h2>
            <p className="mb-2 md:text-lg text-base pb-3">
              We use personal data to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Process and manage hotel bookings
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Provide customer support and account services
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Send booking confirmations and updates
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Personalize your experience on the platform
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Conduct security, fraud prevention, and account verification
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Analyze usage to improve our services
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                Contact you for feedback or surveys (optional)
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              4. LEGAL BASIS FOR PROCESSING
            </h2>
            <p className="mb-2 md:text-lg text-base pb-3">
              We process your data based on one or more of the following legal
              grounds:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">Your consent</li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Performance of a contract (e.g., booking a service)
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Compliance with legal obligations
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                Legitimate business interests (e.g., fraud prevention, service
                improvement)
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">5. DATA SHARING</h2>
            <p className="mb-2 md:text-lg text-base pb-5">
              We may share your data with:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Payment methods include:
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li className="mb-2 md:text-lg text-base pb-3">
                    <strong>Partner Hotels:</strong>To confirm and fulfill your
                    booking
                  </li>
                  <li className="mb-2 md:text-lg text-base pb-3">
                    <strong>Payment Providers:</strong> To process transactions
                    securely
                  </li>
                  <li className="mb-2 md:text-lg text-base pb-3">
                    <strong>Service Providers:</strong> Hosting, analytics,
                    email services
                  </li>
                  <li className="mb-2 md:text-lg text-base pb-2">
                    <strong>Authorities:</strong> When legally required for law
                    enforcement or regulation
                  </li>
                </ul>
              </li>
              <p className="mb-2 md:text-lg text-base pb-10">
                We do not sell your personal data.
              </p>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              6. COOKIES AND TRACKING TECHNOLOGIES
            </h2>
            <p className="mb-2 md:text-lg text-base pb-5">
              Our platform uses cookies and similar technologies to enhance user
              experience, remember preferences, and analyze site performance.
              You can manage cookie preferences through your browser settings.
            </p>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              7. DATA RETENTION
            </h2>
            <p className="mb-2 md:text-lg text-base pb-5">
              We retain personal data only for as long as necessary to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Provide the services you've requested
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Comply with legal obligations
              </li>
              <li className="mb-2 md:text-lg text-base pb-10">
                Resolve disputes and enforce our policies
              </li>
            </ul>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">8. SECURITY</h2>
            <p className="mb-2 md:text-lg text-base pb-5">
              Timeflyz uses technical and organizational measures to protect
              your data, including encryption, access control, and secure server
              hosting.
            </p>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">9. YOUR RIGHTS</h2>
            <p className="mb-2 md:text-lg text-base pb-5">
              Under applicable laws (e.g., GDPR), you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="mb-2 md:text-lg text-base pb-3">
                Access your personal data
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Correct inaccurate or incomplete data
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Delete your data (“right to be forgotten”)
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Object to or restrict data processing
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                Withdraw consent at any time
              </li>
              <li className="mb-2 md:text-lg text-base pb-3">
                File a complaint with a data protection authority
              </li>
            </ul>
            <p className="mb-2 md:text-lg text-base pb-10">
              To exercise these rights, contact:
              <a href="mailto:privacy@timeflyz.com">privacy@timeflyz.com</a>
            </p>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              10.INTERNATIONAL TRANSFERS
            </h2>
            <p className="mb-2 md:text-lg text-base pb-5">
              If data is transferred outside the European Economic Area, we
              ensure appropriate safeguards are in place (e.g., Standard
              Contractual Clauses).
            </p>
          </div>

          <div className="mb-6 border-b my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              11.POLICY UPDATES
            </h2>
            <p className="mb-2 md:text-lg text-base pb-5">
              We may update this policy from time to time. The latest version
              will always be available on our website. If material changes are
              made, we will notify users appropriately.
            </p>
          </div>

          <div className="mb-6 my-4">
            <h2 className="font-semibold text-xl mt-6 mb-4">
              IMPORTANT NOTICE
            </h2>
            <p className="mb-4 md:text-lg text-base pb-5">
              🔔 Timeflyz is currently under development. This Privacy Policy
              will be updated upon the official launch of the platform. Please
              check back for the latest version before using our services.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
