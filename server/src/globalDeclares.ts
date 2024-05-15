import type { Pool } from 'pg'

declare global {
  var dbPool: Pool;
}
  