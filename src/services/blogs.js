import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(newObject)
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2V0cmFuMjM4IiwiaWQiOiI1ZjQ4MWM0ZTgwMDkyNjM3YWNkZDBmYjUiLCJpYXQiOjE1OTk0NDEwMDJ9.P0saeVayAWw0G6ZkjSjgS26YEGfztWb5x8ksx6TB9Ww'
  //token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2V0cmFuMjM4IiwiaWQiOiI1ZjQ4MWM0ZTgwMDkyNjM3YWNkZDBmYjUiLCJpYXQiOjE1OTk0NDA1MTN9.whGMjFWcWYcgLuPFXgVSPisZHbthRX6QmurZ3yIZAqE'
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }