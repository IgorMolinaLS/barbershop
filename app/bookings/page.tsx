import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  //TODO: popup login
  if (!session?.user) return notFound();
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const finalizedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <>
      <Header />

      <h2 className=" p-4 text-xl font-bold">Agendamentos</h2>

      <div className="p-5 space-y-3">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3 mt-6">
          Confirmados
        </h2>
        {confirmedBookings.map((booking) => (
          <BookingItem booking={booking} key={booking.id} />
        ))}
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3 mt-6">
          Finalizados
        </h2>
        {finalizedBookings.map((booking) => (
          <BookingItem booking={booking} key={booking.id} />
        ))}
      </div>
    </>
  );
};

export default Bookings;
