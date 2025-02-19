import { DataTable } from "@/components/metadata/data-table";
import { Suspense } from "react";

const MutasiMasukPage = async () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold">
        Mutasi Hakim keluar Kalimantan Selatan
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DataTable />
      </Suspense>
    </div>
  );
};

export default MutasiMasukPage;
