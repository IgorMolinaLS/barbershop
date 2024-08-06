import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        <div className="px-5 flex flex-col gap-2 py-5">
          <Badge className="w-fit bg-[#221C3D] text-primary hover:bg-[#221C3D]">
            Status
          </Badge>
          <h2 className="font-bold">Nome do serviço</h2>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png" />
              <AvatarFallback>Foto</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">Nome da barbearia</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-9">
          <p className="text-sm">Mês</p>
          <p className="text-2xl">Dia</p>
          <p className="text-sm">Horário</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
