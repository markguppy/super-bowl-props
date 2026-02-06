import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

const propBets = [
  { order: 1, topic: "Coin toss result", choiceA: "Heads", choiceB: "Tails" },
  { order: 2, topic: "Total points scored in the game", choiceA: "Over 45.5 points", choiceB: "Under 45.5 points" },
  { order: 3, topic: "First team to score", choiceA: "Seattle Seahawks", choiceB: "New England Patriots" },
  { order: 4, topic: "Winning team", choiceA: "Seattle Seahawks", choiceB: "New England Patriots" },
  { order: 5, topic: "Total turnovers in the game", choiceA: "Over 2.5", choiceB: "Under 2.5" },
  { order: 6, topic: "Team to score the most touchdowns", choiceA: "Seattle Seahawks", choiceB: "New England Patriots" },
  { order: 7, topic: "First touchdown type (Patriots)", choiceA: "Passing TD", choiceB: "Rushing TD" },
  { order: 8, topic: "First touchdown type (Seahawks)", choiceA: "Passing TD", choiceB: "Rushing TD" },
  { order: 9, topic: "Patriots team total points", choiceA: "Over 20.5", choiceB: "Under 20.5" },
  { order: 10, topic: "Seahawks team total points", choiceA: "Over 24.5", choiceB: "Under 24.5" },
  { order: 11, topic: "Drake Maye passing yards", choiceA: "Over 220.5 yards", choiceB: "Under 220.5 yards" },
  { order: 12, topic: "Sam Darnold passing yards", choiceA: "Over 229.5 yards", choiceB: "Under 229.5 yards" },
  { order: 13, topic: "Kenneth Walker III rushing yards", choiceA: "Over 73.5 yards", choiceB: "Under 73.5 yards" },
  { order: 14, topic: "Stefon Diggs receptions", choiceA: "Over 4.5 catches", choiceB: "Under 4.5 catches" },
  { order: 15, topic: "Hunter Henry receiving yards", choiceA: "Over 39.5 yards", choiceB: "Under 39.5 yards" },
  { order: 16, topic: "First player to score a touchdown", choiceA: "Seahawks player", choiceB: "Patriots player" },
  { order: 17, topic: "Any defensive or special teams touchdown", choiceA: "Yes", choiceB: "No" },
  { order: 18, topic: "Longest touchdown in the game", choiceA: "Over 44.5 yards", choiceB: "Under 44.5 yards" },
  { order: 19, topic: "Total sacks in the game", choiceA: "Over 5.5", choiceB: "Under 5.5" },
  { order: 20, topic: "Total field goals made", choiceA: "Over 3.5", choiceB: "Under 3.5" },
  { order: 21, topic: "First scoring play", choiceA: "Touchdown", choiceB: "Field goal" },
  { order: 22, topic: "Halftime leader", choiceA: "Seattle Seahawks", choiceB: "New England Patriots" },
  { order: 23, topic: "Super Bowl MVP team", choiceA: "Seattle Seahawks", choiceB: "New England Patriots" },
  { order: 24, topic: "Total rushing touchdowns", choiceA: "Over 1.5", choiceB: "Under 1.5" },
  { order: 25, topic: "Total passing touchdowns", choiceA: "Over 3.5", choiceB: "Under 3.5" },
];

async function main() {
  console.log("Seeding prop bets...");

  for (const bet of propBets) {
    await prisma.propBet.upsert({
      where: { order: bet.order },
      update: bet,
      create: bet,
    });
  }

  console.log("Seeded 25 prop bets.");

  // Seed admin user
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username: "admin" },
  });

  if (!existingAdmin) {
    const password = crypto.randomBytes(16).toString("base64url");
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({
      data: { username: "admin", passwordHash },
    });
    console.log("\n=== ADMIN CREDENTIALS ===");
    console.log(`Username: admin`);
    console.log(`Password: ${password}`);
    console.log("=========================\n");
  } else {
    console.log("Admin user already exists, skipping.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
