"use client";

import { useForm, Controller } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";

//components
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loading } from "../Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddAccount = () => {
  const queryclient = useQueryClient();

  const { control, handleSubmit, reset } = useForm({
    defaultValue: {
      username: "",
      email: "",
      telpon: "",
      jabatan: "",
      password: "",
    },
  });

  const { mutate, isLoading, isPending } = useMutation({
    mutationFn: async (values) => {
      try {
        const response = await fetch(`/api/v1/auth/register`, {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        return await response.json();
      } catch (error) {
        throw new Error(error.message || "Server Error");
      }
    },

    onSuccess: () => {
      toast.success("Akun Berhasil di Tambah");
      queryclient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message || "Akun Gagal di Tambah");
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
              <Label htmlFor="username">Nama</Label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="username"
                    placeholder="Nama"
                    className="col-span-3"
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-4">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="col-span-3"
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-4">
              <Label htmlFor="telpon">No.Telpon</Label>
              <Controller
                name="telpon"
                control={control}
                render={({ field }) => (
                  <Input
                    type="telpon"
                    id="telpon"
                    placeholder="No Telpon"
                    className="col-span-3"
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-4">
              <Label htmlFor="jabatan">Jabatan</Label>
              <Controller
                name="jabatan"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kordinator">Kordinator</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="external">External</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-4">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
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

export default AddAccount;
