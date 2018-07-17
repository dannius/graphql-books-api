import { Book, Author } from '../models';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql';

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: ({ authorId }, args) => Author.findById(authorId)
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
      resolve: ({ id }) => Book.find({ authorId: id })
    }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) => Book.findById(id)
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) => Author.findById(id)
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => Book.find()
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => Author.find()
    }
  }
});

const mutations: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, { name, age }) {
        const author = new Author({ name, age });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent, { name, genre, authorId }) {
        const book = new Book({ name, genre, authorId });
        return book.save();
      }
    }
  }
})

export const rootSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations
})
