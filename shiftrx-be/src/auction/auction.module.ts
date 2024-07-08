import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { BidService } from '../bid/bid.service';
import { BidModule } from '../bid/bid.module';

@Module({
  imports: [BidModule],
  providers: [AuctionService, PrismaService, BidService],
  controllers: [AuctionController],
})
export class AuctionModule {}
