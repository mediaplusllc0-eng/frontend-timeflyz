"use client";
import React, { useEffect, useState } from "react";
import { CirclePower, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FavoritesLayout from "@/components/ui/Layout";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  useGetProfileQuery,
  useUpdateCustomerMutation,
} from "./services/userApi";
import { clearProfile, setProfile } from "./services/userSlice";
import { persistor } from "@/utils/store";
import { api } from "@/utils/api2";

type FormValues = {
  name: string;
  phone: string;
  email: string;
};

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const profile = useAppSelector((state) => state.profile?.data?.data);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: refetchProfile,
  } = useGetProfileQuery({});
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!profile?._id) {
      toast.error("User not authenticated");
      router.push("/");
      return;
    }

    reset({
      name: profile.name || "",
      phone: profile.phone || "",
      email: profile.email || "",
    });
  }, [profile, reset, router]);

  const onSubmit = async (data: FormValues) => {
    const updatePayload = {
      id: profile._id,
      ...data,
    };

    try {
      const updatedUser = await updateCustomer(updatePayload).unwrap();

      const profileRes = await refetchProfile();
      if (profileRes.data) {
        dispatch(setProfile(profileRes.data));
      }

      localStorage.setItem("userData", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();

      dispatch(clearProfile());

      await persistor.purge();

      await dispatch(api.util.resetApiState());
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <FavoritesLayout>
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold mb-8 text-black">
                My information
              </h1>
              <button
                onClick={handleLogout}
                className="text-primary-600 hover:bg-primary-600 hover:text-white transition-colors duration-300 border px-3 py-2 rounded-full flex gap-2 items-center"
              >
                <span className="hidden md:inline font-semibold">Logout</span>
                
                <CirclePower size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <div>
                <label className="text-gray-600 text-base ml-3">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  disabled={!isEditing}
                  className={`w-full border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none text-black mt-2 ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 ml-3 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-base ml-3">Phone</label>
                <input
                  {...register("phone")}
                  disabled={!isEditing}
                  className={`w-full border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none text-black mt-2 ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div>
                <label className="text-gray-600 text-base ml-3">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  disabled={!isEditing}
                  className={`w-full border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none text-black mt-2 ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 ml-3 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-3">
                <input type="checkbox" disabled />
                <span className="text-sm font-medium text-gray-500">
                  Get the latest news from the best hotels in the world
                </span>
              </label>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 0 rounded-full"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-full"
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset({
                        name: profile.name,
                        phone: profile.phone,
                        email: profile.email,
                      });
                    }}
                    className="border border-gray-300 text-gray-600 py-2 px-6 rounded-full hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>

            <div className="mt-10 border-t pt-6 text-sm text-gray-500">
              <p>
                <strong>How is my information managed?</strong> <br />
                TimeFlyz does not share any of your information with hotels or
                third-party services.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="mt-4 underline text-primary-500 font-semibold hover:text-primary-700 transition-colors duration-300" 
              >
                Delete my account
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete your account?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              {/* <button
                onClick={async () => {
                  try {
                    await api.delete(`customer/delete/${profile._id}`);
                    localStorage.clear();
                    toast.success("Account deleted successfully!");
                    router.push("/");
                  } catch (error: any) {
                    toast.error(
                      error?.response?.data?.message ||
                        "Failed to delete account"
                    );
                  }
                }}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Yes, delete it
              </button> */}
            </div>
          </div>
        </div>
      )}
    </FavoritesLayout>
  );
}
