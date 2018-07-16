import { Request, Response, Router } from 'express';

class BaseController {

  private _router: Router;

  constructor() {
    this._router = Router();
    this.initRoutes();
  }

  public get router(): Router {
    return this._router;
  }

  private root(req: Request, res: Response) {
    res.send('hello there');
  }

  private initRoutes() {
    this._router.get('/', this.root);
  }
}

export const baseController = new BaseController();
