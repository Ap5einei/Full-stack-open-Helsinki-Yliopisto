import { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

const SET_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`
const ALL_AUTHORS = gql`query { allAuthors { name born bookCount } }`

const SetBirthyear = () => {
  const { data } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  if (!data) return null

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">Select author</option>
            {data.allAuthors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          Born <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear
