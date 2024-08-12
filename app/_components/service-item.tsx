"use client";

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { addDays, format, set, setHours, setMinutes } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./signin-dialog";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes
    );
    if (hasBookingOnCurrentTime) {
      return false;
    }
    return true;
  });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [signInDialogIsOpen, setsignInDialogIsOpen] = useState(false);
  const { data } = useSession();
  const [selectedDate, setselectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setselectedTime] = useState<string | undefined>(
    undefined
  );
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDate) return;
      const bookings = await getBookings({
        date: selectedDate,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDate, service.id]);

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true);
    }
    return setsignInDialogIsOpen(true);
  };

  const handleBookingSheetOpenChange = () => {
    setselectedDate(undefined);
    setselectedTime(undefined);
    setDayBookings([]);
    setBookingSheetIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setselectedDate(date);
  };

  const handleTimeSelect = (time: string | undefined) => {
    setselectedTime(time);
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate || !selectedTime) return;

      const hour = Number(selectedTime?.split(":")[0]);
      const minutes = Number(selectedTime?.split(":")[1]);
      const newDate = set(selectedDate, {
        minutes: minutes,
        hours: hour,
      });

      await createBooking({
        serviceId: service.id,
        date: newDate,
      });
      handleBookingSheetOpenChange();
      toast.success("Agendamento concluído!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao agendar ");
    }
  };

  return (
    <>
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
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  className="text-sm rounded-xl"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="px-0 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-5 border-b border-solid">
                    <Calendar
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      locale={ptBR}
                      fromDate={addDays(new Date(), 0)}
                      mode="single"
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectedDate && (
                    <div className="">
                      <div className="px-5 overflow-x-auto flex p-5 gap-3 border-b border-solid">
                        {getTimeList(dayBookings).map((time) => (
                          <Button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-lg [&::webkit-scrollbar]:hidden"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                      <div className="p-5">
                        <Card>
                          <CardContent className="space-y-3 p-3">
                            <div className="flex items-center justify-between">
                              <h2 className="font-bold">{service.name}</h2>
                              <p className="text-sm font-bold">
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(Number(service.price))}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-400">Data</p>
                              <p className="text-xs">
                                {format(selectedDate, "dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-400">Horário</p>
                              <p className="text-xs">{selectedTime}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-400">Barbearia</p>
                              <p className="text-xs">{barbershop.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                  <SheetFooter className="px-5 mt-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={!selectedDate || !selectedTime}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setsignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
