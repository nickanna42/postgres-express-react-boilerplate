/**
*** Server routing instructions
**/
import express from 'express'

const api = express.Router()

api.use(express.json());

api.get('/example', (_req, res) => {
  res.json('hello world');
});

export default api