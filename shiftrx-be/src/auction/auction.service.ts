import { Injectable } from '@nestjs/common';
import { Prisma, Auction } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuctionService {
  constructor(private prisma: PrismaService) {}

  async get(
    auctionWhereUniqueInput: Prisma.AuctionWhereUniqueInput,
    include?: Prisma.AuctionInclude,
  ): Promise<Auction | null> {
    return await this.prisma.auction.findUnique({
      where: auctionWhereUniqueInput,
      include,
    });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AuctionWhereUniqueInput;
    where?: Prisma.AuctionWhereInput;
    orderBy?: Prisma.AuctionOrderByWithRelationInput;
    include?: Prisma.AuctionInclude;
  }): Promise<Auction[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return await this.prisma.auction.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async create(data: Prisma.AuctionCreateInput): Promise<Auction> {
    return await this.prisma.auction.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.AuctionWhereUniqueInput;
    data: Prisma.AuctionUpdateInput;
  }): Promise<Auction> {
    const { where, data } = params;
    return await this.prisma.auction.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.AuctionWhereUniqueInput): Promise<Auction> {
    return await this.prisma.auction.delete({
      where,
    });
  }
}
