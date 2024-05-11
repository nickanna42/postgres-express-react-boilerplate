import  { resolve as pathResolve } from 'path'
import { RequestHandler } from 'express';

const handleSPA: RequestHandler = (req, res, next) => {
    if (req.get('sec-fetch-mode') === 'navigate') {
        res.sendFile('index.html', {
            root: pathResolve(__dirname, '../../public'),
        });
    } else {
        next();
    }
};

export default handleSPA;