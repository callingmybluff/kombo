const Config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  db: {
    name: process.env.DB_NAME || 'backend',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 3306,
    username: process.env.MARIADB_USER || 'ismaeel',
    password: process.env.MARIADB_PASSWORD || '123456',
  }
}

export default Config