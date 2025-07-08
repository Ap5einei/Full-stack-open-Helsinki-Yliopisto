import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, blogObject) => {
  // Muodosta päivitettävä blogi: user on id, likes ei ole null, id-kenttä pois
  const updatedBlog = {
    ...blogObject,
    user: blogObject.user.id ? blogObject.user.id : blogObject.user,
    likes: blogObject.likes ?? 0
  }
  delete updatedBlog.id

  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, setToken, update, remove }
