"use client";
import { usePlaceBidMutation } from "@/redux/services/auctionApi";
import { BidFormInput } from "@/types/Bid";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import ErrorForm from "../ErrorForm";

const BidForm = () => {
  const { auctionId } = useParams();
  const [placeBid, { error, isLoading }] = usePlaceBidMutation();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<BidFormInput>();

  const onSubmit: SubmitHandler<BidFormInput> = async (data) => {
    const payload = {
      auctionId,
      amount: Number(data.amount),
    };
    await placeBid(payload);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl font-bold">Bid</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-1 text-sm">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.10"
            required
            {...formRegister("amount")}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.amount && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
          <ErrorForm error={error} />
        </div>
        <SubmitButton label="Place Bid" disabled={isLoading} />
      </form>
    </div>
  );
};

export default BidForm;
