import axios from "axios";
const API = "http://localhost:4000/api/image";

export const getImages = async () => {
  return await axios.get(API);
};

export const getImage = async (id) => {
  return await axios.get(`${API}`, id);
};

export const uploadImage = async (image) => {
  return await axios.post(`${API}/upload`, image);
};

export const deleteImage = async (id) => {
  return await axios.delete(`${API}/${id}`);
};


export const updateImage = async (id, image) => {
  return await axios.put(`${API}/${id}`, image);
};
