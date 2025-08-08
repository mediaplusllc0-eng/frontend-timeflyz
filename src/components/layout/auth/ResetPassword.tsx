import React, { useState } from "react";
import { HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useSetForgotPasswordMutation } from "./authApi";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

type FormData = yup.InferType<typeof schema>;

interface ResetPasswordProps {
  onClose: () => void;
  onSuccess: () => void;
  email: string;
  resetPasswordToken: string;
}

export default function ResetPassword({
  onClose,
  onSuccess,
  email,
  resetPasswordToken,
}: ResetPasswordProps) {
  const [show, setShow] = useState(false);
  const [setForgotPassword, { isLoading }] = useSetForgotPasswordMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await setForgotPassword({
        token: resetPasswordToken,
        password: data.password,
      }).unwrap();

      if (response?.status === 200) {
        toast.success(response.message || "Password reset successful.");
        onSuccess();
      } else {
        toast.error("Failed to reset password.");
      }
    } catch (error: any) {
      const message = error?.data?.message || "Failed to reset password.";
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
        Reset Password
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Please enter your new password to complete the reset process.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <HiOutlineLockClosed className="w-5 h-5" />
            </span>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full px-10 py-2 border rounded pr-12 text-gray-600"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
              )}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShow((prev) => !prev)}
              tabIndex={-1}
            >
              {show ? (
                <HiEyeOff className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <HiOutlineLockClosed className="w-5 h-5" />
            </span>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="confirmPassword"
                  type={show ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full px-10 py-2 border rounded pr-12 text-gray-600"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby="confirmPassword-error"
                />
              )}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShow((prev) => !prev)}
              tabIndex={-1}
            >
              {show ? (
                <HiEyeOff className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-[rgb(212,175,55,1)] text-white font-semibold rounded disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
