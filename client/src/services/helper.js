import axios from 'axios'

const BASE_URL = `http://localhost:3001/`

const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'Authorization': `Bearer ${token}`,
  // }
});

const allUsers = async () => {
  const resp = await api.get(`users/`)
  return resp.data;
}

const registerUser = async (userData) => {
  const resp = await api.post(`users/`, userData)
  return resp.data;
}

const loginUser = async (data) => {
  const resp = await axios.post(`http://localhost:3001/users/login`, data);
  return resp.data;
};

const getUserTracks = async (userId) => {
  const resp = await api.get(`users/${userId}/tracks`);
  console.log('get a user tracks called')
  return resp.data.tracks
}

const allTracks = async () => {
  const resp = await api.get(`tracks/`)
  console.log(resp.data)
  return resp.data;
}

const getTrack = async (trackId) => {
  const resp = await api.get(`tracks/${trackId}`);
  console.log('get a track called')
  return resp.data
}

const addTrack = async (trackData) => {
  console.log(trackData)
  const resp = await api.post(`tracks/`, trackData)
  return resp.data
}

const removeTrack = async (trackId) => {
  const resp = await api.delete(`tracks/${trackId}`)
  return resp.data
}

const updateTrack = async (trackId, trackData) => {
  const resp = await api.put(`tracks/${trackId}`, trackData);
  return resp.data
}

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
}