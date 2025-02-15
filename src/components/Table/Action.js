"use server";

import { revalidatePath } from "next/cache";
import { ErrorResponse } from "@/app/api/error/errorResponse";

export const createAction = async (_, formData) => {
  try {
    const rawFormData = {
      nama: formData.get("nama"),
      alamat: formData.get("alamat"),
    };

    await fetch(`${process.env.API_URL}/api/v1/pengadilan`, {
      method: "POST",
      body: JSON.stringify(rawFormData),
    }).then(async (res) => {
      const error = await res.json();
      if (!res.ok) {
        return { message: error?.issues[0].message };
      }

      return { message: "Berhasil tambah data" };
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }

  revalidatePath("/dashboard/pengadilan");
};

export const updateAction = async (_, formData) => {
  try {
    const rawFormData = {
      nama: formData.get("nama"),
      alamat: formData.get("alamat"),
    };

    await fetch(
      `${process.env.API_URL}/api/v1/pengadilan/${formData.get("id")}`,
      {
        method: "PATCH",
        body: JSON.stringify(rawFormData),
      }
    ).then(async (res) => {
      const error = await res.json();
      if (!res.ok) {
        return { message: error?.issues[0].message };
      }

      return { message: "Berhasil tambah data" };
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }

  revalidatePath("/dashboard/pengadilan");
};

export const deleteAction = async (id) => {
  await fetch(`${process.env.API_URL}/api/v1/pengadilan`, {
    method: "DELETE",
    body: JSON.stringify(id),
  }).catch((e) => console.log(e));
};

export const updateViewPengadilan = async () => {
  const response = await fetch(`${process.env.API_URL}/api/v1/pengadilan`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((result) => result);

  return response;
};
