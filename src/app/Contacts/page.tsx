"use client";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Header";

export default function index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <main className="bg-white">
      <Navbar menuColor="dark" isFixed={false} />
      <div className="relative w-full h-[500px] md:h-[450px] lg:h-[450px]">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/img/contact.jpg"
            alt="Luxury hotel room"
            fill
            priority
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0  bg-animated-gradient" />
        </div>

        {/* Page Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl tracking-wider font-semibold">
            Contact Us
          </h1>
        </div>
      </div>

      <section className="container mx-auto py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Image */}
          <div className="w-full h-[400px] md:h-[600px] relative z-10">
            <Image
              src="/img/img1.png"
              alt="Luxury resort with pool and ocean view at sunset"
              fill
              className="object-cover"
              
              priority
            />
          </div>

          {/* Right side - Contact Information */}
          <div
            className="w-full bg-stone-100 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative"
            style={{
              backgroundImage: "url('/img/address-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h2 className="text-3xl mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                We're here to answer any questions you may have about our
                experiences. Reach out to us and we'll respond as soon as we
                can.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">Address</h3>
                  <p className="text-gray-600">
                    123 Mountain View Road, Luxury Valley, LX 12345
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-lg">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>

                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <p className="text-gray-600">info@luxestay.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* map section */}
      <section className="w-full pb-12 md:pb-16 lg:pb-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Form */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              We&apos;re Here For You
            </h1>

            <p className="text-gray-700 max-w-md">
              We understand that your needs are important, and we are here to
              assist you every step of the way. Our dedicated team is committed
              to providing top-notch support and addressing any questions or
              concerns you may have.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              <Link
                href="#"
                className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Facebook size={20} className="text-gray-700" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Twitter size={20} className="text-gray-700" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Linkedin size={20} className="text-gray-700" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Instagram size={20} className="text-gray-700" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block uppercase text-sm text-gray-600 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block uppercase text-sm text-gray-600 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block uppercase text-sm text-gray-600 font-medium"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Type Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="md:w-[50%] w-full text-center py-3 px-6 bg-gradient-to-r from-orange-300 to-[#ed4b22] text-white font-medium uppercase transition-colors rounded-md"
                >
                  Check Availability
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Google Map */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-full min-h-[400px] rounded-md overflow-hidden">
            <div className="w-full h-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1649252132549!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* footer section */}
      <Footer />
    </main>
  );
}
