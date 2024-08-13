"use client";

import { Prisma } from "@prisma/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";

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
  const handleBookingDelete = async () => {
    try {
      await deleteBooking(booking.id);
      toast.success("Reserva cancelada com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Reserva não cancelada");
    }
  };

  const {
    service: { barbershop },
  } = booking;
  const isConfirmed = isFuture(booking.date);

  return (
    <Sheet>
      <SheetTrigger className="w-full min-w-[90%]">
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
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative h-[180px] w-full flex items-end mt-6">
          <Image
            src="/mapa.png"
            fill
            className="object-cover rounded-xl"
            alt="Mapa"
          />
          <Card className="z-10 w-full mx-5 mb-3 rounded-xl">
            <CardContent className="px-5 py-3 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl}></AvatarImage>
              </Avatar>
              <div className="">
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "outline"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mt-3 mb-6">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Data</p>
                <p className="text-xs">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Horário</p>
                <p className="text-xs">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Barbearia</p>
                <p className="text-xs">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button className="w-full" variant="outline">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    Cancelar reserva
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você quer cancelar a reserva?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja fazer o cancelamento? Essa ação é
                      irreversível
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <SheetClose>
                      <AlertDialogAction
                        onClick={handleBookingDelete}
                        className="bg-destructive w-full"
                      >
                        Cancelar agendamento
                      </AlertDialogAction>
                    </SheetClose>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
