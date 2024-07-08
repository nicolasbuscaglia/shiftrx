"use client";
import AuctionForm from "@/components/auction/AuctionForm";
import Loader from "@/components/Loader";
import {
  useGetByIdQuery,
  useUpdateAuctionMutation,
} from "@/redux/services/auctionApi";
import { AuctionFormInput } from "@/types/Auction";
import { redirect, useParams, useRouter } from "next/navigation";

const EditAuction = () => {
  const router = useRouter();
  const { auctionId } = useParams();

  const { data: auction, isLoading, error } = useGetByIdQuery({ auctionId });

  const [editAuction] = useUpdateAuctionMutation();

  const onSubmit = async (data: AuctionFormInput) => {
    const payload = {
      ...data,
      endTime: new Date(data.endTime).toISOString(),
      id: auctionId,
    };
    const { data: updatedAuction } = await editAuction(payload);
    if (updatedAuction) router.push(`/auction/${updatedAuction.id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!auction) {
    redirect("/");
  }

  return (
    <AuctionForm
      title="Edit Auction"
      label="Save"
      auction={auction}
      onSubmitForm={onSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default EditAuction;
