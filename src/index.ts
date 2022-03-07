import { createHttpTerminator } from 'http-terminator'
import { Server } from 'http'

import App from './app'
import Config from './util/config'
import Logger from './util/logger'
import DB from './models/db'

process.on('unhandledRejection', (err) => {
  throw err;
});


async function appStart(): Promise<Server> {
  return new Promise((resolve) => {
    const server = App.listen(Config.port, () => {
      Logger.info(
        `started server on :${Config.port} in ${Config.env} mode`
      );
      resolve(server)
    });
  })
}

async function appInitialize() {
  try {
    await DB.connect()
  }
  catch(e) {
    Logger.debug(e)
    Logger.error('Error connecting to DB')
    process.exit(1)
  }

  try {
    const server = await appStart()
    const httpTerminator = createHttpTerminator({ server });
    const shutdownSignals = ['SIGTERM', 'SIGINT'];

    shutdownSignals.forEach((signal) =>
      process.on(signal, async () => {
        Logger.info(`${signal} received, closing gracefully ...`)
        await DB.endConnection()
        await httpTerminator.terminate()
      })
    );
  }
  catch(e) {
    Logger.debug(e)
    Logger.error('Error starting the application')
    process.exit(1)
  }
}

// Call initializer that calls appStart
appInitialize()