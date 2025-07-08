// src/components/Users.js
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUsers } from '../reducers/usersSlice'
import userService from '../services/users'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    userService.getAll().then(users => {
      dispatch(setUsers(users))
    })
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.username})</li>
        ))}
      </ul>
    </div>
  )
}

export default Users
