import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'
import { useState } from 'react'

const Authors = ({ setError, token }) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => setError(error.graphQLErrors[0]?.message)
  })

  if (result.loading) return <div>loading...</div>
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Kirjailijat</h2>
      <table>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Syntynyt</th>
            <th>Kirjoja</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || '-'}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {token &&
        <div>
          <h3>Aseta syntymävuosi</h3>
          <form onSubmit={submit}>
            <div>
              <select value={name} onChange={({ target }) => setName(target.value)}>
                <option value="">Valitse kirjailija</option>
                {authors.map(a =>
                  <option key={a.name} value={a.name}>{a.name}</option>
                )}
              </select>
            </div>
            <div>
              Syntymävuosi{' '}
              <input
                type="number"
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">tallenna</button>
          </form>
        </div>
      }
    </div>
  )
}

export default Authors
