import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = ({ setError }) => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return <div>loading...</div>
  const books = result.data.allBooks

  return (
    <div>
      <h2>Kirjat</h2>
      <table>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Kirjailija</th>
            <th>Julkaistu</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
