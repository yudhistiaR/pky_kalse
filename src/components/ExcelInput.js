"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import * as XLSX from "xlsx";

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

  const path = useRouter();

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

      setHeaders(headerRow);
      setTableData(rows);
    };
    reader.readAsArrayBuffer(file);
  };

  const filteredHeaders = headers.filter((header) => header !== null);

  const filteredData = tableData
    .map((row) => {
      const newRow = [];
      headers.forEach((header, index) => {
        if (header !== null) {
          if (header === "JABATAN LAMA" && row[2] && row[3]) {
            newRow.push(`${row[2]} ${row[3]}`);
          } else if (header !== "JABATAN LAMA") {
            newRow.push(row[index]);
          }
        }
      });
      return newRow;
    })
    .filter((row) =>
      row.some((cell) => cell !== undefined && cell !== null && cell !== ""),
    );

  const processJsonData = () => {
    const jsonData = filteredData.map(
      ([_, nama, jabatanLama, jabatanBaru]) => ({
        nama,
        jabatan_lama: jabatanLama,
        jabatan_baru: jabatanBaru,
        tanggal_tmp: tpmDate,
      }),
    );

    return jsonData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataInput = processJsonData();

    return await fetch("/api/v1/metadata", {
      method: "POST",
      body: JSON.stringify(dataInput),
    }).then((res) => {
      if (!res) {
        toast.error("Data Gagal Di Tambahkan");
      }

      toast.success("Data Berhasil Di Tambahkan");
      setTpmDate(null);
      setHeaders([]);
      setTableData([]);
      setOpen(false);
      path.refresh();
    });
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
                    {filteredHeaders.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell || "-"}</TableCell>
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
