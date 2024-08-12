import Image from "next/image";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <>
      {" "}
      <DialogHeader>
        <DialogTitle>Faça seu Login</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google.
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="gap-2"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          src="/Google.png"
          width={18}
          height={18}
          alt="Fazer login com o Google"
        />
        <p className="font-bold">Google</p>
      </Button>
    </>
  );
};

export default SignInDialog;
