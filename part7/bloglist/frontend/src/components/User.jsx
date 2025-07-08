import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)
  // Varmistetaan, että users on taulukko ennen kuin käytetään find
  const user = Array.isArray(users) ? users.find(u => u.id === id) : null

  if (!user) return <div>User not found</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
