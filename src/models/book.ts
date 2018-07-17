import * as mongoose from 'mongoose';
 
const BookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String
});

export const Book = mongoose.model('Book', BookSchema);
