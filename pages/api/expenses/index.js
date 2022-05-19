import prisma from 'lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const trips = await prisma.trip.findMany()

    await Promise.all(
      trips.map(async (trip) => {
        trip.expenses = await prisma.expense.findMany({
          where: {
            trip: trip.id,
          },
        })
      })
    )

    return res.status(200).json(trips)
  }

  if (req.method === 'POST') {
    //...
  }

  res.status(405).json({ message: 'Method Not Allowed' })
}