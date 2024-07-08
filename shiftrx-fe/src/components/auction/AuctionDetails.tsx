import { Auction } from "@/types/Auction";
import {
  ArrowUpCircleIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";

interface AuctionDetailsProps {
  auction: Auction;
}

const AuctionDetails = ({ auction }: AuctionDetailsProps) => {
  return (
    <div>
      <div className="text-left text-lg font-bold mb-3">{auction.title}</div>
      <div className="text-left text-md mb-3">{auction.description}</div>
      <div className="flex gap-3 mb-3">
        <CurrencyDollarIcon className="h-6 w-6" />
        <div>${auction.currentPrice}</div>
      </div>
      <div className="flex gap-3 mb-3">
        <ArrowUpCircleIcon className="h-6 w-6" />
        <div>${auction.startingPrice}</div>
      </div>
      <div className="flex gap-3 mb-3">
        <CalendarDaysIcon className="h-6 w-6" />
        {moment(auction.endTime).format("MMMM Do YYYY, h:mm:ss a")}
      </div>
      <div className="flex gap-3">
        <UserIcon className="h-5 w-5" />
        <div>{auction.user.username}</div>
      </div>
    </div>
  );
};

export default AuctionDetails;
