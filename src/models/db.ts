import { Sequelize } from 'sequelize'

import config from '../util/config'
import Logger from '../util/logger'

const connection = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mariadb',
  logging: Logger.debug.bind(Logger),
});

export default {
  getConnection: function (): Sequelize {
    return connection
  },
  connect: async function () {

    // Save DB. `force: false` prevent sequelize from dropping old tables
    await connection.sync({
      force: false,
    })
    return connection.authenticate()
  },
  endConnection: async function () {
    return connection.close()
  },
  addToDB: async (app: string, amount: number) => {
    // connection.query('INSERT INTO ')
  }
}