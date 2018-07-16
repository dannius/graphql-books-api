import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID } from 'graphql';

import { books } from '../storage';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) => books.find((book) => book.id === id)
    }
  }
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery
})
