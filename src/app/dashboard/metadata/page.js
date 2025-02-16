import { DataTable } from "@/components/metadata/data-table";

const MetaDataPage = async () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold">Mutasi Hakim</h1>
      <DataTable />
    </div>
  );
};

export default MetaDataPage;
