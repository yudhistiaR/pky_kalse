"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { buttonVariants } from "./ui/button";
import { Button } from "./ui/button";
import { FileInput } from "lucide-react";

const ExcelInput = () => {
  const [open, setOpen] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tpmDate, setTpmDate] = useState(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["metadata"],
    mutationFn: async (dataInput) => {
      const res = await fetch("/api/v1/metadata", {
        method: "POST",
        body: JSON.stringify(dataInput),
      });
      if (!res.ok) {
        throw new Error("Data Gagal Di Tambahkan");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["metadata"]);
      toast.success("Data Berhasil Di Tambahkan");
      setTpmDate(null);
      setHeaders([]);
      setTableData([]);
      setOpen(false);
    },
    onError: () => {
      toast.error("Data Gagal Di Tambahkan");
    },
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });

      const [headerRow, ...rows] = sheetData;

      const filteredHeaders = headerRow.filter((header) => header !== null);

      const filteredData = rows.map((row) => {
        const newRow = {};
        headerRow.forEach((header, index) => {
          if (header !== null) {
            newRow[header] = row[index];
          }
        });
        return newRow;
      });

      setHeaders(filteredHeaders);
      setTableData(filteredData);
    };
    reader.readAsArrayBuffer(file);
  };

  const processJsonData = () => {
    return tableData.map((row) => ({
      nama: row["NAMA"],
      jabatan_lama: row["JABATAN LAMA"],
      jabatan_baru: row["JABATAN BARU"],
      tanggal_tmp: tpmDate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataInput = processJsonData();
    mutate(dataInput);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ size: "icon" })}>
        <FileInput />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Meta Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <Label htmlFor="file">Tambah Input</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <Label htmlFor="date">Tangal Input</Label>
              <Input
                id="date"
                name="date"
                type="date"
                onChange={(e) => setTpmDate(new Date(e.target.value))}
              />
            </div>
            <div className="my-8 w-full h-40 overflow-y-scroll">
              <Table>
                <TableHeader>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {headers.map((header, colIndex) => (
                        <TableCell key={colIndex}>
                          {row[header] || "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" size="sm">
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExcelInput;
