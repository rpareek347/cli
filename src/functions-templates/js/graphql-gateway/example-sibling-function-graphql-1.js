// not meant to be run inside the graqhql-gateway function
// but just shows a copy-pastable example sibling function
// that would work with graphql-gateway
const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    hello: String
    allAuthors: [Author!]
    author(id: Int!): Author
    authorByName(name: String!): Author
  }
  type Author {
    id: ID!
    name: String!
    age: Int!
  }
`

/* eslint-disable no-magic-numbers */
const authors = [
  { id: 1, name: 'Terry Pratchett', age: 67 },
  { id: 2, name: 'Stephen King', age: 71 },
  { id: 3, name: 'JK Rowling', age: 53 },
]
/* eslint-enable no-magic-numbers */

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, world!'
    },
    allAuthors: () => {
      return authors
    },
    author: () => {},
    authorByName: (root, args) => {
      return authors.find((author) => author.name === args.name) || 'NOTFOUND'
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
