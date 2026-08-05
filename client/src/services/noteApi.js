import api from "./api";

export const getNote = async (slug) => {
  const response = await api.get(`/notes/${slug}`);
  return response.data;
};

export const createNote = async (data) => {
  const response = await api.post("/notes", data);
  return response.data;
};

export const updateContent = async (slug, content, accessToken) => {
  return api.patch(
    `/notes/${slug}/content`,
    { content },
    { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {} }
  );
};
