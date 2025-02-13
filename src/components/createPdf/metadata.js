"use client";

import { convertDate, formatDate } from "@/lib/convertDate";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import KopSurat from "@/components/createPdf/kopSurat";

const PrintButton = ({ onPrint, disabled }) => (
  <Button onClick={onPrint} disabled={disabled}>
    Cetak PDF
  </Button>
);

const PrintableContent = ({ data, ref, title }) => (
  <div
    ref={ref}
    className="printable-area bg-white w-[210mm] h-[297mm] mx-auto p-5 box-border print:p-10"
  >
    <KopSurat />
    <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
    {data && data.length > 0 ? (
      <table className="w-full border border-black border-collapse print:p-10">
        <thead>
          <tr className="bg-orange-400">
            <th className="p-2 border border-black">NO</th>
            <th className="p-2 border border-black">Nama</th>
            <th className="p-2 border border-black">Jabatan Lama</th>
            <th className="p-2 border border-black">Jabatan Baru</th>
            <th className="p-2 border border-black">Tanggal TPM</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={item.id}
              className="even:bg-gray-100 break-inside-avoid print:break-inside-avoid"
            >
              <td className="p-2 border border-black">{index + 1}</td>
              <td className="p-2 border border-black">{item.nama}</td>
              <td className="p-2 border border-black">{item.jabatan_lama}</td>
              <td className="p-2 border border-black">{item.jabatan_baru}</td>
              <td className="p-2 border border-black">
                {convertDate(item.tanggal_tmp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="text-center h-96 flex items-center justify-center">
        <p className="text-lg text-slate-400">Data Tidak Tersedia</p>
      </div>
    )}
  </div>
);

const MetaDataPdf = ({ data, mutasi }) => {
  const printRef = useRef(null);
  let type;

  if (mutasi === "exit") {
    type = "Mutasi Hakim Keluar Kalimantan Selatan";
  } else if (mutasi === "enter") {
    type = "Mutasi Hakim Masuk Kalimantan Selatan";
  } else {
    type = "Mutasi Hakim Kalimantan Selatan";
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: type,
    onAfterPrint: () => toast.success("Berhasil mencetak PDF"),
  });

  return (
    <div>
      <PrintButton
        onPrint={handlePrint}
        disabled={!data || data.length === 0}
      />
      {/* Gunakan ref langsung ke PrintableContent */}
      <div style={{ display: "none" }}>
        <PrintableContent ref={printRef} data={data} title={type} />
      </div>
    </div>
  );
};

export default MetaDataPdf;
