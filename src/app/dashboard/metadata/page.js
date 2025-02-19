import { Suspense } from "react";
import { DataTable } from "@/components/metadata/data-table";

const MetaDataPage = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold">Mutasi Hakim</h1>
      <Suspense fallback={<div>Loading..</div>}>
        <DataTable />
      </Suspense>
    </div>
  );
};

export default MetaDataPage;
