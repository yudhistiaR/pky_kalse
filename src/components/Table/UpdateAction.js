"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Pencil } from "lucide-react";
import { updateAction } from "./Action";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

const UpdateAction = ({ id }) => {
  const [open, setOpen] = useState(false);

  const queryclient = useQueryClient();
  const { control, handleSubmit, reset } = useForm();

  const { data } = useQuery({
    queryKey: ["pengadilan", id],
    queryFn: async () => {
      const res = await fetch(`/api/v1/pengadilan/${id}`);
      const data = await res.json();
      return data[0];
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["pengadilan"],
    mutationFn: (values) => updateAction({ ...values, id: id }),

    onSuccess: () => {
      setOpen(false);
      toast.success("Berhasil mengubah data");
      queryclient.invalidateQueries({ queryKey: ["pengadilan"] });
    },
    onError: () => {
      setOpen(false);
      toast.error("Gagal mengubah data");
    },
  });

  return (
    <Dialog onOpenChange={() => setOpen(true)} open={open}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) =>
            mutate(values, { onSuccess: () => reset() })
          )}
          className="w-full h-full block"
        >
          <div className="flex gap-2 py-4">
            <Label htmlFor="nama">Nama Pengadilan</Label>
            <Controller
              name="nama"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="nama"
                  {...field}
                  value={field.value ?? data.nama}
                />
              )}
            />
          </div>
          <div className="flex gap-2 py-4">
            <Label htmlFor="alamat">Alamat</Label>
            <Controller
              name="alamat"
              control={control}
              render={({ field }) => (
                <textarea
                  rows={4}
                  id="alamat"
                  {...field}
                  defaultValue={field.value ?? data.alamat}
                  className="border p-2 w-full"
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="w-full pr-2"
            >
              Batal
            </Button>
            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAction;
