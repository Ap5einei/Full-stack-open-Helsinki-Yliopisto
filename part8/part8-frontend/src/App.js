import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'
import SetBirthyear from './SetBirthyear'
import LoginForm from './LoginForm'
import './App.css'

const Notify = ({ message }) => {
  if (!message) return null
  return <div className="notification">{message}</div>
}

const Navigation = ({ setPage, token, logout }) => (
  <nav>
    <button className="nav-btn" onClick={() => setPage('authors')}>Kirjailijat</button>
    <button className="nav-btn" onClick={() => setPage('books')}>Kirjat</button>
    {token && <button className="nav-btn" onClick={() => setPage('add')}>Lisää kirja</button>}
    {token && <button className="nav-btn" onClick={() => setPage('setbirthyear')}>Aseta syntymävuosi</button>}
    {!token
      ? <button className="nav-btn" onClick={() => setPage('login')}>Kirjaudu</button>
      : <button className="nav-btn" onClick={logout}>Kirjaudu ulos</button>
    }
  </nav>
)

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const apolloClient = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) setToken(token)
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 4000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    apolloClient.resetStore()
    setPage('authors')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kirjasto</h1>
        <div className="slogan">
          We create stories with code.<br />
          <span className="slogan-sub">Inspired by Houston Inc.</span>
        </div>
        <Navigation setPage={setPage} token={token} logout={logout} />
      </header>
      <Notify message={errorMessage} />
      <main className="main-content">
        {page === 'authors' && <Authors setError={notify} token={token} />}
        {page === 'books' && <Books setError={notify} />}
        {token && page === 'add' && <NewBook setError={notify} />}
        {token && page === 'setbirthyear' && <SetBirthyear setError={notify} />}
        {page === 'login' && !token && (
          <LoginForm
            setError={notify}
            setToken={setToken}
            setPage={setPage}
          />
        )}
      </main>
    </div>
  )
}

export default App
