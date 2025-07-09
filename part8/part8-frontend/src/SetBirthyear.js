import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'

const SetBirthyear = ({ setError }) => {
  const { data, loading } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => setError(error.graphQLErrors[0]?.message)
  })

  if (loading) return <div>loading...</div>
  const authors = data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Aseta kirjailijan syntymävuosi</h2>
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
  )
}

export default SetBirthyear
