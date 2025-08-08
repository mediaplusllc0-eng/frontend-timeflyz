"use client";
import React, { useState } from "react";
import endpoints from "../utils/endpoints";
import axios from "axios";

interface LoginProps {
  onRegisterClick: () => void;
  onLoginSuccess?: () => void;
  onForgotPassword: () => void;
}

export default function Login({
  onForgotPassword,
  onRegisterClick,
  onLoginSuccess,
}: LoginProps) {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine if input is email or phone
    const isEmail = formData.emailOrPhone.includes("@");

    const loginData = {
      [isEmail ? "email" : "phone"]: formData.emailOrPhone,
      password: formData.password,
    };

    axios
      .post(endpoints.LOGIN, loginData)
      .then((response) => {
        console.log(response);
        onLoginSuccess?.();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-bold underline font-lora">
        Sign in
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="emailOrPhone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email or phone
          </label>
          <input
            type="text"
            id="emailOrPhone"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            placeholder="Email or phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <button
              className="font-medium text-gold hover:text-gold-dark"
              onClick={() => {
                console.log("Button clicked in Login.tsx");
                onForgotPassword();
              }}
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gold text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6">
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
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onRegisterClick}
            className="font-medium text-gold hover:text-gold-dark"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
