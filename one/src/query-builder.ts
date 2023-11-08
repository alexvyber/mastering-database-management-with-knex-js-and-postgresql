import { knex } from "./config/knex"

export async function getAuthorsWithPagination(
  limit = 10,
  offset = 0
): Promise<{ data: any[]; count: number }> {
  const authors = await knex("authors").limit(limit).offset(offset)
  const count = Number((await knex("authors").count().first())?.count)

  return { data: authors, count }
}
