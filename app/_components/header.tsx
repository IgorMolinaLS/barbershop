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
import Sidebar from "./sidebar";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between flex-row items-center overflow-y-auto">
        <Link href="/">
          <Image src="/Logo.png" alt="NFS Barber" height={22} width={120} />
        </Link>
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
