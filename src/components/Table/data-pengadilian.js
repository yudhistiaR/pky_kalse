"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateAction from "./CreateAction";
import DeleteAction from "./DeleteAction";
import UpdateAction from "./UpdateAction";
import CetakPdfAction from "./CetakAction";
import { updateViewPengadilan } from "./Action";
import { useQuery } from "@tanstack/react-query";
import { Asul } from "next/font/google";

export const DataPengadilan = () => {
  const { data, isPendding } = useQuery({
    queryKey: ["pengadilan"],
    queryFn: async () => await updateViewPengadilan(),
  });

  return (
    <div className="w-full p-4 bg-white rounded-lg mt-4 overflow-hidden">
      <div className="flex justify-end w-full gap-2">
        <CetakPdfAction data={data} />
        <CreateAction />
      </div>
      <div className="mt-5 min-h-96 max-h-96 overflow-y-scroll ">
        <Table className="w-full h-full">
          <TableCaption>List Pengadilan Kalimantan Selatan</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Pengadilan</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Jumlah Hakim</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item._count.Hakim} Orang</TableCell>
                <TableCell className="space-x-2 flex">
                  <DeleteAction id={item.id} />
                  <UpdateAction id={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
