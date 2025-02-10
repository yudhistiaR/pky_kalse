"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getDetailHakim } from "@/components/datahakim/Action";
import { Button } from "@/components/ui/button";

import KopSurat from "@/components/createPdf/kopSurat";

const RekamJejakHakim = () => {
  const { hakim_id } = useParams();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Rekam jejak hakim`,
    onAfterPrint: () => toast.success("Berhasil mencetak PDF"),
  });

  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ["hakimData", hakim_id],
    queryFn: async () => await getDetailHakim(hakim_id),
  });

  if (isPending || isLoading)
    return <p className="text-center text-gray-500">Mengambil data...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error fetching data: {error.message}
      </p>
    );

  return (
    <>
      <Button
        onClick={handlePrint}
        style={{ marginTop: "20px", padding: "10px 20px" }}
        disabled={isPending || !data || data.length === 0}
      >
        Cetak PDF
      </Button>

      <div
        ref={printRef}
        className="bg-white max-w-2xl mx-auto mt-10 p-4 border rounded-lg shadow-lg text-[11px]"
      >
        <KopSurat />
        <h2 className="text-lg font-bold p-2 rounded-t-lg">A. DATA PRIBADI</h2>
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            {Object.entries({
              "Nama Lengkap": data.nama,
              NIP: data.nip,
              "Tempat Tgl Lahir": data.tempat_lahir + ", " + data.tanggal_lahir,
              Agama: data.agama,
              "Jenis Kelamin": data.jenis_kelamin,
              Jabatan: data.jabatan,
              Golongan: data.golongan,
              "Nomor Tlp Kantor": data.tlp_kantor,
              "Alamat Asal": data.alamat_asal,
              "Nomor Telepon & Hp": data.telpon,
              "Riwayat Pendidikan": data.pendidikan.map((el) => (
                <li className="list-decimal p-2" key={el.id}>
                  {el.nama}
                </li>
              )),
              "Riwayat Pekerjaan": data.pekerjaan.map((el) => (
                <li className="list-decimal p-2" key={el.id}>
                  {el.nama}
                </li>
              )),
            }).map(([key, value], index) => (
              <tr key={index} className="border border-gray-400">
                <td className="p-2 border border-gray-400 w-1/3 font-semibold">
                  {index + 1}. {key}
                </td>
                <td className="p-2 border border-gray-400 w-2/3">
                  {value || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-lg font-bold p-2 mt-4 rounded-t-lg">
          B. DATA KELUARGA
        </h2>
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            <>
              <tr className="border border-gray-400">
                <td
                  colspan="2"
                  className="p-2 border border-gray-400 w-1/3 font-bold"
                >
                  SUAMI/ISTRI
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 w-1/3">Nama</td>
                <td className="p-2 border border-gray-400 w-1/3">
                  {data.pasangan}
                </td>
              </tr>
            </>
            <>
              {data.anak.map((el, i) => (
                <>
                  <tr key={i} className="border border-gray-400">
                    <td
                      colspan="2"
                      className="p-2 border border-gray-400 w-1/3 font-bold"
                    >
                      Anak Ke {i + 1}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400 w-1/3">Nama</td>
                    <td className="p-2 border border-gray-400 w-1/3">
                      {el.nama}
                    </td>
                  </tr>
                </>
              ))}
            </>
          </tbody>
        </table>
        <h2 className="text-lg font-bold p-2 mt-4 rounded-t-lg">D. KEKAYAAN</h2>
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            <tr className="border border-gray-400">
              <td className="p-2 border border-gray-400 w-1/3">
                Total Kekayaan
              </td>
              <td className="p-2 border border-gray-400 w-2/3">:</td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-lg font-bold p-2 mt-4 rounded-t-lg">
          E. PEMBERITAAN MEDIA
        </h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="border border-gray-400">
              <th className="p-2 border border-gray-400">No.</th>
              <th className="p-2 border border-gray-400">Sumber Berita</th>
              <th className="p-2 border border-gray-400">
                Judul Berita & Ringkasan
              </th>
            </tr>
          </thead>
          <tbody>
            {data.pemberitaan.map((item, index) => (
              <tr key={index} className="border border-gray-400">
                <td className="p-2 border border-gray-400">{index + 1}</td>
                <td className="p-2 border border-gray-400">
                  {item.sumberBerita}
                </td>
                <td className="p-2 border border-gray-400">
                  {item.judulBerita}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RekamJejakHakim;
