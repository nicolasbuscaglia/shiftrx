import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../base-query";
import { Auction, AuctionFormInput } from "@/types/Auction";
import { BidFormInput } from "@/types/Bid";

const basePath = "/auction/";

export const auctionApi = createApi({
  reducerPath: "auctionApi",
  baseQuery,
  tagTypes: ["auctions", "auction", "auctions-user", "bids-user"],
  endpoints: (builder) => ({
    getAllAuctions: builder.query<Auction[], void>({
      query: () => `${basePath}`,
      providesTags: ["auctions"],
    }),
    getById: builder.query<Auction, { auctionId: string | string[] }>({
      query: ({ auctionId }) => `${basePath}${auctionId}/bids`,
      providesTags: ["auction"],
    }),
    getAllAuctionsByUser: builder.query<Auction[], void>({
      query: () => `${basePath}user`,
      providesTags: ["auctions-user"],
    }),
    getAllBidsByUser: builder.query<Auction[], void>({
      query: () => `${basePath}bids/user`,
      providesTags: ["bids-user"],
    }),
    createAuction: builder.mutation<Auction, AuctionFormInput>({
      query: (payload) => ({
        url: `${basePath}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auctions", "auction", "auctions-user"],
    }),
    updateAuction: builder.mutation<
      Auction,
      Omit<AuctionFormInput, "startingPrice">
    >({
      query: (payload) => ({
        url: `${basePath}${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["auctions", "auction", "auctions-user"],
    }),
    deleteAuction: builder.mutation<Auction, { auctionId: string | string[] }>({
      query: ({ auctionId }) => ({
        url: `${basePath}${auctionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["auctions", "auction", "auctions-user", "bids-user"],
    }),
    placeBid: builder.mutation<Auction, BidFormInput>({
      query: (payload) => ({
        url: `${basePath}${payload.auctionId}/bid`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auctions", "auction", "auctions-user", "bids-user"],
    }),
  }),
});

export const {
  useGetAllAuctionsQuery,
  useGetByIdQuery,
  useCreateAuctionMutation,
  useUpdateAuctionMutation,
  useDeleteAuctionMutation,
  usePlaceBidMutation,
  useGetAllAuctionsByUserQuery,
  useGetAllBidsByUserQuery,
} = auctionApi;
