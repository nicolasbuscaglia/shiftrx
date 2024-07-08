import { Module } from '@nestjs/common';
import { AuctionModule } from './auction/auction.module';
import { BidModule } from './bid/bid.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuctionModule, BidModule, AuthModule],
})
export class AppModule {}
