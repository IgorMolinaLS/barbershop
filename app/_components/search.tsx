"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      message: "Digite algo para buscar",
    })
    .max(30),
});

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?title=${data.title}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Busque por uma barbearia!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon size={20} />
        </Button>
      </form>
    </Form>
  );
};

export default Search;
