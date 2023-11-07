import { Knex } from "knex"

import { generateBook, fromArray } from "../src/lib"

const COUNT = 100

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("books").del()

  // Generate data
  const authorIds = (await knex("authors").select("id")).map(({ id }) => id)
  const genresIds = (await knex("genres").select("id")).map(({ id }) => id)

  const books = Array.from({ length: COUNT }, () =>
    generateBook({ author_id: fromArray(authorIds), genre_id: fromArray(genresIds) })
  )

  // Inserts seed entries
  await knex("books").insert(books)
}
