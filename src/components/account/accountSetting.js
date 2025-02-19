"use client";

import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";

//components
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loading } from "../Loading";

const AccountSetting = () => {
  const { data: session } = useSession();

  const queryclient = useQueryClient();

  const { control, handleSubmit, reset } = useForm({
    defaultValue: {
      old_password: "",
      new_password: "",
    },
  });

  const { mutate, isLoading, isPending } = useMutation({
    mutationFn: async (values) => {
      try {
        const response = await fetch(
          `/api/v1/auth/accountupdate?id=${session.user.id.toString()}`,
          {
            method: "PATCH",
            body: JSON.stringify(values),
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      toast.success("Password Berhasil di Perbarui");
      queryclient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message || "Password Gagal di Perbarui");
    },
  });

  return (
    <div className="mt-5">
      <form
        onSubmit={handleSubmit((values) =>
          mutate(values, { onSuccess: reset() }),
        )}
      >
        {!isLoading || !isPending ? (
          <div className="w-1/2 m-auto grid grid-rows-3 gap-4">
            <div className="grid grid-cols-4">
              <Label htmlFor="old_password">Password Lama</Label>
              <Controller
                name="old_password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    id="old_password"
                    placeholder="Password Lama"
                    className="col-span-3"
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-4">
              <Label htmlFor="new_password">Password Baru</Label>
              <Controller
                name="new_password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    id="new_password"
                    placeholder="Password Baru"
                    className="col-span-3"
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              />
            </div>
            <Button type="submit" disabled={isPending || isLoading}>
              Simpan
            </Button>
          </div>
        ) : (
          <div className="w-full m-auto mt-5 flex justify-center items-center">
            <Loading loading={isPending || isLoading} />
          </div>
        )}
      </form>
    </div>
  );
};

export default AccountSetting;
