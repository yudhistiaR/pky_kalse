"use client";

import { useQuery } from "@tanstack/react-query";
import { getDetailHakim } from "@/components/datahakim/Action";
import { useParams } from "next/navigation";

const DataNamaHakim = () => {
  const { hakim_id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["DetailHakim", hakim_id],
    queryFn: async () => await getDetailHakim(hakim_id),
  });

  const groupedData = {};
  data.forEach((item) => {
    if (!groupedData[item.pengadilan]) {
      groupedData[item.pengadilan] = [];
    }
    groupedData[item.pengadilan].push(item);
  });

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-300 p-8">
        <thead>
          <tr className=" bg-orange-400 ">
            <th className="border border-gray-500 px-4 py-2">No</th>
            <th className="border border-gray-500 px-4 py-2">Nama</th>
            <th className="border border-gray-500 px-4 py-2">Jabatan</th>
            <th className="border border-gray-500 px-4 py-2">Pengadilan</th>
            <th className="border border-gray-500 px-4 py-2">Jumlah</th>
            <th className="border border-gray-500 px-4 py-2">Keterangan</th>
            <th className="border border-gray-500 px-4 py-2">Hakim Baru</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((pengadilan) => {
            return groupedData[pengadilan].map((item, index) => (
              <tr key={item.no} className="border border-gray-500">
                <td className="border border-gray-500 px-4 py-2">{item.no}</td>
                <td className="border border-gray-500 px-4 py-2">{nama}</td>
                <td className="border border-gray-500 px-4 py-2">{jabatan}</td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.pengadilan}
                </td>
                {index === 0 && (
                  <td
                    className="border border-gray-500 px-4 py-2"
                    rowSpan={groupedData[pengadilan].length}
                  >
                    {item.jumlah}
                  </td>
                )}
                <td className="border border-gray-500 px-4 py-2">
                  {item.keterangan}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.hakimBaru}
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataNamaHakim;
