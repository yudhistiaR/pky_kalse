"use server";

import { ErrorResponse } from "@/app/api/error/errorResponse";

export const deleteAction = async ({ id }) => {
  await fetch(`${process.env.API_URL}/api/v1/hakim/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((e) => console.log(e));
};

export const createAction = async (formData) => {
  try {
    await fetch(`${process.env.API_URL}/api/v1/hakim`, {
      method: "POST",
      body: JSON.stringify(formData),
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
};

export const updateAction = async ({ id, data }) => {
  await fetch(`${process.env.API_URL}/api/v1/hakim/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((e) => console.log(e));

  revalidatePath("/dashboard/datahakim");
};

export const getDetailHakim = async (id) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/hakim/${id}`, {
    method: "GET",
  });
  const datas = await res.json();
  return datas[0];
};

export const getHakim = async () => {
  const res = await fetch(`${process.env.API_URL}/api/v1/hakim`, {
    method: "GET",
  });
  return await res.json();
};

export const updateViewHakim = async (params) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/hakim?${params}`, {
    method: "GET",
  });
  return await res.json();
};
