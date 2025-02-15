"use client";

import { useState } from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columentHakim } from "./columenHakim";
import { updateViewHakim } from "./Action";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteAction from "./DeleteAction";
import CreateActionHakim from "./CreateHakim";
import Link from "next/link";
import DataNamaHakim from "../createPdf/dataNamaHakim";

import { Info } from "lucide-react";
import { toast } from "sonner";

export function TableHakim() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    limit: 10,
    search: "",
  });

  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["hakim", page, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page,
        limit: filters.limit,
        search: filters.search,
      });
      return await updateViewHakim(params.toString());
    },
    keepPreviousData: true,
  });

  const { mutate } = useMutation({
    mutationKey: ["hakim"],
    mutationFn: async (ids) => {
      const res = await fetch("/api/v1/hakim", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: ids }),
      });

      if (!res.ok) throw new Error("Gagal menghapus data");
      return res.json();
    },
    onSuccess: (result) => {
      toast.success(`Berhasil menghapus ${result.count} data`);
      setSelectedIds([]);
      setAllSelected(false);
      queryClient.invalidateQueries(["hakim"]);
    },
    onError: () => {
      toast.success(`Gagal Menghapus data`);
    },
  });

  const handleSearch = (e) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleLimitChange = (value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, limit: value }));
  };

  const handleNext = () => {
    setPage(1);
    if (page < data?.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setPage(1);
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return alert("Pilih data terlebih dahulu!");
    mutate(selectedIds);
  };

  const toggleSelectAll = (items) => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
    setAllSelected(!allSelected);
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center w-full gap-2">
          <Input
            onChange={handleSearch}
            className="w-3/12"
            placeholder="Cari..."
          />
          <CreateActionHakim />
          <DataNamaHakim data={data} />
          <Button
            onClick={deleteSelected}
            disabled={selectedIds.length === 0}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Hapus Data
          </Button>
        </div>
        <div>
          <Select onValueChange={handleLimitChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Row" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        {isPending ? (
          <Table>
            <TableHeader>
              <TableRow>
                {columentHakim.map((item) => (
                  <TableHead key={item.accesseorKey}>{item.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columentHakim.length}
                  className="text-center h-96 align-middle"
                >
                  <p className="text-lg text-slate-400">Loading...</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Input
                    className="accent-red-500 w-5 h-5"
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => toggleSelectAll(data.data)}
                  />
                </TableHead>
                {columentHakim.map((item) => (
                  <TableHead key={item.accesseorKey}>{item.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-scroll">
              {data &&
              data.data &&
              Array.isArray(data.data) &&
              data.data.length > 0 ? (
                data.data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        className="accent-red-500 w-5 h-5"
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </TableCell>
                    <TableCell>{item.nip}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.jabatan}</TableCell>
                    <TableCell>{item.golongan}</TableCell>
                    <TableCell>{item.tempat_lahir}</TableCell>
                    <TableCell>{item.pengadilan?.nama}</TableCell>
                    <TableCell className="space-x-2">
                      <Link
                        className={buttonVariants({ size: "icon" })}
                        href={`/dashboard/datahakim/${item.id}`}
                      >
                        <Info />
                      </Link>
                      <DeleteAction id={item.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columentHakim.length}
                    className="text-center h-96 align-middle"
                  >
                    <p className="text-lg text-slate-400">
                      Data Tidak Tersedia
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex justify-end items-center gap-5">
        <Button onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <div>
          Page {page} of {data?.totalPage || 1}
        </div>
        <Button onClick={handleNext} disabled={page === data?.totalPage}>
          Next
        </Button>
      </div>
    </div>
  );
}
