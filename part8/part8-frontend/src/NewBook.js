import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from './queries'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => setError(error.graphQLErrors[0]?.message)
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
      <h2>Lisää kirja</h2>
      <form onSubmit={submit}>
        <div>
          Nimi <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Kirjailija <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Julkaistu <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button type="button" onClick={addGenre}>lisää genre</button>
        </div>
        <div>Genret: {genres.join(' ')}</div>
        <button type="submit">luo kirja</button>
      </form>
    </div>
  )
}

export default NewBook
