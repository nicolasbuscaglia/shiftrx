import { User } from "./User";

export interface Bid {
  id: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export type BidFormInput = {
  auctionId: string | string[];
  amount: number;
};
