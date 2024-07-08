import { Injectable } from '@nestjs/common';
import { Prisma, Bid } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BidService {
  constructor(private prisma: PrismaService) {}

  async getAllByUser(userId: string): Promise<Bid[]> {
    return await this.prisma.bid.findMany({
      where: {
        userId,
      },
      include: {
        auction: true,
      },
    });
  }

  async create(data: Prisma.BidCreateInput): Promise<Bid> {
    return await this.prisma.bid.create({
      data,
    });
  }
}
