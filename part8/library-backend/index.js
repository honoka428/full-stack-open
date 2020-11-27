const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://fullstack:mVcOdipHJntNmK15@cluster0.rs6e4.mongodb.net/graphql?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


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
    allBooks(author: String, genre: String): [Book!]
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
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async(root, args) => {
      const allBooks = []

      if (args.genre && args.author) {
        await Book.collection
        .find({})
        .forEach(book => {
          ( book.genres.includes(args.genre) && args.author === book.author )
          ? allBooks.push({ title: book.title, author: book.author })
          : allBooks
        })
      }    

      else if (args.author) {
        await Book.collection
        .find({})
        .forEach(book => {
          args.author === book.author
          ? allBooks.push({ title: book.title })
          : allBooks
        })
      }
      else if (args.genre) {
        await Book.collection
          .find({})
          .forEach(book => {
            book.genres.includes(args.genre)
            ? allBooks.push({ title: book.title, author: book.author })
            : allBooks
          })
      }
      else {
        await Book.collection
          .find({})
          .forEach(b => allBooks.push(b))
      }

      return allBooks
    },
    allAuthors: async () => {
      const bookCountByAuthor = []
      var bookList = 0 //placeholder bookCount

      await Author.collection
        .find({})
        .forEach( author => {
          console.log('author: ', author)
          // Book.collection.find({}).forEach(book => {
          //   book.author === author.name ? bookList + 1 : bookList
          // })
          bookCountByAuthor.push({ name: author.name, bookCount: bookList, born: author.born })
        })
  
      console.log('book count by author: ', bookCountByAuthor)
      return bookCountByAuthor
    }
  },

  Mutation: {
    addBook: (root, args) => {
      const book = new Book({ ...args, id: uuid() })
      book.save()

      if (!Author.collection.find(a => a.name === args.author)) {
        const author = new Author({ name: args.author, id: uuid() })
        author.save()
      }
      return book
    },

    editAuthor: async (root, args) => {
      await Author.collection
        .find({})
        .forEach(a => {
          console.log(String(a.name) === args.name)
          a.name === args.name
            ? a.born = args.setBornTo
            : console.log('no change')
        })

      
      var response

      await Author.collection.find({})
        .forEach(a => {
          a.name === args.name
            ? response = {name: args.name, born: args.setBornTo}
            : response = null
        })

      console.log('edit author res', response)
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