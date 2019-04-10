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
  return resp.data
}

const registerUser = async (userData) => {
  const resp = await api.post(`users/`, userData)
  return resp.data
}

const allTracks = async () => {
  const resp = await api.get(`tracks/`)
  return resp.data
}

const addTrack = async (trackData) => {
  const resp = await api.post(`test-upload/`, trackData)
  return resp.data
}

// const test = async (formData) => {
//   axios.post(`http://localhost:3001/test-upload`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   }).then(response => {
//     // handle your response;
//     console.log(response)
//   }).catch(error => {
//     // handle your error
//     console.log(error)
//   });
// }

export {
  allUsers,
  registerUser,
  allTracks,
  addTrack,
  // test,
}