"use client";

import { useQuery } from "@tanstack/react-query";
import { getDetailHakim } from "@/components/datahakim/Action";
import { useParams } from "next/navigation";

const DetailJejakHakim = () => {
  const { hakim_id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["DetailHakim", hakim_id],
    queryFn: async () => await getDetailHakim(hakim_id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const hakimData = data?.find((item) => item.id === hakim_id);

  if (!hakimData) {
    return <div>Data hakim tidak ditemukan</div>;
  }

  const {
    nama,
    nip,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    agama,
    jenis_kelamin,
    jabatan,
    golongan,
    tlp_kantor,
    alamat_asal,
    telpon,
    pasangan,
    anak,
    pekerjaan,
    pendidikan,
    pengadilan,
    pemberitaan,
  } = hakimData;

  const dataPribadi = {
    namaLengkap: nama,
    nikNip: nip,
    tempatTanggalLahir: `${tempat_lahir}, ${tanggal_lahir}`,
    agama: agama || "-",
    jenisKelamin: jenis_kelamin || "-",
    statusPerkawinan: pasangan ? "Menikah" : "Belum Menikah",
    jabatan: jabatan,
    pangkatGolongan: golongan,
    instansiKantor: pengadilan.nama,
    alamatKantor: pengadilan.alamat,
    nomorTlpKantor: tlp_kantor || "-",
    alamatRumah: alamat,
    alamatAsal: alamat_asal || "-",
    nomorTeleponHp: telpon || "-",
    riwayatPendidikan: pendidikan.map((item) => item.nama),
    riwayatPekerjaan: pekerjaan.map((item) => item.nama),
  };

  const dataKeluarga = {
    suamiIstri: {
      nama: pasangan || "-",
      pendidikan: "-",
      pekerjaan: "-",
    },
    anak: anak.map((item) => ({
      nama: item.nama || "-",
      pendidikan: "-",
      pekerjaan: "-",
    })),
  };

  const kekayaan = {
    gambar: "",
  };

  const pemberitaanMedia = pemberitaan.map((item) => ({
    sumberBerita: item.sumberBerita,
    judulBerita: item.judulBerita,
  }));

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Data Pribadi */}
      <div className="mb-8">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">DATA PRIBADI</h2>
          <div>Cetak</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Nama Lengkap</p>
            <p>{dataPribadi.namaLengkap}</p>
          </div>
          <div>
            <p className="font-semibold">NIK/NIP</p>
            <p>{dataPribadi.nikNip}</p>
          </div>
          <div>
            <p className="font-semibold">Tempat, Tanggal Lahir</p>
            <p>{dataPribadi.tempatTanggalLahir}</p>
          </div>
          <div>
            <p className="font-semibold">Agama</p>
            <p>{dataPribadi.agama}</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Kelamin</p>
            <p>{dataPribadi.jenisKelamin}</p>
          </div>
          <div>
            <p className="font-semibold">Status Perkawinan</p>
            <p>{dataPribadi.statusPerkawinan}</p>
          </div>
          <div>
            <p className="font-semibold">Jabatan</p>
            <p>{dataPribadi.jabatan}</p>
          </div>
          <div>
            <p className="font-semibold">Pangkat/Golongan</p>
            <p>{dataPribadi.pangkatGolongan}</p>
          </div>
          <div>
            <p className="font-semibold">Instansi/Kantor</p>
            <p>{dataPribadi.instansiKantor}</p>
          </div>
          <div>
            <p className="font-semibold">Alamat Kantor</p>
            <p>{dataPribadi.alamatKantor}</p>
          </div>
          <div>
            <p className="font-semibold">Nomor Telepon Kantor</p>
            <p>{dataPribadi.nomorTlpKantor}</p>
          </div>
          <div>
            <p className="font-semibold">Alamat Rumah</p>
            <p>{dataPribadi.alamatRumah}</p>
          </div>
          <div>
            <p className="font-semibold">Alamat Asal</p>
            <p>{dataPribadi.alamatAsal}</p>
          </div>
          <div>
            <p className="font-semibold">Nomor Telepon & HP</p>
            <p>{dataPribadi.nomorTeleponHp}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold">Riwayat Pendidikan</h3>
          <ul className="list-disc list-inside">
            {dataPribadi.riwayatPendidikan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold">Riwayat Pekerjaan</h3>
          <ul className="list-disc list-inside">
            {dataPribadi.riwayatPekerjaan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Data Keluarga */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">DATA KELUARGA</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Suami/Istri</p>
            <p>Nama: {dataKeluarga.suamiIstri.nama}</p>
          </div>
          {dataKeluarga.anak.map((anak, index) => (
            <div key={index}>
              <p className="font-semibold">Anak {index + 1}</p>
              <p>Nama: {anak.nama}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kekayaan */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">KEKAYAAN</h2>
        <img src={kekayaan.gambar} alt="Kekayaan" className="w-full max-w-md" />
      </div>

      {/* Pemberitaan Media */}
      <div>
        <h2 className="text-xl font-bold mb-4">PEMBERITAAN MEDIA</h2>
        <div className="space-y-4">
          {pemberitaanMedia.map((berita, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <p className="font-semibold">{berita.sumberBerita}</p>
              <p>{berita.judulBerita}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailJejakHakim;
