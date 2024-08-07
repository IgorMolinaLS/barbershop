import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  SmartphoneIcon,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <div className="">
      <div className="relative w-full h-[250px]">
        <Image
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
          alt={barbershop?.name}
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-5 border-b border-solid">
        <h1 className="font-bold text-xl">{barbershop?.name}</h1>
        <div className="flex items-center gap-2">
          <MapPinIcon size={16} className="text-primary" />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <Star size={16} className="text-primary fill-primary" />
          <p className="text-sm">5.0 (499 avaliações)</p>
        </div>
      </div>

      <div className="border-b border-solid p-5 space-y-3">
        <h2 className="font-semibold text-gray-400 uppercase text-xs">
          Sobre nós
        </h2>
        <p className="text-sm text-justify">
          {barbershop?.description || "Descrição não preenchida"}
        </p>
      </div>

      <div className="p-5 border-b border-solid">
        <h2 className="font-semibold text-gray-400 uppercase text-xs">
          Serviços
        </h2>
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={service}></ServiceItem>
        ))}
      </div>

      <div className="p-5 space-y-3">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
