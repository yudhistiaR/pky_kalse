"use client";

import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

//components
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loading } from "../Loading";

const ProfileCard = () => {
  const { data: session, update } = useSession();

  const queryclient = useQueryClient();

  const { control, handleSubmit, reset } = useForm({
    defaultValue: {
      username: "",
      email: "",
      telpon: "",
      jabatan: "",
    },
  });

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const req = await fetch(`/api/v1/user?id=${session.user.id.toString()}`);
      return await req.json();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (values) =>
      await fetch(`/api/v1/user?id=${session.user.id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      }),

    onSuccess: () => {
      toast.success("Profile Berhasil di Perbarui");
      queryclient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Profile Gagal di Perbarui");
    },
  });

  return (
    <div className="w-1/2 m-auto mt-5">
      {!isLoading || !isPending ? (
        <form
          onSubmit={handleSubmit((values) =>
            mutate(values, {
              onSuccess: () => {
                update({ username: values?.username });
                reset();
              },
            }),
          )}
        >
          <div className="w-full h-full grid gap-4">
            <div className="grid grid-cols-4 items-center text-xl">
              <Label htmlFor="nama">Nama</Label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="nama"
                    placeholder="Nama"
                    className="col-span-3"
                    {...field}
                    value={field.value ?? data?.username}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center text-xl">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="col-span-3"
                    {...field}
                    value={field.value ?? data?.email}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center text-xl">
              <Label htmlFor="telpon">No Telpon</Label>
              <Controller
                name="telpon"
                control={control}
                render={({ field }) => (
                  <Input
                    type="tel"
                    id="telpon"
                    placeholder="No Telpon"
                    className="col-span-3"
                    {...field}
                    value={field.value ?? data?.telpon}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center text-xl">
              <Label htmlFor="jabatan">Jabatan</Label>
              <Controller
                name="jabatan"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="jabatan"
                    placeholder="Jabatan"
                    className="col-span-3"
                    disabled
                    {...field}
                    value={field.value ?? data?.jabatan}
                  />
                )}
              />
            </div>
            <Button disabled={isLoading || isPending} type="submit">
              Simpan
            </Button>
          </div>
        </form>
      ) : (
        <div className="w-full m-auto mt-5 flex justify-center items-center">
          <Loading loading={isPending || isLoading} />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
