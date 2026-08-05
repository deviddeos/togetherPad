import api from "./api";

export const getNote = async (slug) => {
  const response = await api.get(`/notes/${slug}`);
  return response.data;
};
