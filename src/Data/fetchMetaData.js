export const getMetaData = async () => {
  const res = await fetch(`/api/v1/metadata`, {
    method: "GET",
  });

  return await res.json();
};
