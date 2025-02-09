import React from "react";
import Image from "next/image";

const KopSurat = () => {
  return (
    <div className="border-b-2 border-black pb-2 text-center mb-8">
      <div className="flex justify-between items-center">
        <Image src="/logo-pky.png" alt="Logo PKY" width={90} height={90} />
        <div className="text-center flex-1">
          <h1 className="font-bold text-2xl">PENGHUBUNG KOMISI YUDISIAL</h1>
          <h1 className="font-bold text-2xl">KALIMANTA SELATAN</h1>
          <p className="text-sm">
            Jln. Gatot Subroto I No.1 RT.20 RW.002, Kel. Kebun Bunga, Kec.
            Banjarmasin Timur, Kota Banjarmasin
          </p>
          <p className="text-sm">e-mail : pkykalsel@komisiyudisial.go.id</p>
        </div>
      </div>
      <hr className="border-t-2 border-black mt-2" />
    </div>
  );
};

export default KopSurat;
