import  { resolve as pathResolve } from 'path'
import { RequestHandler, Response } from 'express';

const sendFileError = (res: Response) => (err: Error) => {
  if (err) {
    console.error(err);
    res.status(404).send('Not Found');
  }
};

const handleSPA: RequestHandler = (req, res, next) => {
  if (req.get('sec-fetch-mode') === 'navigate') {
    
    res.sendFile(
      'index.html',
      { root: pathResolve(__dirname, '../../public') },
      sendFileError(res)
    );
  } else {
    next();
  }
};

export default handleSPA;