import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [BidService, PrismaService],
})
export class BidModule {}
