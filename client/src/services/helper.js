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
  const resp = await api.post(`/users/login`, data);
  return resp.data;
};

const allTracks = async () => {
  const resp = await api.get(`tracks/`)
  return resp.data;
}

const addTrack = async (trackData) => {
  console.log(trackData)
  const resp = await api.post(`tracks/`, trackData)
  return resp.data;
}


export {
  allUsers,
  registerUser,
  loginUser,
  allTracks,
  addTrack,
}