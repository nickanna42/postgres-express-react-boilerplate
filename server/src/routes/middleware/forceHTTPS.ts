import url from 'url'
import { RequestHandler } from 'express';

const forceHTTPS: RequestHandler = (req, res, next) => {
  if (req.protocol == 'http') {
    res.redirect(301, 'https://' + req.hostname + url.parse(req.url).path)
  } else {
    next();
  }
};

export default forceHTTPS;