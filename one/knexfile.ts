import type { Knex } from "knex"
import "./env"

const pgConfig = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.FASTIFY_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  pool: { min: 0, max: 16 },
  migrations: {
    tableName: "knex_migrations",
  },
}

const config: { [key: string]: Knex.Config } = {
  development: pgConfig,
  staging: pgConfig,
  production: pgConfig,
}

export default pgConfig
