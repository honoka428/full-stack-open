const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  enum Genre {
    classic
    revolution
    crime
    patterns
    refactoring
    design
    agile
    nosql
    database
  }

  type Book {
      title: String
      published: Int
      author: String
      id: String
      genres: [Genre]
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]!
    ): Book 
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.genre && args.author) {
        let allBooks = []

        books.forEach(book => {
          ( book.genres.includes(args.genre) && args.author === book.author )
          ? allBooks.push({ title: book.title, author: book.author })
          : allBooks
        })
        
        return allBooks
      }    

      else if (args.author) {
        let allBooks = []

        books.forEach(book => {
          args.author === book.author
          ? allBooks.push({ title: book.title })
          : allBooks
        })
        
        return allBooks
      }
      else if (args.genre) {
        let allBooks = []

        books.forEach(book => {
          book.genres.includes(args.genre)
          ? allBooks.push({ title: book.title, author: book.author })
          : allBooks
        })
        
        return allBooks
      }
      else {
        return books
      }
    },
    allAuthors: () => {
      const bookCountByAuthor = []

      authors.forEach(author => {
        let bookList = books.filter(book => author.name === book.author)
        bookCountByAuthor.push({ name: author.name, bookCount: bookList.length, born: author.born })
      })

      return bookCountByAuthor
    }
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)

      if (!authors.find(a => a.name === args.author)) {
        authors = authors.concat({name: args.author, id: uuid()})
      }
      return book
    },
    editAuthor: (root, args) => {
      authors.forEach(a => {
        a.name === args.name
          ? a.born = args.setBornTo
          : a
      })

      const response = authors.find(a => a.name === args.name)
        ? {name: args.name, born: args.setBornTo}
        : null

      return response
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})