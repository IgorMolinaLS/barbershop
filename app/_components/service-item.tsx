import { BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="my-3">
      <CardContent className="flex p-2 gap-3">
        <Image
          src={service.imageUrl}
          alt={service.name}
          width={110}
          height={110}
          className="rounded-lg min-h-[110px] object-cover"
        />

        <div className="flex flex-col justify-between">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-primary font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button
              variant="secondary"
              className="text-sm h-[36px] rounded-xl"
              asChild
            >
              <Link href={`/barbershops/`}>Reservar</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
