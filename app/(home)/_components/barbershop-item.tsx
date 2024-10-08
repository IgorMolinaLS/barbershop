import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 mt-1 py-0">
        <div className="px-1 h-[159px] relative">
          <div className="absolute z-50 top-2 left-2">
            <Badge
              variant="secondary"
              className="opacity-90 flex gap-1 items-center"
            >
              <StarIcon size={12} className="text-primary fill-primary" />
              <span>5,0</span>
            </Badge>
          </div>
          <Image
            fill
            style={{ objectFit: "cover" }}
            alt={barbershop.name}
            className="rounded-2xl"
            src={barbershop.imageUrl}
          />
        </div>

        <div className="px-3 pb-3">
          <h2 className="font-bold mt-2 truncate">{barbershop.name}</h2>
          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>

          <Button variant="secondary" className="w-full mt-3" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
