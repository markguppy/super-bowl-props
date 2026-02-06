import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

const propBets = [
  { order: 1, topic: "Coin Toss Result", choiceA: "Heads", choiceB: "Tails" },
  { order: 2, topic: "Who Wins the Coin Toss", choiceA: "Chiefs", choiceB: "Eagles" },
  { order: 3, topic: "First Team to Score", choiceA: "Chiefs", choiceB: "Eagles" },
  { order: 4, topic: "First Score of the Game", choiceA: "Touchdown", choiceB: "Field Goal" },
  { order: 5, topic: "National Anthem Length", choiceA: "Over 2 minutes", choiceB: "Under 2 minutes" },
  { order: 6, topic: "Total Points Scored (Over/Under 49.5)", choiceA: "Over", choiceB: "Under" },
  { order: 7, topic: "Will There Be a Safety?", choiceA: "Yes", choiceB: "No" },
  { order: 8, topic: "Will There Be Overtime?", choiceA: "Yes", choiceB: "No" },
  { order: 9, topic: "Super Bowl MVP Position", choiceA: "Quarterback", choiceB: "Non-QB" },
  { order: 10, topic: "First Penalty of the Game", choiceA: "Offensive penalty", choiceB: "Defensive penalty" },
  { order: 11, topic: "Gatorade Color Poured on Winning Coach", choiceA: "Orange/Yellow", choiceB: "Any other color" },
  { order: 12, topic: "Longest Touchdown of the Game", choiceA: "Over 39.5 yards", choiceB: "Under 39.5 yards" },
  { order: 13, topic: "Will Any Player Score 3+ Touchdowns?", choiceA: "Yes", choiceB: "No" },
  { order: 14, topic: "Total Turnovers in the Game", choiceA: "Over 2.5", choiceB: "Under 2.5" },
  { order: 15, topic: "Winning Margin", choiceA: "7 or more points", choiceB: "6 or fewer points" },
  { order: 16, topic: "First Coach's Challenge Result", choiceA: "Overturned", choiceB: "Stands/No challenge" },
  { order: 17, topic: "Total Field Goals Made", choiceA: "Over 3.5", choiceB: "Under 3.5" },
  { order: 18, topic: "Halftime Show: First Song Genre", choiceA: "Hip-hop/Rap", choiceB: "Other genre" },
  { order: 19, topic: "Will a Defensive/Special Teams TD Be Scored?", choiceA: "Yes", choiceB: "No" },
  { order: 20, topic: "Patrick Mahomes Passing Yards", choiceA: "Over 269.5", choiceB: "Under 269.5" },
  { order: 21, topic: "Jalen Hurts Rushing Yards", choiceA: "Over 34.5", choiceB: "Under 34.5" },
  { order: 22, topic: "Longest Field Goal Made", choiceA: "Over 46.5 yards", choiceB: "Under 46.5 yards" },
  { order: 23, topic: "Total Sacks in the Game", choiceA: "Over 4.5", choiceB: "Under 4.5" },
  { order: 24, topic: "First Turnover Type", choiceA: "Interception", choiceB: "Fumble/None" },
  { order: 25, topic: "Super Bowl Winner", choiceA: "Chiefs", choiceB: "Eagles" },
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
