"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/modules/Loader";
import { signInAction } from "@/actions/authActions";
import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

const formSchema = z.object({
  username: z.string().min(4).max(12),
  password: z.string().min(4).max(12),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  async function formSubmitHandler(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);

    const res = await signInAction(formData);

    setIsLoading(false);

    if (res.status === 200) {
      router.push("/");
    }

    toast({
      description: res.message,
    });
  }

  return (
    <Form {...form}>
      <form
        // action={formSubmitHandler}
        onSubmit={form.handleSubmit(formSubmitHandler)}
        className="dark:bg-primary-dark border-secondry dark:border-secondry-dark w-80 space-y-7 rounded-xl border px-7 py-7 shadow-md dark:shadow-none">
        <h1 className={cn("text-center text-2xl", notoSans.className)}>
          Sign In
        </h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal text-gray-700 dark:text-gray-300">
                Username :{" "}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  {...field}
                  className="border-secondry dark:border-secondry-dark h-11 bg-white shadow-none dark:bg-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal text-gray-700 dark:text-gray-300">
                Password :{" "}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                  className="border-secondry dark:border-secondry-dark h-11 bg-white shadow-none dark:bg-transparent"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="border-secondry dark:border-secondry-dark bg-primary-dark h-10 w-full border font-medium text-white shadow-none disabled:opacity-70">
            {isLoading ? <Loader /> : "Submit"}
          </Button>
          <p className="mt-3 text-center text-sm font-normal text-gray-700 dark:text-gray-300">
            Don`t have an account?
            <Link
              className="font-medium text-black underline dark:text-white"
              href="./sign-up">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default SignInForm;