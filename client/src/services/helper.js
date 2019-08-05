import axios from 'axios';

const BASE_URL = `https://vinyl-express.herokuapp.com/`;

const api = axios.create({
  baseURL: BASE_URL
});

const allUsers = async () => {
  const resp = await api.get(`users/`);
  return resp.data;
};

const registerUser = async data => {
  const resp = await api.post(`users/register`, data);
  return resp.data;
};

const loginUser = async data => {
  const resp = await api.post(`users/login`, data);
  return resp.data;
};

const getUserTracks = async userId => {
  const resp = await api.get(`users/${userId}/tracks`);
  return resp.data.tracks;
};

const allTracks = async () => {
  const resp = await api.get(`tracks/`);
  return resp.data;
};

const getTrack = async trackId => {
  const resp = await api.get(`tracks/${trackId}`);
  return resp.data;
};

const addTrack = async trackData => {
  const resp = await api.post(`tracks/`, trackData);
  return resp.data;
};

const removeTrack = async trackId => {
  const resp = await api.delete(`tracks/${trackId}`);
  return resp.data;
};

const updateTrack = async trackData => {
  const resp = await api.put(`tracks/${trackData.id}`, trackData);
  return resp.data;
};

const upload = async track => {
  const resp = await axios.post(`${BASE_URL}upload/`, track, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return resp.data;
};

export {
  allUsers,
  registerUser,
  loginUser,
  allTracks,
  getTrack,
  addTrack,
  removeTrack,
  updateTrack,
  getUserTracks,
  upload
};
