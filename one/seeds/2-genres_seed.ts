import { Knex } from "knex"
import { generateGenre } from "../src/lib"

const COUNT = 10

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("genres").del()

  // Generate data
  const genres = Array.from({ length: COUNT }, () => generateGenre())

  // Inserts seed entries
  await knex("genres").insert(genres)
}
