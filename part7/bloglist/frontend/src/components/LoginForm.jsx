import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setError('Väärä käyttäjätunnus tai salasana')
      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Kirjaudu</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}

export default LoginForm
