import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { Auction, Prisma } from '@prisma/client';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { CreateBidDto } from '../bid/dto/create-bid.dto';
import { BidService } from '../bid/bid.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/types/auth.types';

@Controller('auction')
export class AuctionController {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly bidService: BidService,
  ) {}

  @Get()
  async getAll(): Promise<Auction[]> {
    return await this.auctionService.getAll({});
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getAllByUser(@Req() req: RequestWithUser): Promise<Auction[]> {
    return await this.auctionService.getAll({
      where: { userId: req.user.userId },
      include: { bids: true },
    });
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    include?: Prisma.AuctionInclude,
  ): Promise<Auction> {
    const auction = await this.auctionService.get(
      { id },
      { user: { select: { id: true, username: true } }, ...include },
    );
    if (!auction) {
      throw new NotFoundException('Auction not found');
    }
    return auction;
  }

  @UseGuards(JwtAuthGuard)
  @Get('bids/user')
  async getAllByUserBids(@Req() req: RequestWithUser): Promise<Auction[]> {
    return await this.auctionService.getAll({
      where: { bids: { some: { userId: req.user.userId } } },
      include: { bids: true },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() newAuction: CreateAuctionDto,
  ): Promise<Auction> {
    const userId = req.user.userId;
    const auction: Prisma.AuctionCreateInput = {
      ...newAuction,
      currentPrice: newAuction.startingPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: { id: userId },
      },
    };
    return await this.auctionService.create(auction);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedAuction: UpdateAuctionDto,
  ): Promise<Auction> {
    await this.getById(id);

    const auction: Prisma.AuctionUpdateInput = {
      ...updatedAuction,
      updatedAt: new Date(),
    };
    return await this.auctionService.update({
      where: { id },
      data: auction,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Auction> {
    await this.getById(id);
    return await this.auctionService.delete({ id });
  }

  @Get(':id/bids')
  async getBids(@Param('id') id: string): Promise<Auction> {
    return await this.getById(id, {
      bids: {
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, username: true } } },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/bid')
  async addBid(
    @Req() req: RequestWithUser,
    @Param('id') auctionId: string,
    @Body() newBid: CreateBidDto,
  ): Promise<Auction> {
    const userId = req.user.userId;
    const auction = await this.getById(auctionId);
    const amount = newBid.amount;

    if (auction.endTime < new Date()) {
      throw new BadRequestException('Auction ended');
    }

    if (auction.currentPrice >= amount) {
      throw new BadRequestException(
        'Bid cannot be less than or equal to the current auction price',
      );
    }

    const bid: Prisma.BidCreateInput = {
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      auction: {
        connect: { id: auctionId },
      },
      user: {
        connect: { id: userId },
      },
    };

    await this.bidService.create(bid);

    return await this.auctionService.update({
      where: { id: auctionId },
      data: { currentPrice: amount },
    });
  }
}
