/**
*** Server routing instructions
**/
import express from 'express'
import type { Express } from 'express'

const api = express.Router()

api.use(express.json());

export default api