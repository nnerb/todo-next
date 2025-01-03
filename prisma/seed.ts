import { prisma } from "app/lib/prisma"


async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: 'test@test.com'
    },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password: '12312tf1rteigo$@42395jds@'
    }
  })
  console.log({ user })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
  })