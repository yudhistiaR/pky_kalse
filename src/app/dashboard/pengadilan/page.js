import { DataPengadilan } from "@/components/Table/data-pengadilian";

const PengadilanPage = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold">List Pengadilan</h1>
      <DataPengadilan />
    </div>
  );
};

export default PengadilanPage;
