import { authors } from './../storage/authors';
import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { books } from '../storage';


const BookType = new GraphQLObjectType({
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

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
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
    }
  }
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery
})
