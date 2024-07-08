import { Bid } from "./Bid";
import { User } from "./User";

export interface Auction {
  id: string;
  title: string;
  description?: string;
  startingPrice: number;
  currentPrice: number;
  endTime: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  bids: Bid[];
  user: User;
}

export type AuctionFormInput = {
  id: string | string[];
  title: string;
  description?: string;
  startingPrice: number;
  endTime: string;
};
