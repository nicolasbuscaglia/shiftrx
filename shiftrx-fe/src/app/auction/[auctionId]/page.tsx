"use client";
import {
  useDeleteAuctionMutation,
  useGetByIdQuery,
} from "@/redux/services/auctionApi";
import Link from "next/link";
import { ReactNode } from "react";
import moment from "moment";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";
import BidForm from "@/components/bid/BidForm";
import BidCard from "@/components/bid/BidCard";
import AuctionDetails from "@/components/auction/AuctionDetails";

const Auction = () => {
  const router = useRouter();
  const { auctionId } = useParams();
  const { data: auction, isLoading } = useGetByIdQuery({ auctionId });
  const [deleteAuction, { isLoading: isDeleteLoading }] =
    useDeleteAuctionMutation();

  const handleDelete = async () => {
    const { data } = await deleteAuction({ auctionId });
    if (data) router.push("/");
  };

  const AuctionsContainer = ({ children }: { children: ReactNode }) => {
    return (
      <div className="text-center p-3">
        <div className="flex items-center gap-1 pl-1">
          <ChevronLeftIcon className="h-4 w-4" />
          <Link href="/">
            <div className="text-sm">Auctions</div>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-xl text-center mx-auto">Auction</h2>
          </div>
          <div className="flex items-center gap-1">
            <Link href={`/edit-auction/${auctionId}`}>
              <div className="py-2 px-4 text-blue-500 border rounded border-blue-500 hover:text-white hover:bg-blue-600 focus:outline-none disabled:bg-blue-300">
                Edit
              </div>
            </Link>
            <button
              className="py-2 px-4 text-red-500 border rounded border-red-500 hover:text-white hover:bg-red-600 focus:outline-none disabled:bg-red-300"
              onClick={handleDelete}
              disabled={isDeleteLoading}
            >
              Delete
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  };

  if (isLoading) {
    return (
      <AuctionsContainer>
        <div className="mt-10 justify-center items-center">
          <Loader size={8} />
        </div>
      </AuctionsContainer>
    );
  }

  if (!auction) {
    return (
      <AuctionsContainer>
        <h3 className="text-lg">Auction not found</h3>
      </AuctionsContainer>
    );
  }

  return (
    <AuctionsContainer>
      <div className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-9">
            <AuctionDetails auction={auction} />
          </div>
          <div className="md:col-span-3">
            <BidForm />
          </div>
        </div>
        <div className="mt-6">
          <div className="text-left text-xl font-bold mb-3">Bids</div>
          {auction.bids?.map((bid, index) => (
            <div key={index}>
              <BidCard bid={bid} />
            </div>
          ))}
        </div>
      </div>
    </AuctionsContainer>
  );
};

export default Auction;
