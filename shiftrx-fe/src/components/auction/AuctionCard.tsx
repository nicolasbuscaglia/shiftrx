import { Auction } from "@/types/Auction";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import Link from "next/link";

interface AuctionCardProps {
  auction: Auction;
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
  return (
    <Link href={`auction/${auction.id}`}>
      <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
        <div className="text-left text-lg font-bold mb-3">{auction.title}</div>
        <div className="flex gap-3 mb-3">
          <CurrencyDollarIcon className="h-6 w-6" />
          <div>${auction.currentPrice}</div>
        </div>
        <div className="flex gap-3">
          <CalendarDaysIcon className="h-6 w-6" />
          {moment(auction.endTime).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
