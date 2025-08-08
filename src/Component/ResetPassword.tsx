import React, { useState } from "react";
import { HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";

export default function ResetPassword({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-2 text-gold">
        Set New Password
      </h2>
      <p className="text-gray-500 text-center mb-6 text-sm">
        Please enter your new password to complete the reset process.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <HiOutlineLockClosed className="w-5 h-5" />
            </span>
            <input
              type={show ? "text" : "password"}
              className="w-full border rounded px-10 py-2 focus:ring-2 focus:ring-gold focus:outline-none pr-12"
              placeholder="Enter new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gold"
              tabIndex={-1}
              onClick={() => setShow((s) => !s)}
            >
              {show ? (
                <HiEyeOff className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-2 mt-8">
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
