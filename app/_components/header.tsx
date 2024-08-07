import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/quick-search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between flex-row items-center overflow-y-auto">
        <Image src="/Logo.png" alt="NFS Barber" height={22} width={120} />
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex gap-3 py-5 border-b border-solid items-center  ">
              <Avatar className="border-2 border-primary">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <div className="flex flex-col">
                <p className="text-base font-semibold">Nome</p>
                <p className="text-xs">email@meuemail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-b border-solid py-5">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className=" justify-start gap-3"
                  asChild
                >
                  <Link href="/">
                    <HomeIcon size={18} />
                    Início
                  </Link>
                </Button>
              </SheetClose>
              <Button variant="ghost" className=" justify-start gap-3">
                <Calendar size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-1 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  variant="ghost"
                  className=" justify-start gap-3"
                >
                  <Image
                    alt={option.title}
                    width={18}
                    height={18}
                    src={option.imageUrl}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-1 border-b border-solid py-5">
              <Button variant="ghost" className="justify-start gap-3">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
