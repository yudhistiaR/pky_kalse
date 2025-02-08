"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDetailHakim } from "@/components/datahakim/Action";
import DetailHakimPDF from "@/components/datahakim/detailHakimPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const DetailHakim = () => {
  const { hakim_id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["DetailHakim", hakim_id],
    queryFn: async () => await getDetailHakim(hakim_id),
  });

  const pengadilan = data?.[0]?.pengadilan?.nama ?? "Loading...";

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
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{`Data Hakim ${pengadilan}`}</h2>
      <PDFDownloadLink
        document={<DetailHakimPDF data={data} />}
        fileName="Detail_Hakim.pdf"
        className="mb-4 block text-center text-blue-600 underline"
      >
        {({ loading }) => (loading ? "Membuat PDF..." : "Download PDF")}
      </PDFDownloadLink>
      {isPending ? (
        <div className="text-center h-96 flex items-center justify-center">
          <p className="text-lg text-slate-400">Loading...</p>
        </div>
      ) : data && data.length > 0 ? (
        data.map((hakim, index) => (
          <table
            key={index}
            className="w-full border-collapse border border-gray-300 mb-6"
          >
            <tbody>
              {detailFields.map(({ key, label }) => (
                <tr key={key} className="border-b border-gray-300">
                  <td className="p-3 font-semibold bg-gray-100 w-1/3">
                    {label}
                  </td>
                  <td className="p-3">{hakim[key]}</td>
                </tr>
              ))}
              <tr className="border-b border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">
                  Riwayat Pendidikan
                </td>
                <td className="p-3">
                  {hakim.pendidikan?.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {hakim.pendidikan.map((item, idx) => (
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
                  {hakim.pekerjaan?.length > 0 ? (
                    <ul className="list-decimal list-inside">
                      {hakim.pekerjaan.map((item, idx) => (
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
        ))
      ) : (
        <div className="text-center h-96 flex items-center justify-center">
          <p className="text-lg text-slate-400">Data Tidak Tersedia</p>
        </div>
      )}
    </div>
  );
};

export default DetailHakim;
