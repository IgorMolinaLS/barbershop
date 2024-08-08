import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "../_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";
import Image from "next/image";
import { Button } from "../_components/ui/button";
import { quickSearchOptions } from "../_constants/quick-search";
import Link from "next/link";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header />

      <div className="px-5">
        <div className="pt-4">
          <h2 className="text-xl font-bold">Olá {}!</h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6 overflow-x-scroll [&::webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2 px-5" variant="secondary" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt="Cabelo"
                  width={16}
                  height={16}
                />
                <p>{option.title}</p>
              </Link>
            </Button>
          ))}
        </div>

        <div className="mt-6">
          <Search />
        </div>

        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Agende com os melhores!"
            src="/Banner barber.png"
            fill
            className="object-contain rounded-xl"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">
            Agendamentos
          </h2>
          <BookingItem />
        </div>

        <div className="mt-6">
          <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">
            Recomendados
          </h2>

          <div className="flex gap-4 overflow-x-auto [&::webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        <div className="mt-6 mb-[4.5rem]">
          <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">
            Populares
          </h2>

          <div className="flex gap-4 overflow-x-auto [&::webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
