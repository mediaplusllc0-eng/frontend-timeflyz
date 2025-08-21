import React, { useState } from "react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "./authApi";

type FormValues = {
  email?: string;
  phone?: string;
};

export default function ForgetPassword({
  onClose,
  onSend,
}: {
  onClose: () => void;
  onSend: (email: string, phone: string) => void;
}) {
  const [tab, setTab] = useState<"email" | "phone">("email");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await forgotPassword(data).unwrap();
      toast.success(response?.message || "Password reset link sent!");
      onSend(data.email || "", data.phone || "");
      reset();
    } catch (error: any) {
      const message = error?.data?.message || "Failed to send reset request";
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Reset password
      </h2>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 rounded-l ${
            tab === "email"
              ? "bg-[rgb(212,175,55,1)] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setTab("email")}
          type="button"
        >
          Email
        </button>
        <button
          className={`flex-1 py-2 rounded-r ${
            tab === "phone"
              ? "bg-[rgb(212,175,55,1)] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setTab("phone")}
          type="button"
        >
          Phone
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {tab === "email" ? (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#4B4D4D]">
                <HiOutlineMail className="w-5 h-5" />
              </span>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <input
                    type="email"
                    className="w-full border rounded px-10 py-2 text-gray-500"
                    placeholder="Enter your email"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Phone
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#4B4D4D]">
                <HiOutlinePhone className="w-5 h-5" />
              </span>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                  <input
                    type="tel"
                    className="w-full border rounded px-10 py-2 text-gray-500"
                    placeholder="Enter your phone"
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[rgb(212,175,55,1)] text-white font-semibold hover:bg-opacity-90 transition w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}
