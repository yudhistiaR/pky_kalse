"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { deleteAction } from "./Action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteAction = (id) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["pengadilan"],
    mutationFn: async (id) => {
      return await deleteAction(id);
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus data");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["pengadilan"]);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "destructive", size: "icon" })}
      >
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Menghapus Data</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus data ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate(id)}>
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAction;
