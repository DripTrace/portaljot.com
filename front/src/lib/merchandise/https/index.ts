import type { Express, Request, Response } from 'express';
import { NextServer } from 'next/dist/server/next';
import { ParsedUrlQuery } from 'querystring';

class ExpNexApi {
  express: Express;
  i: number;

  constructor(expressRef: Express) {
    this.express = expressRef;
    this.i = 0;
  }

  apiInit() {
    const apiBase = '/api/merchandise/api';
    this.express.get(`${apiBase}/get`, (req, res) => {
      res.send({ i: this.i });
    });

    this.express.post(`${apiBase}/get`, (req, res) => {
      this.i++;
      res.send({ i: this.i });
    });
  }
}

class ExpNexPages {
  express: Express;
  next: NextServer;

  constructor(expressRef: Express, nextRef: NextServer) {
    this.express = expressRef;
    this.next = nextRef;
  }

  pageInit() {
    this.initSpecialPages();
    this.initDefaults();
  }

  initSpecialPages() {
    this.express.get('/my_special_page/:special_value', (req: Request, res: Response) => {
      const intValue = parseInt(req.params.special_value);
      if (intValue) {
        return this.next.render(req, res, `/special_int`, req.query as ParsedUrlQuery);
      }
    });
  }

  initDefaults() {
    this.express.get('*', (req: Request, res: Response) => {
      return this.next.render(req, res, req.path, req.query as ParsedUrlQuery);
    });
  }
}

export { ExpNexApi, ExpNexPages };
