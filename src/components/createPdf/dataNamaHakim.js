"use client";

import { useRef } from "react";
import { Button } from "../ui/button";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

const PrintButton = ({ onPrint, disabled }) => (
  <Button onClick={onPrint} disabled={disabled}>
    Cetak PDF
  </Button>
);

const PrintableContent = ({ data, ref }) => {
  const groupedData = {};
  let counter = 1;

  data?.forEach((item, index) => {
    if (!groupedData[item.pengadilan.nama]) {
      groupedData[item.pengadilan.nama] = [];
    }
    groupedData[item.pengadilan.nama].push({ ...item, no: index + 1 });
  });

  return (
    <div ref={ref} className="p-4">
      <div className="text-center w-full mb-4 text-[5px]">
        <h1>DATA NAMA-NAMA</h1>
        <h1>HAKIM DI KALIMANTAN SELATAN</h1>
        <h1>PENGADILAN UMUM, AGAMA, TUN DAN MILITER</h1>
        <p>TAHUN 2025</p>
      </div>
      <table className="min-w-full text-[5px] bg-white border border-gray-300 p-8">
        <thead>
          <tr className="bg-orange-400">
            <th className="border border-gray-500">No</th>
            <th className="border border-gray-500 ">Nama</th>
            <th className="border border-gray-500 ">Jabatan</th>
            <th className="border border-gray-500 ">Pengadilan</th>
            <th className="border border-gray-500 ">Jumlah</th>
            <th className="border border-gray-500 ">Keterangan</th>
            <th className="border border-gray-500 ">Hakim Baru</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((pengadilan) => {
            return groupedData[pengadilan].map((item, index) => (
              <tr key={item.id} className="border border-gray-500">
                <td className="border border-gray-500 ">{counter++}</td>
                <td className="border border-gray-500 ">{item.nama}</td>
                <td className="border border-gray-500 ">{item.jabatan}</td>
                <td className="border border-gray-500 ">
                  {item.pengadilan.nama}
                </td>
                {index === 0 && (
                  <td
                    className="border border-gray-500  px-4"
                    rowSpan={groupedData[pengadilan].length}
                  >
                    {groupedData[pengadilan].length}
                  </td>
                )}
                <td className="border border-gray-500 ">
                  {item.keterangan || "-"}
                </td>
                <td className="border border-gray-500 ">
                  {item.hakimBaru || "-"}
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

const DataNamaHakim = ({ data }) => {
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `NAMA-NAMA HAKIM`,
    onAfterPrint: () => toast.success("Berhasil mencetak PDF"),
  });

  return (
    <div>
      <PrintButton
        onPrint={handlePrint}
        disabled={!data || data?.data.length === 0}
      />
      <div style={{ display: "none" }}>
        <PrintableContent ref={printRef} data={data?.data} />
      </div>
    </div>
  );
};

export default DataNamaHakim;
