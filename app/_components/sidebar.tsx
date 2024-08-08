import { Calendar, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { quickSearchOptions } from "../_constants/quick-search";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const Sidebar = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex gap-3 py-5 border-b border-solid items-center justify-between ">
        <h2 className="text-base font-bold">Olá, faça seu login</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] rounded-lg">
            <DialogHeader>
              <DialogTitle>Faça seu Login</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta Google.
              </DialogDescription>
            </DialogHeader>
            <Button variant="outline" className="gap-2">
              <Image
                src="/Google.png"
                width={18}
                height={18}
                alt="Fazer login com o Google"
              />
              <p className="font-bold">Google</p>
            </Button>
          </DialogContent>
        </Dialog>

        {/* <Avatar className="border-2 border-primary">
          <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
        </Avatar>
        <div className="flex flex-col">
          <p className="text-base font-semibold">Nome</p>
          <p className="text-xs">email@meuemail.com</p>
        </div> */}
      </div>

      <div className="flex flex-col gap-1 border-b border-solid py-5">
        <SheetClose asChild>
          <Button variant="ghost" className=" justify-start gap-3" asChild>
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
  );
};

export default Sidebar;
