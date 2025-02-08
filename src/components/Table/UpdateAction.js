"use client";

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
import { useActionState } from "react";

const UpdateAction = ({ id, data }) => {
  const [state, formAction, pending] = useActionState(updateAction, {});

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="w-full h-full block">
          <Input required id="id" name="id" defaultValue={id} type="hidden" />
          <div className="flex gap-2 py-4">
            <Label htmlFor="nama">Nama Pengadilan</Label>
            <Input
              required
              type="text"
              id="nama"
              name="nama"
              defaultValue={data.nama}
            />
            <p aria-live="polite">{state?.message}</p>
          </div>
          <div className="flex gap-2 py-4">
            <Label htmlFor="alamat">Alamat</Label>
            <textarea
              rows={4}
              cols={30}
              id="alamat"
              name="alamat"
              defaultValue={data.alamat}
              className="border p-2"
            />
            <p aria-live="polite">{state?.message}</p>
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={pending}
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
