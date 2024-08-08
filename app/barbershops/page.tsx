import BarbershopItem from "../(home)/_components/barbershop-item";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <div className="">
      <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">
        Resultados para "{searchParams.search}"
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopsPage;
