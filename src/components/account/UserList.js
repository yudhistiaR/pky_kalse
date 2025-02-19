"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const req = await fetch(`/api/v1/user`);
      if (!req.ok) {
        throw new Error("Gagal mengambil data pengguna");
      }
      return await req.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daftar Pengguna</h2>
      <Table>
        <TableCaption>List pengguna yang terdaftar</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Telepon</TableHead>
            <TableHead>Jabatan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.telpon}</TableCell>
                <TableCell>{user.jabatan}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
