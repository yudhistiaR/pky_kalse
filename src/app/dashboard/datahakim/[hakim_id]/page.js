"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDetailHakim } from "@/components/datahakim/Action";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import KopSurat from "@/components/createPdf/kopSurat";

const DetailHakim = () => {
  const { hakim_id } = useParams();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Document ${hakim_id}`,
    onAfterPrint: () => toast.success("Berhasil mencetak PDF"),
  });

  const { data, isPending } = useQuery({
    queryKey: ["DetailHakim", hakim_id],
    queryFn: async () => await getDetailHakim(hakim_id),
  });

  const detailFields = [
    { key: "nip", label: "NIP" },
    { key: "nama", label: "Nama" },
    { key: "tempat_lahir", label: "Tempat Lahir" },
    { key: "tanggal_lahir", label: "Tanggal Lahir" },
    { key: "alamat", label: "Alamat" },
    { key: "jabatan", label: "Jabatan" },
    { key: "golongan", label: "Golongan Ruang" },
  ];

  return (
    <>
      <Button
        onClick={handlePrint}
        style={{ marginTop: "20px", padding: "10px 20px" }}
        disabled={isPending || !data || Object.keys(data).length === 0}
      >
        Cetak PDF
      </Button>

      <div
        ref={printRef}
        className="printable-area"
        style={{
          width: "210mm",
          height: "297mm",
          margin: "0 auto",
          padding: "20px",
          boxSizing: "border-box",
          backgroundColor: "white",
        }}
      >
        <KopSurat />
        <h2 className="text-2xl font-bold mb-4 text-center">
          {`Profile Hakim ${
            !isPending ? data.pengadilan.nama : "Loading..."
          }`.toUpperCase()}
        </h2>
        {isPending ? (
          <div className="text-center h-96 flex items-center justify-center">
            <p className="text-lg text-slate-400">Loading...</p>
          </div>
        ) : Object.keys(data).length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <tbody>
              {detailFields.map(({ key, label }) => (
                <tr key={key} className="border-b border-gray-300">
                  <td className="p-3 font-semibold bg-gray-100 w-1/3">
                    {label}
                  </td>
                  <td className="p-3">{data[key]}</td>
                </tr>
              ))}
              <tr className="border-b border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">
                  Riwayat Pendidikan
                </td>
                <td className="p-3">
                  {data.pendidikan?.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {data.pendidikan.map((item, idx) => (
                        <li key={idx}>{item.nama}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400">Tidak ada data</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-gray-100">
                  Riwayat Pekerjaan
                </td>
                <td className="p-3">
                  {data.pekerjaan?.length > 0 ? (
                    <ul className="list-decimal list-inside">
                      {data.pekerjaan.map((item, idx) => (
                        <li key={idx}>{item.nama}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400">Tidak ada data</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="text-center h-96 flex items-center justify-center">
            <p className="text-lg text-slate-400">Data Tidak Tersedia</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailHakim;
