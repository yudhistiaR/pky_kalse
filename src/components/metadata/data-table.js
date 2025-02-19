"use client";

import { convertDate } from "@/lib/convertDate";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

//components
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { colument } from "./columns";
import MetaDataPdf from "../createPdf/metadata";
import { useSearchParams } from "next/navigation";

const ExcelInput = dynamic(() => import("../ExcelInput"), { ssr: false });

export function DataTable() {
  const s = useSearchParams();
  const type = s.get("m");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [filters, setFilters] = useState({
    mutasi: type ?? "",
    limit: 10,
    search: "",
    start: "",
    end: "",
  });

  const queryClient = useQueryClient();

  const fetchData = async () => {
    const params = new URLSearchParams({
      page,
      mutasi: filters.mutasi,
      limit: filters.limit,
      search: filters.search,
      start: filters.start,
      end: filters.end,
    });
    const res = await fetch(`/api/v1/metadata?${params.toString()}`, {
      method: "GET",
    });
    return await res.json();
  };

  const { data, isLoading, isPending, isError } = useQuery({
    queryKey: ["metadata", page, filters],
    queryFn: async () => await fetchData(),
  });

  const items = data?.data || [];
  const totalPages = data?.totalPage || 1;

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
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

  const { mutate } = useMutation({
    mutationKey: ["metadata"],
    mutationFn: async (ids) => {
      const res = await fetch("/api/v1/metadata", {
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
      queryClient.invalidateQueries(["metadata"]);
    },
    onError: () => {
      toast.success(`Gagal Menghapus data`);
    },
  });

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center w-full gap-2">
          {type == "enter" || type == "exit" ? null : (
            <>
              <Input
                onChange={(e) => {
                  setPage(1);
                  setFilters((prev) => ({ ...prev, search: e.target.value }));
                }}
                className="w-3/12"
                placeholder="Cari..."
              />
              <Input
                placeholder="Mulai"
                className="w-3/12"
                type="date"
                onChange={(e) => {
                  setPage(1);
                  setFilters((prev) => ({ ...prev, start: e.target.value }));
                }}
              />
              <Input
                placeholder="Berakhir"
                className="w-3/12"
                type="date"
                onChange={(e) => {
                  setPage(1);
                  setFilters((prev) => ({ ...prev, end: e.target.value }));
                }}
              />
              <ExcelInput />
            </>
          )}
          <MetaDataPdf data={items} mutasi={type} />
          <Button
            onClick={deleteSelected}
            disabled={selectedIds.length === 0}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Hapus Data
          </Button>
        </div>
        <div>
          <Select
            onValueChange={(value) => {
              setPage(1);
              setFilters((prev) => ({ ...prev, limit: value }));
            }}
          >
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

      {isLoading || isPending ? (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : isError ? (
        <div className="text-center py-4 text-red-500">Error loading data.</div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Input
                    className="accent-red-500 w-5 h-5"
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => toggleSelectAll(items)}
                  />
                </TableHead>
                {colument?.map((item, _) => (
                  <TableHead key={item.accesseorKey}>{item.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-scroll">
              {items?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      className="accent-red-500 w-5 h-5"
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.jabatan_lama}</TableCell>
                  <TableCell>{item.jabatan_baru}</TableCell>
                  <TableCell>{convertDate(item.tanggal_tmp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex justify-end items-center gap-5">
        <Button onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <div>
          Page {page} of {totalPages}
        </div>
        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
