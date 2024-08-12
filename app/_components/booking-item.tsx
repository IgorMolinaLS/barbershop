import { Prisma } from "@prisma/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date);

  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
          <div className="px-5 flex flex-col gap-2 py-5">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "outline"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <h2 className="font-bold">{booking.service.name}</h2>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>Foto</AvatarFallback>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <h3 className="text-sm">{booking.service.barbershop.name}</h3>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid border-secondary px-9">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", { locale: ptBR })}
            </p>
            <p className="text-2xl">
              {format(booking.date, "dd", { locale: ptBR })}
            </p>
            <p className="text-sm">
              {format(booking.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingItem;
