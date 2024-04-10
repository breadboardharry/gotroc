import { PrismaClient } from '@prisma/client';
import { SeedCategories } from './categories';
import { SeedUsers } from './users';
import { SeedOffers } from './offers';
const prisma = new PrismaClient();

async function main() {
  // Generate all categories and subcategories
  for (const [mainCategoryName, subCategoryNames] of Object.entries(SeedCategories)) {
    await prisma.mainCategory.upsert({
      where: { name: mainCategoryName },
      update: {},
      create: {
        name: mainCategoryName,
        subCategories: {
          create: subCategoryNames.map((name) => ({ name })),
        },
      },
    });
  }

  // Generate all users and their offers
  let offerIndex = 0;
  for (const seedUser of SeedUsers) {
    await prisma.user.upsert({
      where: { email: seedUser.email },
      update: {},
      create: {
        username: seedUser.username,
        firstname: seedUser.firstname,
        lastname: seedUser.lastname,
        email: seedUser.email,
        offers: {
          create: Array.from({ length: seedUser.nbDefaultOffers }).map(() => {
            if (offerIndex >= SeedOffers.length) offerIndex = 0;
            const offer = SeedOffers[offerIndex++];
            return offer;
          }),
        },
      },
    });
  }
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
