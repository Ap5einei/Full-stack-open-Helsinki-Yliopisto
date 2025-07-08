const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require('./schema')

// Data
let authors = [
  { name: "Robert Martin", id: "1", born: 1952 },
  { name: "Martin Fowler", id: "2", born: 1963 },
  { name: "Fyodor Dostoevsky", id: "3", born: 1821 },
  { name: "Joshua Kerievsky", id: "4" },
  { name: "Sandi Metz", id: "5" }
]

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
    id: "10"
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
    id: "11"
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
    id: "12"
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
    id: "13"
  }
]

// Resolverit
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: Math.random().toString(36).slice(2) }
      books = books.concat(newBook)
      // Lisää kirjailija, jos ei vielä ole
      if (!authors.find(a => a.name === args.author)) {
        authors = authors.concat({ name: args.author, id: Math.random().toString(36).slice(2) })
      }
      return newBook
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) return null
      const updated = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updated : a)
      return updated
    }
  }
}

// Palvelimen käynnistys
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
