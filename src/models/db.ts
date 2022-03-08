import MariaDB from 'mariadb'

import Config from '../util/config';
import Logger from '../util/logger'

const pool = MariaDB.createPool({
  host: Config.db.host,
  user: Config.db.username,
  password: Config.db.password,
  database: Config.db.name,
  port: Config.db.port,
  connectionLimit: 5,
});

async function connect() {
  try {
    return await pool.getConnection()
  }
  catch {
    return null
  }
}

async function endConnection(connection: MariaDB.PoolConnection) {
  await connection.release()
}

async function query(query: string) {
  const connection = await connect()

  if (connection === null)
    throw Error('Error connecting')
  const result = await connection.query(query)
  await endConnection(connection)
  return result
}

export default {
  test: async function() {
    const connection = await this.connect()

    if (connection === null)
      return false
    await connection.query('SELECT 1 as val')
    await this.endConnection(connection)
    return true
  },
  connect,
  endConnection,
  query,
}