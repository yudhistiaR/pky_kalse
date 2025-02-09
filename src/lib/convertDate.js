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

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
