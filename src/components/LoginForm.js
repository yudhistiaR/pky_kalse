"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation } from "@/helpers/validation/AuthValidation";
import { useSearchParams } from "next/navigation";

//components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = AuthValidation.LOGIN;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    signIn("pky-credentials", {
      email: data.email,
      password: data.password,
    });
  };

  //const error = useSearchParams().get("error");

  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-amber-100 from-30% to-amber-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container px-8 bg-white shadow-xl md:w-96 w-80 rounded-xl py-5 border border-gray-300"
      >
        <div>
          <Image
            src="/logo-pky.png"
            alt="logo PKY KALSE"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>
        <p className="text-center font-bold mb-4">
          PENGHUBUNG KOMISI YUDISIAL KALIMANTAN SELATAN
        </p>
        <div className="min-h-6 text-sm text-error text-center">
          {!isValid === "CredentialsSignin" && <p>Invalid Email or Password</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <div className="min-h-6 mt-2 text-sm text-error">
            {!isValid && <p>{errors.email?.message}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <div className="min-h-6 mt-2 text-sm text-error">
            {!isValid && <p>{errors.password?.message}</p>}
          </div>
        </div>
        <Button
          className="w-full"
          disabled={!isValid || !isDirty}
          size="lg"
          type="submit"
        >
          Login
        </Button>
      </form>
    </section>
  );
};

export default LoginForm;
