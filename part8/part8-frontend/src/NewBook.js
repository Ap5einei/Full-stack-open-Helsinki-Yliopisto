import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      id
    }
  }
`

const ALL_BOOKS = gql`query { allBooks { title author published id } }`
const ALL_AUTHORS = gql`query { allAuthors { name born bookCount } }`

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    await createBook({ variables: { title, author, published: Number(published), genres } })
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>
          Title <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Published <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button type="button" onClick={addGenre}>add genre</button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
