"use client";

import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useRatingHotelMutation } from "@/app/booking/services/bookingApi";
import { useAppSelector } from "@/utils/hooks";
import { toast } from "react-toastify";
import StarRating from "@/components/ui/StarRating";

interface ReviewModalProps {
  hotelId: string;
  onClose: () => void;
  onConfirmCancel: () => void;
  refetchBookings: () => void;
}

interface FormValues {
  comment: string;
  rating: number;
}

export default function ReviewModal({
  hotelId,
  onClose,
  onConfirmCancel,
  refetchBookings,
}: ReviewModalProps) {
  const [ratingHotel, { isLoading }] = useRatingHotelMutation();
  const profile = useAppSelector((state) => state.profile?.data?.data);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      comment: "",
      rating: 3.5,
    },
  });

  const onSubmit = async (data: FormValues) => {
    // if (!profile?._id || !hotelId) {
    //   toast.error("Missing user or hotel information.");
    //   return;
    // }

    try {
      await ratingHotel({
        customerId: profile?._id,
        comment: data.comment,
        hotelId,
        rating: data.rating,
      }).unwrap();

      toast.success("Review submitted successfully!");
      onClose();
      onConfirmCancel();
      refetchBookings();
    } catch (err: any) {
      console.error("Rating error:", err);
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Review Hotel
          </h2>

          {/* Rating */}
          <div className="mb-6">
            <p className="font-medium mb-4 text-gray-800">Rate</p>
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <StarRating rating={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Comment */}
          <div className="mb-6">
            
            <Controller
              control={control}
              name="comment"
              rules={{ maxLength: 300 }}
              render={({ field }) => (
                <>
                  <textarea
                    {...field}
                    placeholder="Share your experience.!"
                    className="w-full border border-gray-200 rounded-md p-3 h-24 resize-none text-gray-500 focus:outline-none"
                  />
                  <div className="text-xs text-gray-500 text-right mt-1">
                    {field.value?.length || 0}/300
                  </div>
                </>
              )}
            />
            {errors.comment && (
              <p className="text-sm text-red-500 mt-1">Comment is too long.</p>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary-500 rounded-full font-medium text-white"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-gray-500 uppercase text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
