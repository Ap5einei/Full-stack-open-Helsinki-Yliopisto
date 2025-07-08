import { gql, useQuery } from '@apollo/client'
import './App.css';

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(ALL_PERSONS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Persons</h1>
      <ul>
        {data.allPersons.map(person => (
          <li key={person.id}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
