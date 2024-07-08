"use client";

import AuctionCard from "@/components/auction/AuctionCard";
import BidCard from "@/components/bid/BidCard";
import Loader from "@/components/Loader";
import {
  useGetAllAuctionsByUserQuery,
  useGetAllBidsByUserQuery,
} from "@/redux/services/auctionApi";

const Dashboard = () => {
  const { data: auctions, isLoading: IsAuctionsLoading } =
    useGetAllAuctionsByUserQuery();
  const { data: auctionsBids, isLoading: isAuctionBidsLoading } =
    useGetAllBidsByUserQuery();

  const Auctions = () => {
    if (IsAuctionsLoading) {
      return <Loader />;
    }

    if (Array.isArray(auctions) && auctions.length === 0) {
      return <h4 className="text-center">No auctions yet</h4>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {auctions?.map((auction, index) => {
          return (
            <div key={index}>
              <AuctionCard auction={auction} />
            </div>
          );
        })}
      </div>
    );
  };

  const AuctionBids = () => {
    if (isAuctionBidsLoading) {
      return <Loader />;
    }

    if (Array.isArray(auctionsBids) && auctionsBids.length === 0) {
      return <h4 className="text-center">No bids yet</h4>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {auctionsBids?.map((auction, index) => {
          return (
            <div key={index}>
              <AuctionCard auction={auction} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="flex gap-3 items-center p-6 pb-0">
        <h2 className="mb-4 text-xl font-bold">My Auctions</h2>
        <h3 className="mb-4">(Auctions created by me)</h3>
      </div>
      <Auctions />
      <div className="flex gap-3 items-center p-6 pb-0">
        <h2 className="mb-4 text-xl font-bold">My Bids</h2>
        <h3 className="mb-4">(Auctions where I bid)</h3>
      </div>
      <AuctionBids />
    </div>
  );
};

export default Dashboard;
