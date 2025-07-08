import React, { useState } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'
import SetBirthyear from './SetBirthyear'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <ApolloProvider client={client}>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('setbirthyear')}>set birthyear</button>

        {page === 'authors' && <Authors />}
        {page === 'books' && <Books />}
        {page === 'add' && <NewBook />}
        {page === 'setbirthyear' && <SetBirthyear />}
      </div>
    </ApolloProvider>
  )
}

export default App
