export const convertDate = (isoDate) => {
  if (!isoDate) return;

  const date = new Date(isoDate);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("id-ID", options);
};
