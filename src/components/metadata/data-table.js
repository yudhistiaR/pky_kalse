"use client";

import { convertDate } from "@/lib/convertDate";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

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
import MetaDataPdf from "../createPdf/metadata"; // Import MetaDataPdf

const ExcelInput = dynamic(() => import("../ExcelInput"), { ssr: false });

export function DataTable() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    limit: 10,
    search: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    getData();
  }, [page, filters.limit, filters.search, filters.start, filters.end]);

  const getData = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page,
        limit: filters.limit,
        search: filters.search,
        start: filters.start,
        end: filters.end,
      });

      const res = await fetch(`/api/v1/metadata?${params.toString()}`, {
        method: "GET",
      });

      const result = await res.json();

      setItems(result.data);
      setTotalPages(result.totalPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center w-full gap-2">
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
          {/* Gunakan MetaDataPdf dan kirim data sebagai props */}
          <MetaDataPdf data={items} />
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
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {colument?.map((item, _) => (
                <TableHead key={item.accesseorKey}>{item.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-scroll">
            {items?.map((item, index) => (
              <TableRow key={item.id}>
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
