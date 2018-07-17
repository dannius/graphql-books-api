import * as mongoose from 'mongoose';
 
const AuthorSchema = new mongoose.Schema({
  name: String,
  age: Number
});

export const Author = mongoose.model('Author', AuthorSchema);
