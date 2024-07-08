"use client";
import { Auction, AuctionFormInput } from "@/types/Auction";
import { formatDateForInput, getFormattedLocalDateTime } from "@/utils/date";
import { useForm, SubmitHandler } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import ErrorForm from "../ErrorForm";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useMemo } from "react";

interface AuctionFormProps {
  title: string;
  label: string;
  auction?: Auction;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  onSubmitForm: (data: AuctionFormInput) => void;
}

const AuctionForm = ({
  title,
  label,
  auction,
  onSubmitForm,
  isLoading,
  error,
}: AuctionFormProps) => {
  const defaults = useMemo(
    () => ({
      title: auction?.title || "",
      description: auction?.description || "",
      startingPrice: auction?.startingPrice || 0,
      endTime: auction?.endTime ? formatDateForInput(auction.endTime) : "",
    }),
    [auction]
  );

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<AuctionFormInput>({ defaultValues: defaults });

  const onSubmit: SubmitHandler<AuctionFormInput> = async (data) => {
    onSubmitForm(data);
  };

  return (
    <div className="flex justify-center p-3">
      <div className="p-6 bg-white rounded shadow-md mt-3 w-full max-w-xl">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 text-sm">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              {...formRegister("title")}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 text-sm">
              Description
            </label>
            <input
              id="description"
              type="text"
              {...formRegister("description")}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6">
                <label htmlFor="startingPrice" className="block mb-1 text-sm">
                  Starting Price
                </label>
                <input
                  id="startingPrice"
                  type="number"
                  step="0.10"
                  required
                  disabled={!!auction}
                  {...formRegister("startingPrice")}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.startingPrice && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="md:col-span-6">
                <label htmlFor="endTime" className="block mb-1 text-sm">
                  End Time
                </label>
                <input
                  id="endTime"
                  type="datetime-local"
                  min={getFormattedLocalDateTime()}
                  required
                  {...formRegister("endTime")}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.endTime && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <ErrorForm error={error} />
          <SubmitButton label={label} disabled={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default AuctionForm;
