import * as express from 'express';
import * as mongoose from 'mongoose';

import { baseController, graphqlController } from './controllers';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/graphql', graphqlController.schema);
app.use('/', baseController.router);


app.listen(PORT, () => {
  mongoose
    .connect('mongodb://localhost:27017/book-store', { useNewUrlParser: true })
    .then(() => {
      console.log(`listen port ${PORT}`);
    })
    .catch((err) => {
      console.log(`could not connect to mongo: ${err}`);
    })
});
