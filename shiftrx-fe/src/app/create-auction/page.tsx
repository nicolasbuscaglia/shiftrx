"use client";
import AuctionForm from "@/components/auction/AuctionForm";
import { useCreateAuctionMutation } from "@/redux/services/auctionApi";
import { AuctionFormInput } from "@/types/Auction";
import { useRouter } from "next/navigation";

const CreateAuction = () => {
  const router = useRouter();
  const [createAuction, { isLoading, error }] = useCreateAuctionMutation();

  const onSubmit = async (data: AuctionFormInput) => {
    const payload = {
      ...data,
      startingPrice: Number(data.startingPrice),
      endTime: new Date(data.endTime).toISOString(),
    };
    const { data: newAuction } = await createAuction(payload);
    if (newAuction) router.push(`/auction/${newAuction.id}`);
  };

  return (
    <AuctionForm
      title="Create Auction"
      label="Create"
      onSubmitForm={onSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default CreateAuction;
