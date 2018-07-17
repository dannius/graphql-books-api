import { authors } from './../storage/authors';
import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } from 'graphql';
import { books } from '../storage';


const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: ({ authorId }, args) => authors.find((author) => author.id === authorId)
    }
  })
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: ({ id }) => books.filter((book) => book.authorId === id)
    }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) => books.find((book) => book.id === id)
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) => authors.find((author) => author.id === id)
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => authors
    }
  }
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery
})
