import Knex from "knex"

export const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.FASTIFY_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },

  pool: { min: 0, max: 16 },
})

export const onDBConnect = async () => knex.raw("SELECT 1")
