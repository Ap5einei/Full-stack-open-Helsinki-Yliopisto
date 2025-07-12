import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. Määrittele skeema (tyypit ja kyselyt)
const typeDefs = `
  type Repository {
    id: ID!
    fullName: String!
    description: String
    language: String
  }

  type Query {
    repositories: [Repository!]!
  }
`;

// 2. Dummy-data (voit korvata myöhemmin tietokannalla)
const repositories = [
  { id: '1', fullName: 'user/repo1', description: 'Desc1', language: 'JS' },
  { id: '2', fullName: 'user/repo2', description: 'Desc2', language: 'TS' },
];

// 3. Resolverit
const resolvers = {
  Query: {
    repositories: () => repositories,
  },
};

// 4. Käynnistä Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
