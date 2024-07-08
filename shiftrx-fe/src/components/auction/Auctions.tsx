"use client";
import { useGetAllAuctionsQuery } from "@/redux/services/auctionApi";
import Link from "next/link";
import { ReactNode } from "react";
import Loader from "../Loader";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/context/AuthProvider";
import AuctionCard from "./AuctionCard";

const Auctions = () => {
  const { data, isLoading } = useGetAllAuctionsQuery();
  const { isAuthenticated } = useAuth();

  const AuctionsContainer = ({ children }: { children: ReactNode }) => {
    return (
      <div className="text-center pt-3">
        <h2 className="text-xl mb-3">Auctions</h2>
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

  return (
    <AuctionsContainer>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {isAuthenticated && (
          <Link href={`create-auction`}>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer h-full flex flex-col gap-1 items-center justify-center">
              <PlusCircleIcon className="h-8 w-8" />
              <div>Create Auction</div>
            </div>
          </Link>
        )}
        {data?.map((auction, index) => (
          <div key={index}>
            <AuctionCard auction={auction} />
          </div>
        ))}
      </div>
    </AuctionsContainer>
  );
};

export default Auctions;
