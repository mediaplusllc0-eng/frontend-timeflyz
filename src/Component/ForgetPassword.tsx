import React, { useState } from "react";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlinePhone } from "react-icons/hi";

export default function ForgetPassword({
    onClose,
    onSend,
  }: {
    onClose: () => void;
    onSend: () => void;
  }) {
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your API call here
    // Send { email, password } or { phone, password } based on tab
    onSend();
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gold">Reset Password</h2>
      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 rounded-l ${tab === "email" ? "bg-gold text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("email")}
          type="button"
        >
          Email
        </button>
        <button
          className={`flex-1 py-2 rounded-r ${tab === "phone" ? "bg-gold text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("phone")}
          type="button"
        >
          Phone
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {tab === "email" ? (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <HiOutlineMail className="w-5 h-5" />
              </span>
              <input
                type="email"
                className="w-full border rounded px-10 py-2 focus:ring-2 focus:ring-gold focus:outline-none"
                placeholder="Enter your email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <HiOutlinePhone className="w-5 h-5" />
              </span>
              <input
                type="tel"
                className="w-full border rounded px-10 py-2 focus:ring-2 focus:ring-gold focus:outline-none"
                placeholder="Enter your phone"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-gold text-white font-semibold hover:bg-gold-dark transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}