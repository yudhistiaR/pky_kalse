"use client";

import { motion } from "framer-motion";
import { Scale, SquareUserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { updateViewPengadilan } from "@/components/Table/Action";
import { getHakim } from "@/components/datahakim/Action";

const DashboardPage = () => {
  const { data: pengadilan, isPending } = useQuery({
    queryKey: ["pengadilan"],
    queryFn: async () => await updateViewPengadilan(),
  });

  const { data: hakim } = useQuery({
    queryKey: ["Hakim"],
    queryFn: async () => await getHakim(),
  });

  return (
    <motion.div className="w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex gap-4 items-center justify-around">
        <div className="w-full h-full flex flex-col justify-between rounded-lg hover:shadow-lg bg-white">
          <div className="flex p-4 items-center justify-center gap-4">
            <Scale size={80} className="text-orange-500" />
            <div className="text-xl font-bold">
              <h1>JUMLAH PENGADILAN KALIMANTAN SELATAN</h1>
              <p className="text-2xl text-zinc-500">
                JUMLAH : {pengadilan?.length ?? "0"}
              </p>
            </div>
          </div>
          <div className=" border-t border-gray-500">
            <Link
              className="w-full rounded-b-lg p-2 block h-full hover:text-white text-end hover:bg-orange-500"
              href="/dashboard/pengadilan"
            >
              Rincian
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-between rounded-lg hover:shadow-lg bg-white">
          <div className="flex p-4 items-center justify-center gap-4">
            <SquareUserRound size={80} className="text-orange-500" />
            <div className="text-xl font-bold">
              <h1>JUMLAH HAKIM KALIMANTAN SELATAN</h1>
              <p className="text-2xl text-zinc-500">
                {hakim?.totalItems ?? "0"} ORANG
              </p>
            </div>
          </div>
          <div className=" border-t border-gray-500">
            <Link
              className="w-full rounded-b-lg p-2 block h-full hover:text-white text-end hover:bg-orange-500"
              href="/dashboard/datahakim"
            >
              Rincian
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
