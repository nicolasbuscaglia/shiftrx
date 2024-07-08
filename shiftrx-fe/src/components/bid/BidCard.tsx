import { Bid } from "@/types/Bid";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";

interface BidCardProps {
  bid: Bid;
}

const BidCard = ({ bid }: BidCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="flex gap-2 items-center md:col-span-2">
          <CurrencyDollarIcon className="h-6 w-6" />
          <div>${bid.amount}</div>
        </div>
        <div className="flex gap-2 items-center md:col-span-2">
          <UserIcon className="h-5 w-5" />
          <div>{bid.user.username}</div>
        </div>
        <div className="flex gap-2 items-center md:col-span-6">
          <CalendarDaysIcon className="h-6 w-6" />
          {moment(bid.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      </div>
    </div>
  );
};

export default BidCard;
