import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
