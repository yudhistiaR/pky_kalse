"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { updateViewPengadilan } from "@/components/Table/Action";
import { getHakim } from "@/components/datahakim/Action";

const CounterCard = ({ href, title, counter }) => {
  return (
    <div className="grid">
      <div className="bg-white w-full h-32 rounded-t-lg rounded-b-2xl shadow-md p-4 relative z-10">
        <div className="font-bold text-2xl">{title ?? "something wrong"}</div>
        <div className="font-bold text-xl mt-4 text-zinc-500">
          {counter ?? "something wrong"}
        </div>
      </div>
      <div className="relative -top-3 w-full flex justify-end">
        <Link
          href={href ?? "/dashboard"}
          className="p-4 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-b-lg  flex items-center justify-end shadow-md"
        >
          Rincian
        </Link>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { data: pengadilan, isPending } = useQuery({
    queryKey: ["pengadilan"],
    queryFn: async () => await updateViewPengadilan(),
  });

  const { data: hakim } = useQuery({
    queryKey: ["Hakim"],
    queryFn: async () => await getHakim(),
  });

  const { data: mutasimasuk } = useQuery({
    queryKey: ["mutasimasuk"],
    queryFn: async () => {
      const res = await fetch("/api/v1/metadata?mutasi=enter", {
        method: "GET",
      });
      return await res.json();
    },
  });

  const { data: mutasikeluar } = useQuery({
    queryKey: ["mutasikelaur"],
    queryFn: async () => {
      const res = await fetch("/api/v1/metadata?mutasi=exit", {
        method: "GET",
      });
      return await res.json();
    },
  });

  return (
    <motion.div className="w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <CounterCard
          title={"JUMLAH HAKIM KALIMANTAN SELATAN"}
          counter={`${hakim?.totalItems ?? 0} HAKIM`}
          href={"/dashboard/datahakim"}
        />
        <CounterCard
          title={"JUMLAH PENGADILAN KALIMANTAN SELATAN"}
          counter={`${pengadilan?.length ?? 0} PENGADILAN`}
          href={"/dashboard/pengadilan"}
        />
        <CounterCard
          title={"JUMLAH HAKIM MUTASI KE KALIMANTAN SELATAN"}
          counter={`${mutasimasuk?.totalItems ?? 0} HAKIM`}
          href={"/dashboard/mutasimasuk?m=enter"}
        />
        <CounterCard
          title={"JUMLAH HAKIM MUTASI KELUAR KALIMANTAN SELATAN"}
          counter={`${mutasikeluar?.totalItems ?? 0} HAKIM`}
          href={"/dashboard/mutasimasuk?m=enter"}
        />
      </div>
    </motion.div>
  );
};

export default DashboardPage;
