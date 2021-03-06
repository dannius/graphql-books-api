import * as graphqpHTTP from 'express-graphql';
import { rootSchema } from '../schema/schema';

class GraphqlController {

  private _schema: graphqpHTTP.Middleware;

  constructor() {
    this.initSchema();
  }

  public get schema(): graphqpHTTP.Middleware {
    return this._schema;
  }

  private initSchema() {
    this._schema = graphqpHTTP({
      schema: rootSchema
    })
  }
}

export const graphqlController = new GraphqlController();
