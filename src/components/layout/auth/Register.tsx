"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "./authApi";
import Button from "@/components/ui/Button";

interface RegisterProps {
  onVerifyClick: () => void;
  onLoginClick: () => void;
  setEmailToVerify: React.Dispatch<
    React.SetStateAction<{ email: string; status: string }>
  >;
  setOtpFor: React.Dispatch<React.SetStateAction<string>>;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

type RegisterFormInputs = Yup.InferType<typeof validationSchema>;

export default function Register({
  setEmailToVerify,
  setOtpFor,
  onVerifyClick,
  onLoginClick,
}: RegisterProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormInputs) => {
    const { confirmPassword, ...registerData } = data;

    try {
      const response = await registerUser(registerData).unwrap();

      toast.success(response.message || "Registered successfully");
      setEmailToVerify(response.data);
      setOtpFor("email_verification");
      onVerifyClick?.();
    } catch (err: any) {
      console.log("err", err);
      if (
        err?.status === 409 &&
        err?.data?.data?.status === "email_verification_pending"
      ) {
        setEmailToVerify(err.data.data);
        setOtpFor("email_verification");
        toast.info(err?.data?.message || "Email verification required.");
        onVerifyClick?.();
      } else {
        toast.error(err?.data?.message || "Registration failed.");
      }
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Sign up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...field}
                  type="text"
                  className="w-full px-4 py-2 border  border-gray-300 rounded-xl focus:ring-2 focus:ring-gold text-gray-700"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  {...field}
                  type="tel"
                  className="w-full px-4 py-2 border  border-gray-300 rounded-xl focus:ring-2 focus:ring-gold text-gray-700"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  {...field}
                  type="email"
                  className="w-full px-4 py-2 border  border-gray-300 rounded-xl focus:ring-2 focus:ring-gold text-gray-700"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  {...field}
                  type="password"
                  className="w-full px-4 py-2 border  border-gray-300 rounded-xl focus:ring-2 focus:ring-gold text-gray-700"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  {...field}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold text-gray-700"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            {isLoading ? "Registering..." : "Sign up"}
          </Button>
        </form>

        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="ml-2">Google</span>
            </button>
          </div>
        </div> */}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onLoginClick}
              className="font-medium text-primary-500 hover:text-primary-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
