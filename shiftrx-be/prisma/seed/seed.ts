import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';

async function main() {
  // Delete all existing records
  await prisma.bid.deleteMany({});
  await prisma.auction.deleteMany({});
  await prisma.user.deleteMany({});

  // Hashing the password before creating users
  const hashedPassword1 = bcrypt.hashSync('password1', 10);
  const hashedPassword2 = bcrypt.hashSync('password2', 10);

  // Creating users
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      password: hashedPassword1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      password: hashedPassword2,
    },
  });

  // Create auctions
  const auction1 = await prisma.auction.create({
    data: {
      title: 'First Auction',
      description: 'This is the first auction',
      startingPrice: 100.0,
      currentPrice: 100.0,
      endTime: new Date('2024-12-31T23:59:59.000Z'),
      userId: user1.id,
    },
  });

  const auction2 = await prisma.auction.create({
    data: {
      title: 'Second Auction',
      description: 'This is the second auction',
      startingPrice: 200.0,
      currentPrice: 200.0,
      endTime: new Date('2024-12-31T23:59:59.000Z'),
      userId: user2.id,
    },
  });

  // Create bids
  await prisma.bid.create({
    data: {
      auctionId: auction1.id,
      userId: user2.id,
      amount: 150.0,
    },
  });

  await prisma.bid.create({
    data: {
      auctionId: auction2.id,
      userId: user1.id,
      amount: 250.0,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
