import * as express from 'express';

import {
  baseController,
  graphqlController
} from './controllers';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/', baseController.router);
app.use('/graphql', graphqlController.schema);

app.listen(PORT, () => {
  console.log(`listen port ${PORT}`);
});
