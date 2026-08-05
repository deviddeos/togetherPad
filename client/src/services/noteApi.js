import api from "./api";

export const getNote = async (slug) => {
  const response = await api.get(`/notes/${slug}`);
  return response.data;
};

export const createNote = async (data) => {
  const response = await api.post("/notes", data);
  return response.data;
};
