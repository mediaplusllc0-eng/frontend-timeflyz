"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "./authApi";
import { setAuthUser } from "./authSlice";
import { useAppDispatch } from "@/utils/hooks";
import { useAuth } from "@/hooks/useAuth";
import { useGetProfileQuery } from "@/app/profile/services/userApi";
import { setProfile } from "@/app/profile/services/userSlice";
import Button from "@/components/ui/Button";

interface LoginProps {
  onRegisterClick: () => void;
  onLoginSuccess: () => void;
  onForgotPassword: () => void;
}

type LoginFormInputs = {
  emailOrPhone: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  emailOrPhone: Yup.string().required("Email or phone is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login({
  onRegisterClick,
  onForgotPassword,
  onLoginSuccess,
}: LoginProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: refetchProfile,
  } = useGetProfileQuery({});

  const onSubmit = async (data: LoginFormInputs) => {
    const isEmail = data.emailOrPhone.includes("@");
    const loginData = {
      [isEmail ? "email" : "phone"]: data.emailOrPhone,
      password: data.password,
    };

    try {
      const response = await loginUser(loginData).unwrap();
      const { access_token, refresh_token, ...userData } = response.data;
      if (access_token && refresh_token && userData) {
        dispatch(
          setAuthUser({
            token: access_token,
            refreshToken: refresh_token,
            user: userData,
          })
        );
        localStorage.setItem("token", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        localStorage.removeItem("guestFavorites");
        toast.success(response.message);

        const profileRes = await refetchProfile();
        if (profileRes.data) {
          dispatch(setProfile(profileRes.data));
        }

        onLoginSuccess?.();
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      const message = error?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-bold text-black">
        Sign in
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="emailOrPhone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email or phone
          </label>
          <Controller
            name="emailOrPhone"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="emailOrPhone"
                {...field}
                placeholder="Email or phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-gray-700"
              />
            )}
          />
          {errors.emailOrPhone && (
            <p className="text-sm text-red-600 mt-1">
              {errors.emailOrPhone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                id="password"
                {...field}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-gray-700"
              />
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
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
              type="button"
              onClick={onForgotPassword}
              className="font-medium text-primary-500"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full text-white py-2 px-4 rounded"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            onClick={onRegisterClick}
            className="font-medium text-primary-500 hover:underline hover:text-primary-600"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
