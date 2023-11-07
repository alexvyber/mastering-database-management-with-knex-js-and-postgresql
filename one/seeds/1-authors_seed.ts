import { Knex } from "knex"
import { generateAuthor } from "../src/lib"

const COUNT = 100

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("authors").del()

  // Generate data
  const authors = Array.from({ length: COUNT }, () => generateAuthor())

  // Inserts seed entries
  await knex("authors").insert(authors)
}
