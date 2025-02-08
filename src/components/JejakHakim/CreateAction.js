"use client";

import { useState, useEffect } from "react";
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
import { Plus } from "lucide-react";
import Select from "react-select";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { createAction } from "../datahakim/Action";

const CreateActionJejak = () => {
  const [pengadilan, setPengadilan] = useState([]);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      nip: "",
      nama: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jabatan: "",
      golongan: "",
      agama: "",
      jenis_kelamin: "",
      alamat: "",
      alamat_asal: "",
      telpon: "",
      tlp_kantor: "",
      pendidikan: { create: [{ nama: "" }] },
      pekerjaan: { create: [{ nama: "" }] },
      anak: { create: [{ nama: "" }] },
      pengadilanId: "",
    },
  });

  const {
    fields: pendidikanFields,
    append: tambahPendidikan,
    remove: hapusPendidikan,
  } = useFieldArray({
    control,
    name: "pendidikan.create",
  });

  const {
    fields: pekerjaanFields,
    append: tambahPekerjaan,
    remove: hapusPekerjaan,
  } = useFieldArray({
    control,
    name: "pekerjaan.create",
  });

  const {
    fields: anakFields,
    append: tambahAnak,
    remove: hapusAnak,
  } = useFieldArray({
    control,
    name: "anak.create",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      console.log(formData);
      return await createAction(formData);
    },
    onSuccess: () => {
      toast.success("Berhasil tambah data");
      setOpen(false);
    },
    onError: () => {
      toast.error("Gagal menambahkan data");
      setOpen(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["hakim"]);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  useEffect(() => {
    const fetchPengadilan = async () => {
      const res = await fetch("/api/v1/pengadilan", {
        method: "GET",
      });
      const data = await res.json();
      const result = data.map((item) => ({
        value: item?.id,
        label: item?.nama,
      }));

      setPengadilan(result);
    };

    if (isSubmitSuccessful) {
      reset();
    }

    fetchPengadilan();
  }, []);

  const optionsPangkat = [
    { value: "I.a", label: "I.a" },
    { value: "I.b", label: "I.b" },
    { value: "I.c", label: "I.c" },
    { value: "I.d", label: "I.d" },
    { value: "II.a", label: "II.a" },
    { value: "II.b", label: "II.b" },
    { value: "II.c", label: "II.c" },
    { value: "II.d", label: "II.d" },
    { value: "III.a", label: "III.a" },
    { value: "III.b", label: "III.b" },
    { value: "III.c", label: "III.c" },
    { value: "III.d", label: "III.d" },
    { value: "IV.a", label: "IV.a" },
    { value: "IV.b", label: "IV.b" },
    { value: "IV.c", label: "IV.c" },
    { value: "IV.d", label: "IV.d" },
  ];

  const jk = [
    { value: "Laki-Laki", label: "Laki-Laki" },
    { value: "Perempuan", label: "Perempuan" },
  ];

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[825px] max-h-[500px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Tambah rekam jejak hakim</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nip">NIP</Label>
            <Input
              {...register("nip")}
              className="col-span-3"
              type="text"
              id="nip"
              name="nip"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nama">Nama</Label>
            <Input
              {...register("nama")}
              className="col-span-3"
              type="text"
              id="nama"
              name="nama"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
            <Input
              {...register("tempat_lahir")}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
            <Input
              {...register("tanggal_lahir")}
              className="col-span-3"
              type="date"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agama">Agama</Label>
            <Input {...register("agama")} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
            <Controller
              control={control}
              name="jenis_kelamin"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  inputRef={ref}
                  className="col-span-3"
                  options={jk}
                  value={jk.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alamat">Alamat</Label>
            <textarea {...register("alamat")} className="col-span-3 border" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alamat">Alamat Asal</Label>
            <textarea
              {...register("alamat_asal")}
              className="col-span-3 border"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telpon">Telpon Pribadi</Label>
            <Input {...register("telpon")} className="col-span-3" type="tel" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telpon">Telpon Kantor</Label>
            <Input
              {...register("tlp_kantor")}
              className="col-span-3"
              type="tel"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jabatan">Jabatan</Label>
            <Input
              {...register("jabatan")}
              className="col-span-3"
              type="text"
              id="jabatan"
              name="jabatan"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="golongan">Golongan</Label>
            <Controller
              control={control}
              name="golongan"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  inputRef={ref}
                  className="col-span-3"
                  options={optionsPangkat}
                  value={optionsPangkat.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pasangan">Suami/Istri</Label>
            <Input
              {...register("pasangan")}
              className="col-span-3"
              type="text"
              id="pasangan"
              name="pasangan"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="anak" className="col-span-1">
              Anak
            </Label>
            <div className="col-span-3 space-y-2">
              {anakFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...register(`anak.create.${index}.nama`)}
                    placeholder="Masukan Nama Anak"
                    className="flex-1"
                  />
                  <Button type="button" onClick={() => hapusAnak(index)}>
                    Hapus
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => tambahAnak({ nama: "" })}>
                Tambah Anak
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="riwayat_pendidikan" className="col-span-1">
              Riwayat Pendidikan
            </Label>
            <div className="col-span-3 space-y-2">
              {pendidikanFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...register(`pendidikan.create.${index}.nama`)}
                    placeholder="Masukkan riwayat pendidikan"
                    className="flex-1"
                  />
                  <Button type="button" onClick={() => hapusPendidikan(index)}>
                    Hapus
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => tambahPendidikan({ nama: "" })}
              >
                Tambah Pendidikan
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4 mt-4">
            <Label htmlFor="pekerjaan" className="col-span-1">
              Riwayat Pekerjaan
            </Label>
            <div className="col-span-3 space-y-2">
              {pekerjaanFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...register(`pekerjaan.create.${index}.nama`)}
                    placeholder="Masukkan riwayat pekerjaan"
                    className="flex-1"
                  />
                  <Button type="button" onClick={() => hapusPekerjaan(index)}>
                    Hapus
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => tambahPekerjaan({ nama: "" })}
              >
                Tambah Pekerjaan
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pengadilanId">Instansi/Kantor</Label>
            <Controller
              control={control}
              name="pengadilanId"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  inputRef={ref}
                  className="col-span-3"
                  options={pengadilan}
                  value={pengadilan.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Loading.." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateActionJejak;
